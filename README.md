# Robert Intelligence — RAG-Chatbot für Robert Thomas GmbH

<div align="center">
  <img src="public/images/demo-thumbnail.png" alt="Robert Intelligence Demo" width="800" />
</div>

KI-gestützter Markenbotschafter für die Robert Thomas Gruppe. Beantwortet Kundenfragen zu **THOMAS** Staubsaugern (B2C) und **ROTHO** Industrieanlagen (B2B) mit echtem Produktwissen — kein Halluzinieren, sondern Retrieval-Augmented Generation aus einer kuratierten Wissensbasis.

## Was das System kann

- **Zwei-Marken-Intelligenz**: THOMAS (Haushalt) mit Du-Ansprache, ROTHO (Industrie) mit Sie-Ansprache. Automatische Erkennung des Kundenkontexts.
- **Phasenbasierte Gesprächsführung**: Bedarfsermittlung (Consultative Selling), Produktempfehlung, Social Proof — alles auf Deutsch, mit Siegerländer Tonalität.
- **RAG mit pgvector**: Embeddings via OpenAI `text-embedding-3-small`, Vektorsuche in Supabase PostgreSQL, semantisches Matching mit Schwellwert 0.5.
- **Wissensbasis aus echten Produktdaten**: Manuell kuratierte Knowledge Bases für beide Marken (insgesamt ca. 15.000+ Wörter Produktdaten), ingestiert über TypeScript-Ingestion-Pipeline.
- **Abgrenzungslogik**: Erkennt und behandelt "Thomas Magnete" (Herdorf) und "Rotho Schweiz" korrekt — kein Verwechseln mit nicht-verwandten Firmen.
- **Artifact-Mode**: Generiert Dokumente (Vergleiche, Anleitungen) im Chat, editierbar über ProseMirror-Editor.
- **E2E-Tests**: Playwright-Testsuite für Auth, Chat, Model-Selector, API.

## Tech Stack

| Ebene | Technologie |
|---|---|
| Framework | Next.js 15 (App Router, React 19) |
| Sprache | TypeScript (strict) |
| KI-Orchestrierung | Vercel AI SDK 6.x |
| LLM | Claude Sonnet 4 (Anthropic) |
| Embeddings | OpenAI text-embedding-3-small |
| Vektordatenbank | Supabase PostgreSQL + pgvector |
| Chat-Historie | Vercel Postgres (Neon) |
| Datei-Speicher | Vercel Blob |
| Caching | Redis (Upstash) |
| Auth | Auth.js v5 (NextAuth) |
| UI | shadcn/ui, Tailwind CSS 4, Radix UI |
| Testing | Playwright (4 E2E-Spezifikationen) |
| Hosting | Vercel |

## Architektur

```
User Input
    │
    ▼
┌─────────────────┐
│  Chat Route API  │  app/(chat)/api/chat/route.ts
└────────┬────────┘
         │
    ┌────▼────┐
    │  RAG     │  searchKnowledgeBase() → pgvector match_documents()
    │  Search  │  OpenAI Embedding → Supabase RPC
    └────┬────┘
         │ Kontext-Dokumente
    ┌────▼────┐
    │  Prompt  │  buildRAGSystemPrompt() → Claude Sonnet 4
    │  Builder │  + customSystemPrompt (Thoro Persona)
    └────┬────┘
         │
    ┌────▼────┐
    │  Stream  │  Vercel AI SDK streamText()
    │  Response│  UI Message Stream → React Client
    └─────────┘
```

## Projektstruktur

```
.
├── app/
│   ├── (auth)/          # Auth.js Login/Register
│   ├── (chat)/           # Chat-Interface + API Routes
│   │   ├── api/chat/     # Chat-API mit RAG-Integration
│   │   └── page.tsx      # Chat-UI
│   └── layout.tsx        # Root Layout (Metadata, Theme)
├── components/           # UI-Komponenten
│   ├── hero-section.tsx  # Landing Page mit Stats
│   ├── mode-selector.tsx # THOMAS vs ROTHO Auswahl
│   ├── chat-header.tsx   # Branding Header
│   └── ...
├── lib/
│   ├── ai/               # Prompts, Provider, Tools
│   │   ├── prompts.ts    # Thoro System-Prompt (150+ Zeilen)
│   │   ├── providers.ts  # Modell-Konfiguration
│   │   └── tools/        # createDocument, getWeather, etc.
│   ├── db/               # Drizzle ORM + Supabase Schema
│   ├── embeddings.ts     # OpenAI Embedding Client
│   ├── supabase.ts       # Supabase Client (pgvector)
│   └── ...
├── knowledge_bases/      # Kuratierte Produktdaten
│   ├── THOMAS_Complete.md  # Staubsauger (AQUA+, Zyklon, PET)
│   └── ROTHO_Complete.md   # Industrieanlagen (Trocknung, Filter)
├── scripts/
│   └── ingest-manual.ts  # Wissensbasis → Embeddings → Supabase
├── tests/
│   ├── e2e/              # Playwright E2E-Tests
│   └── fixtures.ts
└── PROJECT_CONTEXT.md    # Entwickler-Dokumentation (Deutsch)
```

## Local Setup

```bash
# 1. Dependencies
pnpm install

# 2. Environment
cp .env.example .env.local
# → Trage ANTHROPIC_API_KEY, OPENAI_API_KEY, SUPABASE_* Keys ein

# 3. Supabase Schema (pgvector + match_documents Funktion einrichten)
# Siehe PROJECT_CONTEXT.md für die SQL-Migration

# 4. Wissensbasis ingestieren
pnpm tsx scripts/ingest-manual.ts

# 5. Datenbank migrieren (Chat-Historie)
pnpm db:migrate

# 6. Dev-Server starten
pnpm dev
# → http://localhost:3000
```

## Deployment (Vercel)

```bash
vercel --prod
```

Umgebungsvariablen in Vercel Dashboard setzen (siehe `.env.example`). AI Gateway wird auf Vercel automatisch via OIDC authentifiziert.

## Tests

```bash
pnpm test
# Führt Playwright E2E-Tests aus:
# - Auth (Login/Register)
# - Chat (Nachrichten senden, RAG-Antworten)
# - Model Selector (Modell-Wechsel)
# - API (Chat-Endpunkt)
```

---

**Gebaut für Robert Thomas GmbH + Co. KG, Neunkirchen, Siegerland.**

*THOMAS — AQUA+ Technologie. ROTHO — Industrielle Trocknungssysteme. Made in Germany.*
