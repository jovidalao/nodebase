import { inngest } from "./client";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import type { LanguageModel } from "ai";
import { zhipu } from "zhipu-ai-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const executeAi = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap(
      "openrouter-generate-text",
      generateText,
      {
        model: openrouter.chat(
          "tngtech/deepseek-r1t2-chimera:free"
        ) as LanguageModel,
        system: "You are a helpful assistant.",
        prompt: event.data.prompt,
      }
    );

    const { steps: zhipuSteps } = await step.ai.wrap(
      "zhipu-generate-text",
      generateText,
      {
        model: zhipu.chat("glm-4.5-air") as unknown as LanguageModel,
        system: "You are a helpful assistant.",
        prompt: event.data.prompt,
      }
    );

    return { step };
  }
);
