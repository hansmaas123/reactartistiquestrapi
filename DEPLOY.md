# Deployment

This repo has two independently-deployed parts:

| Part            | What it is                        | Where it goes                        | How it deploys                        |
| --------------- | --------------------------------- | ------------------------------------ | ------------------------------------- |
| `client/`       | React + Vite **static** SPA       | `/www/react` → `https://tuinenko.be/react/` | **Automatic** via GitHub Actions (FTP) |
| `server/`       | Strapi 4 API + database (Node)    | A Combell **Node** app               | **Manual** (upload a zip, once)        |

> **Where does the deployed site get its data?**
> The client has no database. At runtime it calls the Strapi REST API at
> `VITE_STRAPI_URL/api/...`. That URL is **baked into the JS bundle at build
> time**, so the client must be built with the *public* Strapi URL — never
> `localhost`. The actual artwork records live in Strapi's database
> (`server/.tmp/data.db` for SQLite, or a MySQL database in production).

---

## 1. Client — automatic deploy to `/www/react`

On every push to `main` that touches `client/**`, the workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the SPA
and uploads `client/dist/` to `/www/react` over FTPS. You can also run it
manually from the **Actions** tab (“Run workflow”).

### One-time setup — GitHub → Settings → Secrets and variables → Actions

**Secrets** (encrypted):

| Secret         | Value                                             |
| -------------- | ------------------------------------------------- |
| `FTP_SERVER`   | FTP host, e.g. `ftp.tuinenko.be`                  |
| `FTP_USERNAME` | FTP login                                         |
| `FTP_PASSWORD` | FTP password                                      |

**Variables** (plain, not secret):

| Variable          | Value                                                        |
| ----------------- | ----------------------------------------------------------- |
| `VITE_STRAPI_URL` | Public Strapi URL, e.g. `https://api.tuinenko.be` (no trailing slash) |

### Notes

- **Target folder.** The workflow uploads to `server-dir: /www/react/`. If your
  FTP login lands *inside* the account root (so you already see a `www` folder),
  change it to `www/react/` in the workflow. Files must end up in `/www/react`.
- **Subpath is already handled.** Because the site is served from `/react/`,
  the build sets Vite `base: '/react/'`, the router `basename: '/react'`, and a
  bundled [`.htaccess`](client/public/.htaccess) rewrites deep links (e.g.
  `/react/artwork/5`) back to `index.html`. If you ever move the app to a domain
  root, set `base`/`RewriteBase` back to `/`.
- **`VITE_STRAPI_URL` is required.** The build **fails on purpose** if it's
  unset or points at `localhost`, so a broken build never ships. The value in
  `client/.env` (`localhost:1337`) is only the local-dev default — Vite lets the
  workflow's env var override it. Deploy Strapi first (section 2), set the
  variable, then the deploy will succeed and the client will point at Strapi.

---

## 2. Strapi — deploy to Railway (recommended)

Railway builds Strapi straight from GitHub, keeps it running, and gives it a
managed Postgres database. The repo is already prepared for it: the Postgres
driver (`pg`) is a dependency, Node is pinned to 20 via [`server/.nvmrc`](server/.nvmrc),
and [`server/config/database.js`](server/config/database.js) reads `DATABASE_URL`.

### a. Create the project

1. Go to <https://railway.app>, sign up (log in with GitHub).
2. **New Project → Deploy from GitHub repo →** pick `reactartistiquestrapi`.
3. Open the created service → **Settings**:
   - **Root Directory:** `server`  ← important; the repo has client + server.
   - Build/Start are auto-detected (`npm run build`, then `npm run start`).

### b. Add the database

1. In the project, **New → Database → Add PostgreSQL**.
2. Railway exposes a `DATABASE_URL` you'll reference in the next step.

### c. Set environment variables

On the Strapi **service → Variables**, add:

| Variable             | Value                                             |
| -------------------- | ------------------------------------------------- |
| `DATABASE_CLIENT`    | `postgres`                                        |
| `DATABASE_URL`       | `${{ Postgres.DATABASE_URL }}` (reference the DB) |
| `DATABASE_SSL`       | `false`                                           |
| `NODE_ENV`           | `production`                                      |
| `APP_KEYS`           | *(generate — 4 comma-separated values)*           |
| `API_TOKEN_SALT`     | *(generate)*                                      |
| `ADMIN_JWT_SECRET`   | *(generate)*                                      |
| `TRANSFER_TOKEN_SALT`| *(generate)*                                      |
| `JWT_SECRET`         | *(generate)*                                      |

Generate each secret locally with `openssl rand -base64 16`.
**Don't set `PORT` or `HOST`** — Railway provides `PORT` and Strapi binds it.

### d. Deploy & open the admin

1. Railway builds and deploys automatically. Under **Settings → Networking →
   Generate Domain** to get a public URL, e.g. `https://xxx.up.railway.app`.
2. Visit `https://<that-url>/admin` and create your admin account.
3. **Permissions:** Strapi starts with an empty Postgres DB, so set
   **Settings → Roles → Public** = `find` + `findOne` on Artwork, and
   **Authenticated** = `create/update/delete`. Then add a few artworks (or see
   *Migrating data* below to carry over your existing ones).
4. Sanity check: `https://<that-url>/api/artworks` should return JSON.

### e. Point the client at Strapi

Set the GitHub **variable** `VITE_STRAPI_URL` to the Railway URL (base only, no
`/api`, no trailing slash), then re-run the deploy workflow. The client will now
fetch live data.

### f. (Optional) Migrating your existing artworks

The Railway Postgres DB starts empty. Your current artworks live in the dev
SQLite file. To carry them over, the simplest path is Strapi's transfer tool
from your machine (Node 20) to the live instance — ask and I'll walk you
through `strapi transfer`. For a school project it's often easier to just
recreate a few pieces in the new admin.

---

## 2-alt. Strapi — deploy to Combell (Node) instead

If you'd rather keep everything on Combell (needs a plan with Node.js support):

1. Package the server: `./scripts/package-strapi.sh --with-data`
   → `strapi-server-<timestamp>.zip` (source + your SQLite data, no secrets).
2. In the Combell panel, create a **Node.js application** (Node 18 or 20 — not 22),
   upload/extract the zip, then run `npm install` and `npm run build`.
3. Start command: `npm run start`.
4. Copy [`server/.env.production.example`](server/.env.production.example) to
   `.env`; use a Combell **MySQL** database (or SQLite with `--with-data`).
5. Set the `VITE_STRAPI_URL` GitHub variable to the Strapi URL and redeploy the client.

---

## 3. Local development

Strapi 4 needs **Node ≤ 20** (its `better-sqlite3` binary won't compile on
Node 22). With `nvm`:

```bash
nvm use 20
cd server && npm install && npm run develop   # http://localhost:1337
```

```bash
cd client && npm install && npm run dev        # http://localhost:5173
```

The client reads `VITE_STRAPI_URL` from `client/.env`
(`http://localhost:1337` for local dev — see [`client/.env.example`](client/.env.example)).
