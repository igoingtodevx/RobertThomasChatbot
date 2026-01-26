import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { readFileSync } from "fs";
import { join } from "path";

// 1. Config laden
config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const openaiKey = process.env.OPENAI_API_KEY;

if (!supabaseUrl || !supabaseKey || !openaiKey) {
  throw new Error("❌ Missing environment variables in .env.local");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const openai = new OpenAI({ apiKey: openaiKey });

// 2. Hilfsfunktion: Trennt Metadaten vom Text
// Liest Zeile für Zeile. Solange "Key: Value" kommt, ist es Metadaten. 
// Sobald Text/Überschriften kommen, ist es Content.
function parseChunk(chunk: string): { metadata: any; content: string } {
  const lines = chunk.split('\n');
  const metadata: any = {};
  let contentStartLine = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue; // Leere Zeilen überspringen

    // Prüfen ob Zeile wie "key: value" aussieht UND keine Überschrift (#) ist
    const colonIdx = line.indexOf(':');
    if (colonIdx > -1 && !line.startsWith('#') && !line.startsWith('- ')) {
      const key = line.substring(0, colonIdx).trim();
      let value = line.substring(colonIdx + 1).trim();
      
      // Anführungszeichen entfernen falls vorhanden
      value = value.replace(/^["']|["']$/g, "");
      
      if (key && value) {
        metadata[key] = value;
        contentStartLine = i + 1; // Content beginnt frühestens nächste Zeile
        continue;
      }
    }
    
    // Sobald wir eine Zeile finden, die KEIN Metadaten-Key ist, stoppen wir
    // Das ist der Start des Contents (z.B. eine # Überschrift)
    if (contentStartLine === 0) contentStartLine = i; // Fallback falls gar keine Metadata
    break; 
  }

  const content = lines.slice(contentStartLine).join('\n').trim();
  return { metadata, content };
}

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
}

async function processFile(filePath: string) {
  console.log(`\n📂 Reading file: ${filePath}`);
  const fileContent = readFileSync(filePath, "utf-8");
  
  // Splitte am Trennzeichen '---'
  const rawChunks = fileContent.split("---");
  
  let successCount = 0;

  for (let i = 0; i < rawChunks.length; i++) {
    const rawChunk = rawChunks[i].trim();
    if (!rawChunk) continue; // Leere Chunks überspringen

    // Unsere Parser-Logik anwenden
    const { metadata, content } = parseChunk(rawChunk);

    // Sicherheits-Check: Nur speichern wenn Content da ist
    if (!content || content.length < 10) {
      console.log(`  ⚠️ Skipping Chunk ${i} (No content or too short)`);
      continue;
    }

    try {
      // Embedding holen
      const embedding = await generateEmbedding(content);

      // In Supabase speichern
      const { error } = await supabase.from("documents").insert({
        content: content,
        metadata: metadata, // Die extrahierten Metadaten (brand, category...)
        embedding: embedding,
      });

      if (error) throw error;
      
      process.stdout.write("."); // Fortschrittspunkt
      successCount++;
      
    } catch (err: any) {
      console.error(`\n  ❌ Error Chunk ${i}:`, err.message);
    }
  }
  console.log(`\n✅ ${successCount} chunks inserted from this file.`);
}

async function main() {
  console.log("🚀 Starting Robert Thomas Knowledge Ingestion...\n");
  
  const baseDir = join(process.cwd(), "knowledge_bases");
  
  // Wir verarbeiten beide Dateien
  const files = ["THOMAS_Complete.md", "ROTHO_Complete.md"];

  for (const fileName of files) {
    await processFile(join(baseDir, fileName));
  }

  console.log("\n🎉 ALL DONE! Check Supabase Table 'documents'.");
}

main().catch(console.error);
