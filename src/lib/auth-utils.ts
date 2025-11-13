import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

const isPrismaConnectionError = (error: unknown): error is { code: string } =>
  typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P1001";

const fetchSessionSafely = async () => {
  try {
    const requestHeaders = Object.fromEntries((await headers()).entries());

    return await auth.api.getSession({
      headers: requestHeaders,
    });
  } catch (error) {
    if (isPrismaConnectionError(error)) {
      console.error("[auth] Unable to reach Prisma datasource while fetching session (code P1001).");
    } else {
      console.error("Failed to retrieve session", error);
    }

    return null;
  }
};

export const requireAuth = async () => {
  const session = await fetchSessionSafely();

  if (!session) {
    redirect("/login");
  }

  return session;
};

export const requireUnAuth = async () => {
  const session = await fetchSessionSafely();

  if (session) {
    redirect("/");
  }
};
