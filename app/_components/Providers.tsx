"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, shadesOfPurple } from "@clerk/themes"; // você pode usar outros temas do Clerk
import { useEffect, useState } from "react";

// Esse wrapper serve para passar o tema dinâmico pro Clerk
function ClerkThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita erro de hidratação (Next.js)
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : shadesOfPurple, // alterna o tema aqui
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ClerkThemeWrapper>{children}</ClerkThemeWrapper>
    </ThemeProvider>
  );
}
