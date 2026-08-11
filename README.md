# Robert Thomas Chatbot

Ein Next.js-Chatbot-Prototyp für die im Repository enthaltenen THOMAS- und ROTHO-Wissensbasen. Die Chat-Route kann Nutzerfragen mit Embeddings gegen Supabase-Dokumente abgleichen und die Treffer als Kontext an das Sprachmodell weitergeben.

## Status

**Implementierter, aber integrationsabhängiger Prototyp.** Auth-, Chat-, Artefakt-, Datei-Upload-, Datenbank- und RAG-Code sind im Repository vorhanden. Eine anonyme öffentliche Bereitstellung konnte bei diesem Audit nicht verifiziert werden: Der aktuelle Deployment-Einstieg leitet an den Guest-Auth-Flow weiter, der ohne eingerichtete Backend-Abhängigkeiten nicht als öffentlich nutzbare Chat-URL bestätigt werden konnte. Deshalb wird hier keine Live-URL behauptet.

## Implementierter Umfang

- NextAuth-Credentials-Login mit regulären und Guest-User-Flows.
- Streaming-Chat-Route mit Chat-Historie, Nachrichtenpersistenz und optionalem resumable stream über `REDIS_URL`.
- RAG-Pfad: OpenAI-Embeddings, Supabase-RPC `match_documents` und Kontext-Injektion für die Chat-Antwort.
- Chat-Modellauswahl im UI; die aktuelle Provider-Implementierung erzeugt Anthropic-Modelle über `@ai-sdk/anthropic`.
- Artefakt-/Code-Tools und Markdown-/Code-Darstellung aus dem vorhandenen Chatbot-Template.
- PNG/JPEG-Upload über Vercel Blob bis 5 MB.
- Drizzle-Migrationen für Postgres sowie die getrackten Wissensbasen `knowledge_bases/THOMAS_Complete.md` und `knowledge_bases/ROTHO_Complete.md`.

## Evidence-backed stack

- Next.js 16.0.10, React 19.0.1, TypeScript und pnpm 9.12.3.
- AI SDK 6.0.37, `@ai-sdk/anthropic`, `@ai-sdk/openai` und `@ai-sdk/gateway` im Manifest; der tatsächlich verdrahtete Runtime-Provider ist Anthropic und der Default ist `claude-sonnet-4-5`.
- Drizzle ORM + `postgres` für Postgres.
- Supabase JavaScript-Client für die Vektor-Suche.
- NextAuth 5 beta, Vercel Blob, `resumable-stream`, Tailwind CSS 4 und Radix UI.

## Setup und Verwendung

```bash
pnpm install
cp .env.example .env.local
pnpm db:migrate
pnpm dev
```

Vor dem Start müssen mindestens die zu verwendenden Secrets und Dienste konfiguriert werden. Die Namen sind im Beispiel-Env dokumentiert; je nach Funktionsumfang gehören dazu `AUTH_SECRET`, `POSTGRES_URL`, `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, die Supabase-URL/der anonyme Key und für Uploads `BLOB_READ_WRITE_TOKEN`. `REDIS_URL` ist für resumable streams optional.

Für die RAG-Nutzung müssen die Supabase-Dokumenttabellen, Embeddings und die im Chat-Code aufgerufene RPC-Funktion `match_documents` in der externen Supabase-Instanz vorhanden sein. Die lokalen Drizzle-Migrationen betreffen die Chat-/User-Datenbank und ersetzen diese Vektor-Infrastruktur nicht.

Die vorhandenen Ingest-Skripte können die getrackten Wissensbasen mit einem konfigurierten Embedding- und Supabase-Setup importieren. Ohne diese Dienste ist der UI-Code nicht gleichbedeutend mit einem funktionierenden, produktiven Chatbot.

## Geplanter / nicht belegter Umfang

Die Modellliste im UI enthält mehrere Provider-/Modell-IDs. Im aktuellen `getLanguageModel`-Pfad ist jedoch nur die Anthropic-Erzeugung verdrahtet; funktionierende OpenAI-, Google- oder xAI-Auswahl wird deshalb nicht als geliefert dokumentiert. Kein belastbarer Produktionsbetrieb, keine geprüfte anonyme Demo-URL und kein unabhängiger Antwortqualitäts-Benchmark sind im Repository belegt.

## Einschränkungen

- Betrieb benötigt externe Postgres-, Supabase-, Embedding-, Anthropic- und gegebenenfalls Blob-/Redis-Dienste.
- Guest-Login legt Nutzer in der Datenbank an; ohne `POSTGRES_URL` und Migrationen scheitert der Auth-/Chat-Flow.
- Die RAG-Abfrage hängt von einer korrekt eingerichteten Supabase-RPC-Funktion und kompatiblen Vektordaten ab.
- Modellnamen im UI dürfen nicht mit tatsächlich unterstützten Runtime-Providern verwechselt werden.
- Uploads sind auf JPEG/PNG und 5 MB begrenzt und benötigen einen Vercel-Blob-Token.
- Es gibt keinen verifizierten anonymen öffentlichen Deployment-Link in dieser Dokumentation.
