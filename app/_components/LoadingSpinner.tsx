"use client";

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/80 backdrop-blur-md"
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      >
        <Loader2 className="h-12 w-12 text-primary drop-shadow-[0_0_6px_rgba(0,255,255,0.4)]" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-base font-medium tracking-wide text-muted-foreground"
      >
        Carregando...
      </motion.p>
    </motion.div>
  );
};

export default LoadingSpinner;
