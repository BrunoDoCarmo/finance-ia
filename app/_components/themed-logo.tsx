"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

const ThemedLogo = () => {
  const { theme } = useTheme();

  const logoSrc = theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg";

  return (
    <Image
      src={logoSrc}
      width={150}
      height={40}
      alt="Finance AI"
      className="h-8 w-auto transition-opacity duration-300"
    />
  );
};

export default ThemedLogo;
