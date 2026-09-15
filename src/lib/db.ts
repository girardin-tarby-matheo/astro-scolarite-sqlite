import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const path = resolve(import.meta.env.SQLITE_DB_PATH || "./data/scolarite.sqlite");
mkdirSync(dirname(path), { recursive: true });
console.log("PATH:", path);

const db = process.versions.bun
    ? await (async () => {
        const { Database } = await import("bun:sqlite");
        const database = new Database(path);
        database.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;");

        return {
            prepare(sql: string) {
                const statement = database.query(sql);
                return {
                    all: () => statement.all(),
                    get: () => statement.get(),
                };
            },
        };
    })()
    : await (async () => {
        const { default: Database } = await import("better-sqlite3");
        const database = new Database(path);
        database.pragma("foreign_keys = ON");
        database.pragma("journal_mode = WAL");
        return database;
    })();

export default db;