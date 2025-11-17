"use client";

import { Button } from "../_components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const RouterBack = () => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className="rounded-full border-gray-400 font-bold"
      onClick={() => router.back()}
    >
      <ChevronLeft />
    </Button>
  );
};

export default RouterBack;
