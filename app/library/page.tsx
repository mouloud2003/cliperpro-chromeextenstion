import { ClipService } from "@/core/applicationlogique/services/clipservice";
import { ClipRepoPrisma } from "@/infra/prisma/repos/cliprepo";
import { requireUser } from "@/infra/auth/requireUser";
import { ClipLibrary } from "@/app/components/ClipLibrary";

export default async function Home() {
  const user = await requireUser();
  const clipService = new ClipService(new ClipRepoPrisma());
  const { items: clips } = await clipService.listUserClips(user.id);

  return <ClipLibrary clips={clips} />;
}
