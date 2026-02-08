import { auth } from "@/auth";

export const requireUser = async () => {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
};
