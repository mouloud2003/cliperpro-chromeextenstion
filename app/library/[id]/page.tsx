import { ClipService } from "@/core/applicationlogique/services/clipservice";
import { ClipRepoPrisma } from "@/infra/prisma/repos/cliprepo";
import { requireUser } from "@/infra/auth/requireUser";
import { notFound } from "next/navigation";
import { ClipDetailView } from "./ClipDetailView";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser();
  const clipService = new ClipService(new ClipRepoPrisma());

  try {
    const clip = await clipService.getClipDetails(user.id, id);
    return <ClipDetailView clip={clip} />;
  } catch {
    notFound();
  }
}
