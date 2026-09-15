# TP — Application AstroJS en mode SSR de gestion de la scolarité avec SQLite

## Objectif

L'objectif de ce TP est de récupérer depuis GitHub l'application web de gestion de la scolarité développée avec **AstroJS**, de préparer son environnement, puis de la lancer en **mode SSR (Server-Side Rendering)**.

L'application utilise AstroJS, Node.js/npm, et SQLite.

## 1. Pré-requis sur la machine de développement

Vérifiez les installations :

```bash
bun --version
git --version
```

Si Bun n'est pas installer alors faites:
> **Sur Windows**
```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

> **Sur MacOS**
```bash
curl -fsSL https://bun.com/install | bash
```

## 2. Copier l'application Web astro-scolarite-sqlite
Téléchargez puis dézipper le fichier : https://cloud.femto-st.fr/nextcloud/index.php/s/PR7E4BfemeNdT7E

Ouvrez le dossier astro-scolarite-sqlite avec VS Code
```

## 3. Installer les dépendances

```bash
bun install
```

## 4. Installer AstroJS

Pour installer la dernière version d'Astro :

```bash
bun add astro@latest
```

Vérifiez la version :

```bash
bunx astro --version
```

## 5. Installer l'adaptateur Node pour le SSR

Installez l'adaptateur astro :

```bash
bun add @astrojs/node@latest
```

## 6. Configurer Astro en SSR

Le fichier `astro.config.mjs` doit contenir une configuration similaire à :

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
});
```

`output: 'server'` indique qu'Astro doit générer une application SSR.

`@astrojs/node` permet d'exécuter l'adaptateur astro.

## 7. Configurer SQLITE sur la machine de développement

> **Pour accéder à des bases de données SQLite, Bun AstroJS utilise la librairie bun:sqlite. Une librairie native de Bunqui nécéssite pas d'installation**

Dans `.env`, renseignez la connexion SQLite réprésentée par le fichier base de données .sqlite :

```env
SQLITE_DB_PATH=./data/scolarite.sqlite"
```

Créez le dossier data :

```bash
mkdir ./data
```

Puis créer la nouvelle BDD scolarite.sqlite sur la base du schéma indiqué dans db\schema.sql

```bash
sqlite3 data/scolarite.sqlite ".read db/schema.sql"
```

Pour vérifiez la création des 4 tables de la base de données

```bash
sqlite3 data/scolarite.sqlite 
```

```sql
.tables
.q
```

Les principales tables sont `students`, `formations`, `registrations`, `courses`.

## 9. Lancer l'application en mode développement SSR

```bash
bun run --bun dev
```

Puis ouvrez :

```text
http://localhost:4321
```


## 10. Architecture SSR

Le principe de fonctionnement est :

```text
Navigateur
    |
    | HTTP/HTTPS sur Internet
    v
Astro SSR / Node.js
    |
    | SQL en localhost
    v
SQLite
```

Les requêtes SQLite sont exécutées côté serveur et non dans le navigateur.

## 11. Compiler l'application

```bash
bun run --bun build
```

Cette commande construit l'application Astro pour la production en respectant la configuration SSR.

## 12. Tester le build

Vous pouvez tester le résultat avec :

```bash
bun run --bun build
```


```bash
bun ./dist/server/entry.mjs
```


## 15. Questions

### Question 1

Ajoutez des enregistrements à l'ensemble des tables

### Question 2

Ajoutez une table teachers et modifiez db/schema.sql en conséquence

### Question 3

Modifiez le code pour ajouter un menu Teachers (src/layouts/Layout.astro), ajouter une page pages/teachers/index.astro, ajouter un card à src/index.astro et 

### Question 4

Recompilez le code en mode build
### Question 5

Validez avec l'intervenant

**Attention : ne transmettez jamais votre fichier `.env` **
