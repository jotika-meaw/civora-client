# CIVORA Client

Next.js App Router frontend for CIVORA.

## Setup
```bash
cp .env.example .env.local
npm install
npm run dev
```

Env:
- `NEXT_PUBLIC_API_URL` — Express URL
- `NEXT_PUBLIC_APP_URL` / `BETTER_AUTH_URL` — this app URL
- `MONGODB_URI` — same DB as server (Better Auth `user` collection)
- `BETTER_AUTH_SECRET` — min 32 chars, shared with server fallback
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `JWT_ISSUER`, `JWT_AUDIENCE` — must match server

## Routes
`/`, `/login`, `/register`, `/events`, `/events/[id]`, `/create-event`, `/manage-events`, `/joined-events`, `/profile`

Backend JWTs come from `GET /api/auth/token`; Express verifies via JWKS at `/api/auth/jwks` (or `BETTER_AUTH_SECRET` fallback locally).

## Deploy (Vercel)
- Set all env vars in Vercel
- Set server `CLIENT_URL` + `BETTER_AUTH_JWKS_URL=https://<vercel-domain>/api/auth/jwks`
