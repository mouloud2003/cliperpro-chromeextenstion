export const runtime = "nodejs";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import Topbar from "../components/Topbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { requireUser } from "@/infra/auth/requireUser";
import { PrismaUsageRepository } from "@/infra/prisma/repos/usagerepo";
import { UsageService } from "@/core/applicationlogique/services/usageservice";
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-ibm-plex-arabic",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Clipper Pro ",
  description: "   Your Ultimate Learning Companion",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const user = await requireUser();
  const usageService = new UsageService(new PrismaUsageRepository());
  const usage = await usageService.getCurrentUsage(user.id);
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${ibmPlexSansArabic.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <Topbar
          user={{ ...user, name: user.name || "", image: user.image || "" }}
          usage={
            JSON.stringify(usage.remaining) + "/" + JSON.stringify(usage.limit)
          }
        />
        {children}
      </body>
    </html>
  );
}
