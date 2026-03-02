# Starter Back WCS - Express + TypeScript + MySQL

Ce projet est un template de démarrage pour développer des API REST avec **Express**, **TypeScript**, et **MySQL** (requêtes SQL brutes). Il est pré-configuré avec des outils de qualité de code comme **Biome** et **Husky**.

## Fonctionnalités

- **[Express](https://expressjs.com/)** : Framework web minimaliste pour Node.js.
- **[TypeScript](https://www.typescriptlang.org/)** : Superset typé de JavaScript pour un code plus robuste.
- **[MySQL2](https://github.com/sidorares/node-mysql2)** : Driver MySQL avec support des Promises (requêtes SQL brutes, pas d'ORM).
- **[Biome](https://biomejs.dev/)** : Toolchain web performante pour le linting et le formatage (remplace ESLint et Prettier).
- **[Husky](https://typicode.github.io/husky/)** : Gestionnaire de hooks Git pour automatiser les vérifications avant commit.

## Installation

1.  **Récupérer le projet** :
    ```bash
    git clone <votre-repo-url>
    cd starter-back-wcs
    ```

2.  **Installer les dépendances** :
    ```bash
    npm install
    ```
    Cette commande installe les librairies ET configure automatiquement Husky.

3.  **Configurer la base de données** :
    ```bash
    cp .env.sample .env
    ```
    Puis modifiez le fichier `.env` avec vos identifiants MySQL.

4.  **Créer la table d'exemple** :
    ```sql
    CREATE DATABASE IF NOT EXISTS starter_wcs;
    USE starter_wcs;
    CREATE TABLE items (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL
    );
    ```

## Développement

```bash
npm run dev
```

Le serveur sera accessible sur `http://localhost:3310`.

### Endpoints d'exemple

| Méthode | URL | Description |
| :--- | :--- | :--- |
| GET | `/api/items` | Récupérer tous les items |
| GET | `/api/items/:id` | Récupérer un item par ID |
| POST | `/api/items` | Créer un item (`{ "title": "..." }`) |
| PUT | `/api/items/:id` | Modifier un item |
| DELETE | `/api/items/:id` | Supprimer un item |

## Commandes Utiles

| Besoin | Commande | Pourquoi ? |
| :--- | :--- | :--- |
| **Lancer le serveur** | `npm run dev` | Démarre avec rechargement automatique (tsx watch). |
| **Vérifier / Corriger le code** | `npm run lint:fix` | À lancer **avant** de commit si vous avez des erreurs. |
| **Juste vérifier le code** | `npm run lint` | Voir les erreurs sans les corriger. |
| **Réparer les hooks Git** | `npm run prepare` | Si les hooks ne fonctionnent pas, lancez ça une fois. |
| **Compiler pour production** | `npm run build` | Compile le TypeScript dans le dossier `dist/`. |

## Qualité du Code & Git Hooks

### Biome
Nous utilisons **Biome** à la place de ESLint + Prettier. Un seul outil pour le linting et le formatage.

- Pour vérifier les erreurs : `npm run lint`
- Pour tout corriger automatiquement : `npm run lint:fix`

### Husky
**Husky** est configuré pour intercepter vos commits avec deux vérifications :
- **Pre-commit hook** : Vérifie que le diff ne dépasse pas 150 lignes, puis lance `npm run lint`. Si le code ne respecte pas les standards, le commit est bloqué.
- **Commit-msg hook** : Vérifie que le message de commit suit le format **Conventional Commits** (voir ci-dessous).

### Conventional Commits (Obligatoire)

Chaque message de commit doit suivre le format **Conventional Commits** :

```
type(scope): description
```

| Élément | Obligatoire | Détail |
| :--- | :--- | :--- |
| **type** | Oui | `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert` |
| **scope** | Non | Le module concerné entre parenthèses, ex: `(auth)`, `(items)` |
| **description** | Oui | Min 10 caractères, décrit ce que fait le commit |

**Exemples valides :**
```bash
git commit -m "feat: ajout de la route GET /api/items"
git commit -m "fix(items): correction de la requête SQL de mise à jour"
git commit -m "docs: mise à jour du README avec les instructions"
```

**Exemples invalides :**
```bash
git commit -m "fix stuff"        # Pas de ':' après le type
git commit -m "update"           # Type non reconnu
git commit -m "feat: fix"        # Description trop courte (min 10 caractères)
```

### Limite de taille des commits (150 lignes max)

Pour encourager des commits progressifs et logiques, chaque commit est limité à **150 lignes modifiées** (ajouts + suppressions).

> Les fichiers `package-lock.json` et `*.svg` sont exclus du comptage.

Si votre commit dépasse la limite :
1. `git reset HEAD` — désindexer tous les fichiers
2. `git add fichier1.ts` — ajouter un fichier à la fois
3. `git commit -m "feat: ..."` — commiter un petit bloc logique
4. Répéter pour les fichiers restants

## Utilisation de l'IA (ChatGPT, Claude, Copilot...)

Ce projet est configuré pour favoriser l'apprentissage. Si vous utilisez des outils d'IA :

- **ChatGPT / Claude / Autres** : Copiez le contenu du fichier `AI_INSTRUCTIONS.md` au début de votre conversation. L'IA vous guidera pas à pas sans donner la solution directement.

## Workflow Git

Ce projet utilise des **règles de protection**. Vous ne pouvez **pas** pousser directement sur `main` ou `dev`.

1.  **Créer une branche** :
    ```bash
    git checkout -b feature/ma-nouvelle-route
    ```
2.  **Coder** et faire vos commits (Husky vérifie votre code).
3.  **Pousser** votre branche :
    ```bash
    git push -u origin feature/ma-nouvelle-route
    ```
4.  **Ouvrir une Pull Request (PR)** sur GitHub vers `dev` (ou `main`).
5.  **Attendre la validation CI** (build + lint automatique).

## Structure du Projet

```
starter-back-wcs/
├── .husky/                 # Hooks Git (commit-msg, pre-commit)
├── .github/workflows/      # CI GitHub Actions
├── src/
│   ├── database/
│   │   └── client.ts       # Connexion MySQL (pool)
│   ├── modules/
│   │   └── items/
│   │       ├── itemsActions.ts   # Controllers CRUD
│   │       └── itemsRoutes.ts    # Routes Express
│   ├── app.ts              # Configuration Express
│   ├── main.ts             # Point d'entrée (listen)
│   └── router.ts           # Router principal
├── .env.sample             # Template variables d'environnement
├── biome.json              # Configuration Biome
├── tsconfig.json           # Configuration TypeScript
└── package.json            # Dépendances et scripts
```
