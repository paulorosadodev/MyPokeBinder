import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

type TcgDexCard = {
    id: string;
    localId: string;
    name: string;
};

type TcgDexSet = {
    id: string;
    name: string;
};

type ManifestEntry = {
    cardId: string;
    objectKey: string;
    sourcePath: string;
    bytes: number;
};

type UnmatchedCard = {
    cardId: string;
    setId: string;
    localId: string;
    name: string;
};

type UnmatchedImage = {
    sourcePath: string;
    setDirectory: string;
};

type ImageOverride = {
    archiveRelativePath: string;
    cardId: string;
};

const archivePath = process.env.CARD_IMAGES_ARCHIVE_PATH ?? "/mnt/e/OneDrive/Downloads/archive";
const outputMapPath = path.resolve(process.cwd(), "src/data/card-image-map.json");
const outputManifestPath = path.resolve(process.cwd(), "scripts/card-images/card-image-manifest.local.json");
const outputReportPath = path.resolve(process.cwd(), "scripts/card-images/card-image-report.local.json");
const overridesPath = new URL("./card-image-overrides.json", import.meta.url);

const directorySetAliases: Record<string, string> = {
    "sword-shield-promos": "swshp",
    "sun-moon-promos": "smp",
    "scarlet-violet-promos": "svp",
    "xy-promos": "xyp",
    "black-white-promos": "bwp",
    "diamond-pearl-promos": "dpp",
    "heartgold-soulsilver-promos": "hgssp",
    "mega-evolution-promos": "mep",
    expedition: "ecard1",
    "champions-path": "swsh3.5",
    rumble: "ru1",
    "mcdonalds-collection-2011": "2011bw",
    "mcdonalds-collection-2012": "2012bw",
    "mcdonalds-collection-2016": "2016xy",
    "mcdonalds-collection-2019": "2019sm",
    "mcdonalds-collection-2021": "2021swsh",
    "mcdonalds-collection-2022": "2022swsh",
    "mcdonalds-match-battle-2023": "2023sv",
    "pokemon-futsal-promos-2020": "fut2020",
    "ex-trainer-kit-minun": "tk-ex-m",
    "ex-trainer-kit-plusle": "tk-ex-p",
    "black-white-trainer-kit-excadrill": "tk-bw-e",
    "black-white-trainer-kit-zoroark": "tk-bw-z",
    "diamond-pearl-trainer-kit-lucario": "tk-dp-l",
    "diamond-pearl-trainer-kit-manaphy": "tk-dp-m",
    "sun-moon-trainer-kit-alolan-raichu": "tk-sm-r",
    "sun-moon-trainer-kit-lycanroc": "tk-sm-l",
};

const nestedSetSelectors: Record<string, Array<{ pattern: RegExp; setId: string }>> = {
    "shining-fates": [{ pattern: /-SF-SV\d+/i, setId: "swsh4.5sv" }],
    "crown-zenith": [{ pattern: /-CZ-GG\d+/i, setId: "swsh12.5gg" }],
    "brilliant-stars": [{ pattern: /-SWSH9-TG\d+/i, setId: "swsh9tg" }],
    "astral-radiance": [{ pattern: /-SWSH10-TG\d+/i, setId: "swsh10tg" }],
    "lost-origin": [{ pattern: /-SWSH11-TG\d+/i, setId: "swsh11tg" }],
    "silver-tempest": [{ pattern: /-SWSH12-TG\d+/i, setId: "swsh12tg" }],
    celebrations: [{ pattern: /-Ann25thR-\d+/i, setId: "cel25cc" }],
};

function normalize(value: string): string {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/&/g, " ")
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
}

function localIdKey(value: string): string {
    const compact = value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
    const numeric = compact.match(/^0*(\d+)$/);
    if (numeric) {
        return numeric[1];
    }
    return compact;
}

function cardSetId(cardId: string): string {
    const splitAt = cardId.lastIndexOf("-");
    return splitAt === -1 ? cardId : cardId.slice(0, splitAt);
}

function imageExtension(filePath: string): string | null {
    const extension = path.extname(filePath).toLowerCase();
    if (extension === ".jpg" || extension === ".jpeg" || extension === ".png" || extension === ".webp") {
        return extension.slice(1);
    }
    return null;
}

