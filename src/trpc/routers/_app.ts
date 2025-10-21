import { createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/prisma";

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(async ({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(() => {
    return prisma.workflow.create({
      data: {
        name: "New Workflow",
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
