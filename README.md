# Javis — Installation & Run Guide

A short guide to run the full‑stack project (client + server) locally.

## Prerequisites
- Node.js v18+ (recommended)
- Yarn / npm / Bun
- MySQL (if using a local database per server/.env.example)

## Project Structure
- client/ — React + Vite frontend
- server/ — Express + Sequelize backend

## 1. Install Dependencies
(Optional) Install global dev tools:
```sh
npm install -g sequelize-cli nodemon
```

Install dependencies in each directory:
```sh
# Server
cd server
# choose one
yarn install
# or
npm install
# or
bun install

# Client
cd ../client
yarn install
# or
npm install
# or
bun install
```

## 2. Environment Configuration
Copy .env.example and adjust values:

- Client:
```sh
cd client
cp .env.example .env
```

- Server:
```sh
cd server
cp .env.example .env
```
Edit database connection, JWT secret, etc.

## 3. Migrations & Seeding
Run migrations/seeders (adjust according to scripts in package.json):
```sh
# from project root
yarn seed
# or
npm run seed
```

## 4. Run the App (Development)
Open two terminals:

Terminal 1 — server:
```sh
cd server
yarn dev
# or npm run dev
```

Terminal 2 — client:
```sh
cd client
yarn dev
# or npm run dev
```

Defaults:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080

## 5. Development Notes & Troubleshooting
- If you see "process is not defined", use import.meta.env (Vite) or a small config shim instead of using process.env directly in client code.
- Fast Refresh works best when files export only React components. Move Contexts (e.g. AuthContext) into separate files that do not export components.
- For cookie‑based authentication, ensure the backend allows CORS and requests are made with withCredentials.
- Check server logs (server/app.js) if API errors occur.

## 6. Useful Scripts (examples)
See client/package.json and server/package.json for full script list. Examples:
```sh
# build client
cd client && yarn build

# run production server (example)
cd server && NODE_ENV=production node ./bin/www
```

## 7. Security
- Do not commit .env files.
- Keep secrets (JWT secret, DB password) in secure environment variables.

## Tech Stack (overview)
- Frontend: React + Vite, Tailwind CSS, React Router, Axios
- Backend: Express, Sequelize (MySQL), JWT, bcrypt
- Dev tools: Nodemon, Sequelize CLI, ESLint

---

## Architecture Overview

This section explains the high‑level architecture and how data flows through the system.

### Components
- Client (React + Vite)
  - Pages and components render UI, handle client routing and form inputs.
  - Calls backend APIs via Axios.
  - Uses import.meta.env for runtime config.
  - Persists minimal client state; auth state is provided via an AuthContext and AuthProvider.
- Server (Express)
  - Exposes RESTful endpoints under routes like /users, /auth, /api/...
  - Uses middleware for logging, CORS, JSON parsing, and authentication.
  - Authentication handled with JWTs (sent/verified via secure cookies) and/or session logic.
  - Uses Sequelize as ORM for MySQL (models, migrations, seeders).
- Database (MySQL)
  - Stores users, domain data. Managed via Sequelize models and migrations.

### Data / Auth Flow (simplified)
1. User submits login form on client (identifier + password).
2. Client POSTs to server /users/signin (Axios, withCredentials if cookies are used).
3. Server validates credentials, issues JWT and sets it as an HttpOnly secure cookie (or returns token).
4. Server responds with user info (and/or token).
5. Client stores minimal user state in AuthContext (do NOT store JWT in localStorage if using HttpOnly cookies).
6. For protected API calls, client includes credentials (withCredentials) and server verifies cookie/JWT in middleware.

### Routing & Protection
- Client routes use React Router; protected routes check AuthContext/loading to allow or redirect to login.
- Server routes use auth middleware to verify token and attach req.user before handlers run.

### Deployment Notes
- Option A: Deploy frontend as static build (Vite build) served by a CDN or static host; backend runs separately and exposes API.
- Option B: Serve client build from Express server (static directory) and run backend and frontend on same domain to simplify cookies/CORS.
- Ensure proper environment variables in production (DB, JWT secret, CORS origins).

### Directory snapshot (example)
- client/
  - src/
    - pages/
      - login.jsx
    - context/
      - AuthContext.jsx
      - AuthProvider.jsx
  - vite.config.js
- server/
  - models/
  - routes/
  - controllers/
  - app.js

## Where to look next
- client/src/context/AuthProvider.jsx — Auth provider implementation and verify flow
- client/src/pages/login.jsx — Login form and usage of AuthContext
- server/app.js — Express setup and middleware configuration

---