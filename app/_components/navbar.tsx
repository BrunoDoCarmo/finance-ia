"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/transactions", label: "Transações" },
    { href: "/subscription", label: "Assinatura" },
  ];
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-solid bg-background px-6 py-4">
      {/* ESQUERDA */}
      <div className="flex items-center gap-3">
        {/* LOGO */}
        <Image
          src="/logo.svg"
          width={150}
          height={40}
          alt="Finance AI"
          className="h-8 w-auto"
        />
        {/* MENU PRINCIPAL - DESKTOP */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transaction-colors ${
                pathname === link.href
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
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
        <UserButton showName />
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
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
