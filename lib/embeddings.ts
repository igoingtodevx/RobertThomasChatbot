import OpenAI from "openai";

// Lazy singleton: the OpenAI client is only created on first use, so importing
// this module during `next build` never requires OPENAI_API_KEY.
let openai: OpenAI | null = null;

function getOpenAI(): OpenAI | null {
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    return null;
  }
  if (!openai) {
    openai = new OpenAI({ apiKey: openaiKey });
  }
  return openai;
}

/**
 * Generiert ein Embedding für einen gegebenen Text mit OpenAI.
 * @param text Der Text, für den ein Embedding erstellt werden soll.
 * @returns Ein Array mit dem Embedding-Vektor.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const client = getOpenAI();
  if (!client) {
    throw new Error("Missing OpenAI API key (OPENAI_API_KEY)");
  }
  try {
    const response = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error("Failed to generate embedding");
  }
}
