"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { UsageDTO } from "@/core/domain/types";

interface UsageContextValue {
  /** Current usage data (null while first load in progress) */
  usage: UsageDTO | null;
  /** True only during the initial fetch */
  loading: boolean;
  /** Re-fetch usage from the backend (e.g. after a summarise call) */
  refreshUsage: () => Promise<void>;
}

const UsageContext = createContext<UsageContextValue | null>(null);

export function useUsage() {
  const ctx = useContext(UsageContext);
  if (!ctx) throw new Error("useUsage must be used inside <UsageProvider>");
  return ctx;
}

export function UsageProvider({ children }: { children: React.ReactNode }) {
  const [usage, setUsage] = useState<UsageDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUsage = useCallback(async (isInitial = false) => {
    try {
      const res = await fetch("/api/v1/usage");
      if (res.ok) {
        const data = await res.json();
        setUsage(data.usage ?? null);
      }
    } catch {
      // keep previous value on network error
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchUsage(true);
  }, [fetchUsage]);

  const refreshUsage = useCallback(async () => {
    await fetchUsage(false);
  }, [fetchUsage]);

  return (
    <UsageContext.Provider value={{ usage, loading, refreshUsage }}>
      {children}
    </UsageContext.Provider>
  );
}
