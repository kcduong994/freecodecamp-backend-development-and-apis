# Build a Family Movie Watchlist API

**freeCodeCamp Back-End Development and APIs | Certification Project 05**
**Official freeCodeCamp completion: 1/1 — November 9, 2026 (user-confirmed screenshot)**

## Project goal

An educational HTTP API for a family movie watchlist, built with Node.js, Express 5, bcryptjs, jsonwebtoken, and Helmet. The application implements JWT-based authentication and role-based authorization (RBAC) for `parent` and `child` accounts.

The freeCodeCamp project has **23 official automated checks**. The course completion is confirmed; independent Windows integration testing is performed separately before the repository is published.

## Directory structure

```text
build-a-family-movie-watchlist-api/
├── data/
│   ├── users.example.json       # sanitized, publicly seeded training accounts
│   ├── watchlists.example.json  # canonical educational watchlist seed
│   ├── users.json               # runtime copy; ignored by Git
│   └── watchlists.json          # runtime copy; ignored by Git
├── middleware/
│   ├── authenticate.js          # named export: authenticate
│   └── authorize.js             # named export: authorizeModification
├── routes/
│   ├── auth.js                  # POST /api/auth/login
│   └── watchlist.js             # authenticated movie CRUD
├── scripts/
│   └── verify-movie-local.mjs   # 23-case independent local regression suite
├── utils/
│   └── db.js                    # course-provided JSON persistence functions
├── .env.example                 # environment variable template (no secret)
├── .gitignore                   # runtime data and secrets excluded
├── index.js                     # Express application, port 3000
├── package.json
├── package-lock.json
└── README.md
```

The `utils/db.js` code and public movie/user seed data originate from freeCodeCamp course starter files. The functional routes and middlewares were completed during the challenge; the local verification helper and safe sample fixtures were added for this archive.

## Setup — Windows PowerShell

In the repository root:

```powershell
Set-Location .\certification-projects\build-a-family-movie-watchlist-api
npm.cmd ci
```

If the runtime JSON files are absent, initialize them from the sanitized training fixtures:

```powershell
Copy-Item data/users.example.json data/users.json
Copy-Item data/watchlists.example.json data/watchlists.json
```

Do **not** overwrite an existing dataset without checking whether it contains data you want to preserve. `users.example.json` intentionally excludes the freeCodeCamp fixture-only `_password` field, but retains its public bcrypt hashes so that known training credentials still work.

Create a fresh local `.env` without exposing the secret:

```powershell
node -e "const fs=require('node:fs');const c=require('node:crypto');if(fs.existsSync('.env'))throw Error('.env already exists; do not overwrite');fs.writeFileSync('.env','PORT=3000\nJWT_SECRET='+c.randomBytes(32).toString('hex')+'\n')"
```

Start the server in terminal A:

```powershell
npm.cmd start
```

Expected server output: `Server running on port 3000...`.

In terminal B, from the same project directory:

```powershell
curl.exe -i http://127.0.0.1:3000/
node --env-file=.env scripts/verify-movie-local.mjs
npm.cmd audit --omit=dev
```

The regression suite implements 23 checks mirroring the official user stories. It logs `Integration results: 23/23 PASS` only when all cases succeed. It uses two public training accounts; temporary movie records are deleted afterward. It does not print JWTs.

## API contract

| HTTP method | Endpoint | Authentication | Access rules |
|---|---|---|---|
| `POST` | `/api/auth/login` | Not required | Validate username/password; return JWT (`200`), or `400`/`401` |
| `GET` | `/api/watchlist/:userId` | JWT required | Any signed-in user can read any family watchlist |
| `POST` | `/api/watchlist/:userId/movies` | JWT required | Parent: anyone; child: own list only |
| `PUT` | `/api/watchlist/:userId/movies/:movieId` | JWT required | Parent: anyone; child: own list only |
| `DELETE` | `/api/watchlist/:userId/movies/:movieId` | JWT required | Parent: anyone; child: own list only |

### Authentication / authorization

1. `POST /api/auth/login` looks up the provided `username` with `findByUsername()` and uses `bcrypt.compare()` on the stored password hash. Incorrect credentials return HTTP `401` without indicating which field was wrong.
2. A valid login signs a JWT payload containing `id`, `username` and `role`, using `JWT_SECRET` and a one-day expiration.
3. `authenticate` validates `Authorization: Bearer <token>`, returning JSON `{ "error": "No token provided." }` or `{ "error": "Invalid or expired token." }` with HTTP `401` as appropriate, and adds the decoded claim to `req.user`.
4. `authorizeModification` grants a parent rights to modify any family list. A child may modify only their own list; other writes return HTTP `403` and `{ "error": "Access denied" }`.
5. Route `:userId` parameters are strings, but the provided `utils/db.js` looks up numeric IDs. Route handlers must convert them to numbers before calling its CRUD helpers.
6. The provided JSON database functions manage watchlists; the archived implementation does not replace or reimplement them.

## Verification

- [x] Official freeCodeCamp certification challenge **1/1**, November 9, 2026, user screenshot.
- [x] Course Codespaces showed successful login HTTP 200 with a JWT (user screenshot).
- [x] Windows `npm.cmd ci` and local server on port 3000 confirmed (local terminal).
- [x] Local `scripts/verify-movie-local.mjs` returned **23/23 PASS** (local terminal).
- [ ] Windows `npm.cmd audit --omit=dev` result recorded.
- [ ] Reviewed Git staged files and pushed the archive to personal GitHub.

**Windows local integration:** **23/23 PASS**, confirmed by running the independent local HTTP and middleware verification suite. This is separate from the freeCodeCamp course completion.

## Security and scope

This is a training API, not a production authorization platform. Its public demo account hashes are known fixtures; do not use those accounts or passwords for a real deployment. Seeded users are stored in a JSON file with no registration or account management. Movie changes are written to a local JSON file, without database transactions or multi-process locking. JWT roles remain trusted until token expiry, and JWTs are not revoked server-side. A production deployment would need durable storage, permissions refresh, rate limits, input validation, secure credential policy, HTTPS, secrets management and structured error logging.

`.env`, `node_modules/`, `data/users.json`, and `data/watchlists.json` are excluded from the published Git archive; documented example files allow local setup after cloning.

## GitHub archive

Repository: https://github.com/kcduong994/freecodecamp-backend-development-and-apis
Location: `certification-projects/build-a-family-movie-watchlist-api/`
Status: ready for commit/push after reviewing staged files; verify GitHub publication separately.
