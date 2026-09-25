"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import MeltingDrip from "@/components/shared/MeltingDrip";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  className?: string;
}

export default function FAQSection({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about this service.",
  items,
  className,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={cn("py-20 md:py-32 relative overflow-hidden", className)}>

      {/* Pink Vector Drip from the top */}
      <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none opacity-30">
        <MeltingDrip color="#B3191F" height={200} variant="random" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display italic font-light text-4xl md:text-5xl text-charcoal mb-4"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-charcoal/60 text-lg md:text-xl font-medium"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "border-2 rounded-2xl overflow-hidden transition-colors duration-300",
                  isOpen
                    ? "border-coral bg-[#FFFDF8] shadow-md shadow-coral/10"
                    : "border-charcoal/10 bg-[#FFFDF8]/50 hover:border-charcoal/20"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left"
                >
                  <span
                    className={cn(
                      "font-bold text-lg md:text-xl pr-8 transition-colors",
                      isOpen ? "text-coral" : "text-charcoal"
                    )}
                  >
                    {item.question}
                  </span>
                  <div
                    className={cn(
                      "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                      isOpen
                        ? "bg-coral text-white"
                        : "bg-charcoal/5 text-charcoal/50"
                    )}
                  >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-charcoal/70 font-medium leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

