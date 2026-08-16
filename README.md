# Robert Thomas Chatbot — RAG-Wissensbot

**Kunde:** Robert Thomas — Wissensbasierter KI-Chatbot.
**Stack:** Next.js 16 · Supabase · OpenAI Embeddings · RAG.

## Was gebaut wurde
- NextAuth-Login (Credentials + Guest-Flow).
- **Streaming-Chat** mit Chat-Historie + optionalem Redis-Resumable-Stream.
- **RAG-Pipeline:** OpenAI-Embeddings → Supabase `match_documents` → Kontext-Injektion ins LLM.
- Wissensbasen `THOMAS_Complete.md` + `ROTHO_Complete.md` integriert.
- Upload (PNG/JPEG bis 5MB via Vercel Blob), Drizzle-Migrationen für Postgres.

## Status
Funktionsfähiger Prototyp mit vollständigem RAG-Code im Repo. Backend-Abhängigkeiten (Supabase/Redis) müssen für Live-Betrieb konfiguriert werden.

## Ergebnis
Beweis: ein dokumentenbasierter KI-Chatbot (RAG) ist mit Standard-Tools in kurzer Zeit realisierbar.

---

## Entwicklung & Deployment

**Umgebungsvariablen** (siehe `.env.example`):
- `AUTH_SECRET` + `POSTGRES_URL` — Basisbetrieb (Auth/Guest-Flow, Chat-Historie)
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` + `OPENAI_API_KEY` — RAG
- `BLOB_READ_WRITE_TOKEN`, `REDIS_URL` — Uploads / resumable Streams (optional)

**Reproduzierbarer Build ohne Secrets:**
Der Produktions-Build (`pnpm build`) läuft bewusst **ohne** Env-Variablen und ohne
live Datenbank — Supabase/OpenAI werden lazy initialisiert und nur zur
Request-Zeit benötigt; ohne Konfiguration degradiert der Chat auf Non-RAG und
der Guest-Flow antwortet mit einem sauberen 503. Das schützt der CI-Job
`lint.yml` (Lint → Typecheck → Build) ab.

**Datenbank-Migrationen** laufen NICHT mehr automatisch im Build
(vorher: `tsx lib/db/migrate && next build`). Vor einem Deployment mit neuen
Schema-Änderungen explizit ausführen:

```bash
pnpm db:migrate   # führt lib/db/migrate.ts aus (no-op ohne POSTGRES_URL)
```

**Checks & Tests:**
```bash
pnpm lint        # ultracite/biome
pnpm typecheck   # tsc --noEmit
pnpm build       # next build (env-frei)
pnpm test        # Playwright-E2E (benötigt laufenden Server + .env.local;
                 #  Browser einmalig: pnpm exec playwright install chromium)
```

---
*Gebaut mit KI-Orchestrierung (Vibe-Building).*
