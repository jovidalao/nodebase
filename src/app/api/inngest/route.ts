import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { executeAi } from "@/inngest/function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [executeAi],
});
