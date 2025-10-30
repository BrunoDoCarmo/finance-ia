"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export function RefreshOnLogin() {
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && userId) {
      window.location.reload();
    }
  }, [isLoaded, userId]);

  return null;
}
