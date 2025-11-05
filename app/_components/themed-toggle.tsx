"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemedToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita flash de tema incorreto no carregamento
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="m-2 flex h-2 w-2 items-center justify-center p-2">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-lg border border-gray-600 p-2 transition-colors hover:bg-gray-700"
        aria-label="Alternar tema"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}
