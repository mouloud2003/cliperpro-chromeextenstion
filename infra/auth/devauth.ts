import { prisma } from "@/infra/prisma/client";

export async function getDevUserId(): Promise<string> {
  const email = process.env.DEV_USER_EMAIL ?? "dev@clipperpro.local";

  const user = await prisma.user.upsert({
    where: { email },
    create: { email },
    update: {},
    select: { id: true },
  });

  return user.id;
}
