import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Providers } from "./_components/providers";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Finance AI",
  description:
    "Gerencie suas finanças com inteligência artificial de forma rápida, prática e segura.",
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${mulish.className} antialiased`}>
        <Providers>
          <div className="flex h-full flex-col md:overflow-hidden">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
