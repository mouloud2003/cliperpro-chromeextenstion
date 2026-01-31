import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import Topbar from "../components/Topbar";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${ibmPlexSansArabic.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <Topbar />
        {children}
      </body>
    </html>
  );
}
