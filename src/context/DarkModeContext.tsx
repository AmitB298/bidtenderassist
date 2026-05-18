"use client";
import { createContext, useContext, useState, useEffect } from "react";

const DarkModeContext = createContext({ dark: false, toggle: () => {} });

export function DarkModeProvider({ children }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
      setDark(true);
      document.body.style.background = "#0f172a";
      document.body.style.color = "#f1f5f9";
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("darkMode", String(next));
    document.body.style.background = next ? "#0f172a" : "#f8fafc";
    document.body.style.color = next ? "#f1f5f9" : "#0f172a";
  }

  if (!mounted) return <>{children}</>;

  return (
    <DarkModeContext.Provider value={{ dark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() { return useContext(DarkModeContext); }