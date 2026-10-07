import { HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

type ManifestEntry = {
    cardId: string;
    objectKey: string;
    sourcePath: string;
    bytes: number;
};

const manifestPath = new URL("./card-image-manifest.local.json", import.meta.url);
const requiredEnvironmentNames = ["R2_ACCOUNT_ID", "R2_BUCKET", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY"] as const;
const isConfirmed = process.argv.includes("--confirm");
const shouldOverwrite = process.argv.includes("--overwrite");
const configuredConcurrency = Number.parseInt(process.env.R2_UPLOAD_CONCURRENCY ?? "8", 10);
const concurrency = Number.isInteger(configuredConcurrency) && configuredConcurrency >= 1 && configuredConcurrency <= 16 ? configuredConcurrency : 8;

function requireEnvironment(name: (typeof requiredEnvironmentNames)[number]): string {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Defina ${name} antes de executar o upload.`);
    }
    return value;
}

function contentType(objectKey: string): string {
    if (objectKey.endsWith(".png")) return "image/png";
    if (objectKey.endsWith(".webp")) return "image/webp";
    return "image/jpeg";
}

async function runWithConcurrency<T>(items: readonly T[], worker: (item: T) => Promise<void>): Promise<void> {
    let nextIndex = 0;
    const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
        while (nextIndex < items.length) {
            const item = items[nextIndex++];
            await worker(item);
        }
    });
    await Promise.all(runners);
}

async function main(): Promise<void> {
    const manifestFile = Bun.file(manifestPath);
    if (!(await manifestFile.exists())) {
        throw new Error("Manifesto ausente. Execute primeiro bun scripts/card-images/buildCardImageMap.ts.");
    }

    const manifest = (await manifestFile.json()) as ManifestEntry[];
    const totalBytes = manifest.reduce((total, entry) => total + entry.bytes, 0);

    if (!isConfirmed) {
        console.log(`Simulação: ${manifest.length} objetos, ${(totalBytes / 1024 / 1024 / 1024).toFixed(2)} GB.`);
        console.log("Revise o manifesto e execute novamente com --confirm para enviar ao R2.");
        return;
    }

    const accountId = requireEnvironment("R2_ACCOUNT_ID");
    const bucket = requireEnvironment("R2_BUCKET");
    const accessKeyId = requireEnvironment("R2_ACCESS_KEY_ID");
    const secretAccessKey = requireEnvironment("R2_SECRET_ACCESS_KEY");
    const client = new S3Client({
        region: "auto",
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: { accessKeyId, secretAccessKey },
    });

    let uploaded = 0;
    let skipped = 0;
    const failures: Array<{ cardId: string; message: string }> = [];

    await runWithConcurrency(manifest, async (entry) => {
        try {
            if (!shouldOverwrite) {
                try {
                    await client.send(new HeadObjectCommand({ Bucket: bucket, Key: entry.objectKey }));
                    skipped += 1;
                    return;
                } catch (error: unknown) {
                    const statusCode = (error as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode;
                    if (statusCode !== 404) {
                        throw error;
                    }
                }
            }

            const image = Bun.file(entry.sourcePath);
            if (!(await image.exists())) {
                throw new Error("Arquivo local não encontrado.");
            }

            await client.send(
                new PutObjectCommand({
                    Bucket: bucket,
                    Key: entry.objectKey,
                    Body: new Uint8Array(await image.arrayBuffer()),
                    ContentType: contentType(entry.objectKey),
                    CacheControl: "public, max-age=31536000, immutable",
                }),
            );
            uploaded += 1;
            if ((uploaded + skipped) % 100 === 0) {
                console.log(`Processadas ${uploaded + skipped}/${manifest.length} imagens.`);
            }
        } catch (error: unknown) {
            failures.push({ cardId: entry.cardId, message: error instanceof Error ? error.message : "Falha desconhecida." });
        }
    });

    console.log(`Upload concluído: ${uploaded} enviados, ${skipped} já existentes, ${failures.length} falhas.`);
    if (failures.length > 0) {
        console.log(JSON.stringify(failures, null, 2));
        process.exitCode = 1;
    }
}

await main();
