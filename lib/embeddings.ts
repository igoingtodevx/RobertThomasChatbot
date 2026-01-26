import OpenAI from "openai";

const openaiKey = process.env.OPENAI_API_KEY;

if (!openaiKey) {
  throw new Error("Missing OpenAI API key (OPENAI_API_KEY)");
}

const openai = new OpenAI({ apiKey: openaiKey });

/**
 * Generiert ein Embedding für einen gegebenen Text mit OpenAI.
 * @param text Der Text, für den ein Embedding erstellt werden soll.
 * @returns Ein Array mit dem Embedding-Vektor.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error("Failed to generate embedding");
  }
}
