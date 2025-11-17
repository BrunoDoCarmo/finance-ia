"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemedToggle } from "./themed-toggle";
import ThemedLogo from "./themed-logo";
import UserButtonComponent from "./user-button";
import { APP_VERSION } from "../version";
import clsx from "clsx";
import { Button } from "./ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setSubmenuOpen(submenuOpen === label ? null : label);
  };

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/transactions", label: "Transações" },
    { href: "/subscription", label: "Assinatura" },
    {
      label: "Cadastro",
      submenu: [
        { href: "/register/client", label: "Cliente" },
        { href: "/register/product", label: "Produto" },
        { href: "/register/supplier", label: "Fornecedor" },
      ],
    },
    { href: "/financial", label: "Financeiro" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-400 bg-background px-6 py-4 dark:border-white/10">
      {/* ESQUERDA */}
      <div className="flex items-center gap-3">
        <ThemedLogo />
      </div>

      {/* DIREITA */}
      <div className="flex items-center gap-4">
        {/* BOTÃO HAMBURGUER */}
        <button
          className="rounded-lg p-2 hover:bg-muted"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* OVERLAY ESCURO AO ABRIR */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* MENU MOBILE (RIGHT SIDEBAR) */}
      <div
        className={clsx(
          "fixed right-0 top-0 z-50 h-full w-full transform bg-background shadow-xl transition-transform duration-300 lg:w-1/2 lg:max-w-[300px]",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* HEADER DO MENU */}
        <div className="flex items-center justify-between border-b px-4 py-4">
          <strong className="text-lg font-semibold">Menu</strong>
          <Button onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </Button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col">
          {links.map((link) => {
            // SE TIVER SUBMENU
            if (link.submenu) {
              const isOpen = submenuOpen === link.label;

              return (
                <div key={link.label} className="w-full border-b">
                  {/* BOTÃO PRINCIPAL DO SUBMENU */}
                  <button
                    onClick={() => toggleSubmenu(link.label)}
                    className="flex w-full items-center justify-between px-6 py-4 text-sm font-medium"
                  >
                    {link.label}

                    {/* ÍCONE QUE GIRA */}
                    <span
                      className={clsx(
                        "transition-transform",
                        isOpen ? "rotate-90" : "rotate-0",
                      )}
                    >
                      ▶
                    </span>
                  </button>

                  {/* ITENS DO SUBMENU */}
                  <div
                    className={clsx(
                      "overflow-hidden transition-all duration-300",
                      isOpen ? "max-h-40" : "max-h-0",
                    )}
                  >
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMenuOpen(false)}
                        className="block w-full px-10 py-3 text-sm text-gray-600 hover:text-primary dark:text-gray-300"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            // LINKS NORMAIS
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  "w-full border-b px-6 py-4 text-sm",
                  pathname === link.href
                    ? "font-bold text-primary"
                    : "hover:text-primary",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* RODAPÉ FIXO NO FUNDO DO MENU */}
        <div className="absolute bottom-0 left-0 w-full border-t bg-background px-4 py-4">
          <div className="flex items-center justify-between">
            <UserButtonComponent />
            <div className="flex flex-col items-center gap-1">
              <ThemedToggle />
              <strong className="text-xs opacity-60">v: {APP_VERSION}</strong>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
