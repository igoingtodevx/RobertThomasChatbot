import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

const THINKING_SUFFIX_REGEX = /-thinking$/;

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

  const isReasoningModel =
    modelId.includes("reasoning") || modelId.endsWith("-thinking");

  if (isReasoningModel) {
    const cleanModelId = modelId.replace(THINKING_SUFFIX_REGEX, "");
    
    // Extract provider and model name
    const [provider, ...modelParts] = cleanModelId.split("/");
    const model = modelParts.join("/");

    let baseModel;
    if (provider === "anthropic") {
      baseModel = anthropic(model);
    } else if (provider === "openai") {
      baseModel = openai(model);
    } else {
      throw new Error(`Unsupported provider: ${provider}`);
    }

    return wrapLanguageModel({
      model: baseModel,
      middleware: extractReasoningMiddleware({ tagName: "thinking" }),
    });
  }

  // Extract provider and model name
  const [provider, ...modelParts] = modelId.split("/");
  const model = modelParts.join("/");

  if (provider === "anthropic") {
    return anthropic(model);
  } else if (provider === "openai") {
    return openai(model);
  } else {
    throw new Error(`Unsupported provider: ${provider}`);
  }
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  return anthropic("claude-haiku-4-5");
}

export function getArtifactModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("artifact-model");
  }
  return anthropic("claude-haiku-4-5");
}
