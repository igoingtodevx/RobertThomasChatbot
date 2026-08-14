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
*Gebaut mit KI-Orchestrierung (Vibe-Building).*
