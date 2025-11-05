"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/app/_lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      // "relative h-4 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.05)]",
      "relative h-4 w-full overflow-hidden rounded-full transition-colors",
      "bg-gray-300 dark:bg-[#b8b7b7]",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        // Cor principal com gradiente e transição suave
        "h-full w-full flex-1 transition-all",
        "bg-[#A1A1AA] dark:bg-[#5b5b61]",
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