async function listImages(directory: string): Promise<string[]> {
    const entries = await readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(
        entries.map(async (entry) => {
            const entryPath = path.join(directory, entry.name);
            if (entry.isDirectory()) {
                return listImages(entryPath);
            }
            return imageExtension(entryPath) ? [entryPath] : [];
        }),
    );
    return nested.flat();
}

function fileMatchScore(filePath: string, card: TcgDexCard): number | null {
    const fileName = path.basename(filePath, path.extname(filePath));
    const localId = localIdKey(card.localId);
    const compactFileName = fileName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const compactCardName = card.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const matchesCardName = compactCardName.length >= 3 && compactFileName.includes(compactCardName);

    if (/^\d+$/.test(localId)) {
        const numberTokens = fileName.match(/\d+/g) ?? [];
        const matchingTokens = numberTokens.filter((token) => localIdKey(token) === localId);
        if (matchingTokens.length === 0) {
            return matchesCardName ? 1 : null;
        }
        const longestTokenLength = Math.max(...matchingTokens.map((token) => token.length));
        return longestTokenLength * 10 + (matchesCardName ? 1 : 0);
    }

    if (compactFileName.includes(localId)) {
        return 100;
    }

    const prefixedNumeric = localId.match(/^([a-z]+)(\d+)$/);
    if (!prefixedNumeric) {
        return null;
    }
    const [, prefix, number] = prefixedNumeric;
    if (new RegExp(`${prefix}0*${number}(?!\\d)`).test(compactFileName)) {
        return 1;
    }
    return matchesCardName ? 1 : null;
}

async function getJson<T>(url: string): Promise<T> {
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) {
        throw new Error(`Falha ao consultar ${url}: HTTP ${response.status}`);
    }
    return (await response.json()) as T;
}

async function readOverrides(): Promise<ImageOverride[]> {
    const overridesFile = Bun.file(overridesPath);
    if (!(await overridesFile.exists())) {
        return [];
    }
    return (await overridesFile.json()) as ImageOverride[];
}

