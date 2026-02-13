"use client";

import { AiSettingsProvider } from "../components/AiSettingsContext";
import { UsageProvider } from "../components/UsageContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AiSettingsProvider>
      <UsageProvider>{children}</UsageProvider>
    </AiSettingsProvider>
  );
}
