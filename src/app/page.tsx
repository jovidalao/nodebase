"use client";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const queryClient = useQueryClient();
  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    })
  );

  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("AI execution started");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  return (
    <div
      className="min-h-screen flex items-center 
    justify-center flex-col gap-y-6"
    >
      <SignOutButton />
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Test AI
      </Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Page;
