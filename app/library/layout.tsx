export const runtime = "nodejs";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import Topbar from "../components/Topbar";
import Providers from "./Providers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { requireUser } from "@/infra/auth/requireUser";
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
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${ibmPlexSansArabic.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <Providers>
          <Topbar
            user={{ ...user, name: user.name || "", image: user.image || "" }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
