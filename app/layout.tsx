import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Providers } from "./_components/providers";
import Navbar from "./_components/navbar";
import { auth } from "@clerk/nextjs/server";

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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${mulish.className} antialiased`}>
        {userId ? (
          <Providers>
            <div className="flex h-full flex-col md:overflow-hidden">
              <Navbar />
              {children}
            </div>
          </Providers>
        ) : (
          <Providers>
            <div className="flex h-full flex-col md:overflow-hidden">
              {children}
            </div>
          </Providers>
        )}
      </body>
    </html>
  );
}