async function main(): Promise<void> {
    const [sets, cards, imageFiles, overrides] = await Promise.all([getJson<TcgDexSet[]>("https://api.tcgdex.net/v2/en/sets"), getJson<TcgDexCard[]>("https://api.tcgdex.net/v2/en/cards"), listImages(archivePath), readOverrides()]);

    const physicalCards = cards.filter((card) => !/^(A\d+[a-z]?|B\d+[a-z]?|P-A)-/i.test(card.id));
    const setsByNormalizedName = new Map<string, TcgDexSet[]>();
    const setsById = new Map<string, TcgDexSet>();
    for (const set of sets) {
        const key = normalize(set.name);
        setsByNormalizedName.set(key, [...(setsByNormalizedName.get(key) ?? []), set]);
        setsById.set(set.id, set);
    }

    const cardsBySet = new Map<string, TcgDexCard[]>();
    const cardsById = new Map<string, TcgDexCard>();
    for (const card of physicalCards) {
        const setId = cardSetId(card.id);
        cardsBySet.set(setId, [...(cardsBySet.get(setId) ?? []), card]);
        cardsById.set(card.id, card);
    }

    const imagesByDirectory = new Map<string, string[]>();
    for (const imagePath of imageFiles) {
        const directory = path.basename(path.dirname(imagePath));
        imagesByDirectory.set(directory, [...(imagesByDirectory.get(directory) ?? []), imagePath]);
    }

    const manifest: ManifestEntry[] = [];
    const usedImages = new Set<string>();
    const mappedCards = new Set<string>();
    const ambiguousSetDirectories: Array<{ directory: string; setIds: string[] }> = [];
    const unmatchedSetDirectories: Array<{ directory: string; imageCount: number }> = [];

    for (const override of overrides) {
        const sourcePath = path.resolve(archivePath, override.archiveRelativePath);
        const card = cardsById.get(override.cardId);
        const extension = imageExtension(sourcePath);
        if (!card || !extension || !imageFiles.includes(sourcePath)) {
            throw new Error(`Override inválido: ${override.archiveRelativePath} -> ${override.cardId}.`);
        }
        if (usedImages.has(sourcePath) || mappedCards.has(card.id)) {
            throw new Error(`Override duplicado: ${override.archiveRelativePath} -> ${override.cardId}.`);
        }
        const fileInfo = await stat(sourcePath);
        manifest.push({
            cardId: card.id,
            objectKey: `cards/${card.id}.${extension}`,
            sourcePath,
            bytes: fileInfo.size,
        });
        mappedCards.add(card.id);
        usedImages.add(sourcePath);
    }

    for (const [directory, files] of imagesByDirectory) {
        const aliasedSet = directorySetAliases[directory];
        const matchingSets = aliasedSet ? [setsById.get(aliasedSet)].filter((set): set is TcgDexSet => Boolean(set)) : (setsByNormalizedName.get(normalize(directory)) ?? []);
        if (matchingSets.length !== 1) {
            if (matchingSets.length > 1) {
                ambiguousSetDirectories.push({ directory, setIds: matchingSets.map((set) => set.id) });
            } else {
                unmatchedSetDirectories.push({ directory, imageCount: files.length });
            }
            continue;
        }

        for (const filePath of files) {
            if (usedImages.has(filePath)) {
                continue;
            }
            const selector = nestedSetSelectors[directory]?.find(({ pattern }) => pattern.test(path.basename(filePath)));
            const setCards = cardsBySet.get(selector?.setId ?? matchingSets[0].id) ?? [];
            const scoredCandidates = setCards
                .filter((card) => !mappedCards.has(card.id))
                .map((card) => ({ card, score: fileMatchScore(filePath, card) }))
                .filter((candidate): candidate is { card: TcgDexCard; score: number } => candidate.score !== null);
            const highestScore = Math.max(...scoredCandidates.map((candidate) => candidate.score), Number.NEGATIVE_INFINITY);
            const candidates = scoredCandidates.filter((candidate) => candidate.score === highestScore).map((candidate) => candidate.card);
            if (candidates.length !== 1) {
                continue;
            }

            const extension = imageExtension(filePath);
            if (!extension) {
                continue;
            }

            const fileInfo = await stat(filePath);
            const card = candidates[0];
            manifest.push({
                cardId: card.id,
                objectKey: `cards/${card.id}.${extension}`,
                sourcePath: filePath,
                bytes: fileInfo.size,
            });
            mappedCards.add(card.id);
            usedImages.add(filePath);
        }
    }

    manifest.sort((left, right) => left.cardId.localeCompare(right.cardId));
    const imageMap = Object.fromEntries(manifest.map((entry) => [entry.cardId, entry.objectKey]));
    const unmatchedCards: UnmatchedCard[] = physicalCards.filter((card) => !mappedCards.has(card.id)).map((card) => ({ cardId: card.id, setId: cardSetId(card.id), localId: card.localId, name: card.name }));
    const unmatchedImages: UnmatchedImage[] = imageFiles.filter((filePath) => !usedImages.has(filePath)).map((sourcePath) => ({ sourcePath, setDirectory: path.basename(path.dirname(sourcePath)) }));
    const totalBytes = manifest.reduce((total, entry) => total + entry.bytes, 0);

    await Promise.all([
        writeFile(outputMapPath, `${JSON.stringify(imageMap, null, 2)}\n`),
        writeFile(outputManifestPath, `${JSON.stringify(manifest, null, 2)}\n`),
        writeFile(
            outputReportPath,
            `${JSON.stringify(
                {
                    generatedAt: new Date().toISOString(),
                    archivePath,
                    totalImageFiles: imageFiles.length,
                    mappedCards: manifest.length,
                    mappedBytes: totalBytes,
                    explicitOverrides: overrides.length,
                    unmatchedCards,
                    unmatchedImages,
                    ambiguousSetDirectories,
                    unmatchedSetDirectories,
                },
                null,
                2,
            )}\n`,
        ),
    ]);

    console.log(`De-para gerado: ${manifest.length} cartas mapeadas de ${imageFiles.length} imagens.`);
    console.log(`Tamanho dos objetos mapeados: ${(totalBytes / 1024 / 1024 / 1024).toFixed(2)} GB.`);
    console.log(`Pendências: ${unmatchedCards.length} cartas da TCGdex e ${unmatchedImages.length} imagens locais.`);
}

await main();
