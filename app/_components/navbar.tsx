"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemedToggle } from "./themed-toggle";
import ThemedLogo from "./themed-logo";
import UserButtonComponent from "./user-button";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/transactions", label: "Transações" },
    { href: "/subscription", label: "Assinatura" },
    { href: "/register", label: "Cadastro" },
    { href: "/financial", label: "Financeiro" },
  ];
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-solid border-gray-400 bg-background px-6 py-4 dark:border-white/10">
      {/* ESQUERDA */}
      <div className="flex items-center gap-3">
        {/* LOGO */}
        <ThemedLogo />
        {/* MENU PRINCIPAL - DESKTOP */}
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transaction-colors h-full px-3 py-5 transition-colors ${
                pathname === link.href
                  ? "bg-primary/15 font-bold text-primary dark:bg-primary/20"
                  : "hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      {/* DIREITA */}
      {/* USER BUTTON */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex md:gap-4">
          <UserButtonComponent />
          <ThemedToggle />
        </div>
        {/* BOTÃO HAMBURGUER (mobile) */}
        <button
          className="rounded-lg p-2 hover:bg-muted md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="animate-slideDown absolute left-0 top-full flex w-full flex-col items-start border-t border-border bg-background shadow-md md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`w-full border-b px-6 py-3 text-sm ${
                pathname === link.href
                  ? "font-bold text-primary"
                  : "hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="w-full border-b px-4 py-3 text-sm">
            <div className="flex flex-row items-center justify-between">
              <UserButtonComponent />
              <ThemedToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
