import { inngest } from "./client";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import type { LanguageModel } from "ai";
import { google } from "@ai-sdk/google";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const executeAi = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps: openrouterSteps } = await step.ai.wrap(
      "openrouter-generate-text",
      generateText,
      {
        model: openrouter.chat(
          "tngtech/deepseek-r1t2-chimera:free"
        ) as LanguageModel,
        system: "You are a helpful assistant.",
        prompt: event.data.prompt,
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google.chat("gemini-2.5-flash") as LanguageModel,
        system: "You are a helpful assistant.",
        prompt: event.data.prompt,
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    return { steps: [...openrouterSteps, ...geminiSteps] };
  }
);
