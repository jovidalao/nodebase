import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

const Page = async () => {
  await requireAuth();
  const data = await caller.getUsers();
  return (
    <div
      className="min-h-screen flex items-center 
    justify-center flex-col gap-y-6"
    >
      <SignOutButton />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Page;
