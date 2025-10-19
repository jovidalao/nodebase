import { requireAuth, requireUnAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

const Page = async () => {
  await requireAuth();
  const data = await caller.getUsers();
  return (
    <div
      className="min-h-screen flex items-center 
    justify-center flex-col gap-y-6"
    >
      {JSON.stringify(data, null, 2)}
    </div>
  );
};

export default Page;
