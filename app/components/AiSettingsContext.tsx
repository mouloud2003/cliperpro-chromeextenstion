"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface AiSettingsContextValue {
  aiEnabled: boolean;
  tosAccepted: boolean;
  loading: boolean;
  showTos: boolean;
  setShowTos: (v: boolean) => void;
  handleToggleAi: () => void;
  handleTosAccept: () => void;
  handleTosDecline: () => void;
}

const AiSettingsContext = createContext<AiSettingsContextValue | null>(null);

export function useAiSettings() {
  const ctx = useContext(AiSettingsContext);
  if (!ctx)
    throw new Error("useAiSettings must be used inside <AiSettingsProvider>");
  return ctx;
}

export function AiSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [aiEnabled, setAiEnabled] = useState(false);
  const [tosAccepted, setTosAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showTos, setShowTos] = useState(false);

  // Fetch current settings once on mount
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/v1/settings");
        if (res.ok) {
          const data = await res.json();
          const enabled = data?.settings?.aiEnabled ?? false;
          setAiEnabled(enabled);
          if (enabled) setTosAccepted(true);
        }
      } catch {
        // fall back to defaults
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const updateAiSetting = useCallback(async (enabled: boolean) => {
    try {
      await fetch("/api/v1/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aiEnabled: enabled }),
      });
    } catch {
      setAiEnabled(!enabled);
    }
  }, []);

  const handleToggleAi = useCallback(() => {
    if (aiEnabled) {
      setAiEnabled(false);
      updateAiSetting(false);
    } else {
      if (tosAccepted) {
        setAiEnabled(true);
        updateAiSetting(true);
      } else {
        setShowTos(true);
      }
    }
  }, [aiEnabled, tosAccepted, updateAiSetting]);

  const handleTosAccept = useCallback(() => {
    setTosAccepted(true);
    setAiEnabled(true);
    setShowTos(false);
    updateAiSetting(true);
  }, [updateAiSetting]);

  const handleTosDecline = useCallback(() => {
    setShowTos(false);
  }, []);

  return (
    <AiSettingsContext.Provider
      value={{
        aiEnabled,
        tosAccepted,
        loading,
        showTos,
        setShowTos,
        handleToggleAi,
        handleTosAccept,
        handleTosDecline,
      }}
    >
      {children}
    </AiSettingsContext.Provider>
  );
}
