"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  id?: string;
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  id,
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      transition={{ delay }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.section>
  );
}
