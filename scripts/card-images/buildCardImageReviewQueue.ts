import { writeFile } from "node:fs/promises";
import path from "node:path";

type UnmatchedImage = {
    sourcePath: string;
    setDirectory: string;
};

type Report = {
    generatedAt: string;
    unmatchedImages: UnmatchedImage[];
};

type ReviewDisposition = "catalogo_suplementar_obrigatorio" | "revisao_manual";

type ReviewItem = UnmatchedImage & {
    disposition: ReviewDisposition;
    reason: string;
};

const reportPath = new URL("./card-image-report.local.json", import.meta.url);
const outputPath = path.resolve(process.cwd(), "scripts/card-images/card-image-review-queue.local.json");
const classicDirectories = new Set(["pokemon-trading-card-game-classic-blastoise", "pokemon-trading-card-game-classic-charizard", "pokemon-trading-card-game-classic-venusaur"]);

function createReviewItem(image: UnmatchedImage): ReviewItem {
    if (classicDirectories.has(image.setDirectory)) {
        return {
            ...image,
            disposition: "catalogo_suplementar_obrigatorio",
            reason: "Carta do Pokémon Trading Card Game Classic sem registro correspondente na TCGdex.",
        };
    }

    return {
        ...image,
        disposition: "revisao_manual",
        reason: "Não há associação única e verificável com uma carta da TCGdex.",
    };
}

async function main(): Promise<void> {
    const reportFile = Bun.file(reportPath);
    if (!(await reportFile.exists())) {
        throw new Error("Relatório ausente. Execute primeiro bun scripts/card-images/buildCardImageMap.ts.");
    }

    const report = (await reportFile.json()) as Report;
    const items = report.unmatchedImages.map(createReviewItem);
    const summary = {
        catalogo_suplementar_obrigatorio: items.filter((item) => item.disposition === "catalogo_suplementar_obrigatorio").length,
        revisao_manual: items.filter((item) => item.disposition === "revisao_manual").length,
    };

    await writeFile(
        outputPath,
        `${JSON.stringify(
            {
                generatedAt: new Date().toISOString(),
                sourceReportGeneratedAt: report.generatedAt,
                summary,
                items,
            },
            null,
            2,
        )}\n`,
    );

    console.log(`Fila gerada: ${summary.catalogo_suplementar_obrigatorio} para catálogo suplementar e ${summary.revisao_manual} para revisão manual.`);
}

await main();
