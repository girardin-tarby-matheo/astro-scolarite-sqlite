# Astro Scolarité SQLite

Application AstroJS SSR de gestion de la scolarité avec SQLite et better-sqlite3.

## Installation

```bash
bun install
bun run db:init
bun run db:seed
bun run dev
```

Avec npm :

```bash
npm install
npm run db:init
npm run db:seed
npm run dev
```

Application : http://localhost:4321

## Build SSR

```bash
bunx astro build
```

## Production

```bash
node ./dist/server/entry.mjs
```

La base est stockée dans `data/scolarite.db` et n'est pas versionnée.
