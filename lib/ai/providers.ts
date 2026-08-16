import { anthropic } from "@ai-sdk/anthropic";
import { customProvider } from "ai";
import { isTestEnvironment } from "../constants";

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : null;

export function getLanguageModel(modelId: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel(modelId);
  }

  // Extract provider and model name (e.g. "anthropic/claude-sonnet-4-5")
  const [provider, ...modelParts] = modelId.split("/");
  const model = modelParts.join("/");

  if (provider === "anthropic") {
    // TRICK: "as any" verhindert den TypeScript-Fehler beim Build
    return anthropic(model) as any;
  }
  throw new Error(`Unsupported provider: ${provider}`);
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  // TRICK: "as any" hinzufügen
  return anthropic("claude-haiku-4-5") as any;
}

export function getArtifactModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("artifact-model");
  }
  // TRICK: "as any" hinzufügen
  return anthropic("claude-haiku-4-5") as any;
}
