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
  themeColor?: string;
  themeBg?: string;
}

export default function FAQSection({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about this service.",
  items,
  className,
  themeColor = "#C9232D",
  themeBg,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className={cn("py-20 md:py-32 relative overflow-hidden", className)}
      style={themeBg ? { backgroundColor: themeBg } : undefined}
    >
      <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none opacity-20">
        <MeltingDrip color={themeColor} height={200} variant="random" />
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
                className="border-2 rounded-2xl overflow-hidden transition-all duration-300 bg-white/60"
                style={
                  isOpen
                    ? { borderColor: themeColor, boxShadow: `0 4px 20px ${themeColor}20` }
                    : { borderColor: "rgba(0,0,0,0.08)" }
                }
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left"
                >
                  <span
                    className="font-bold text-lg md:text-xl pr-8 transition-colors"
                    style={{ color: isOpen ? themeColor : "#171717" }}
                  >
                    {item.question}
                  </span>
                  <div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={
                      isOpen
                        ? { backgroundColor: themeColor, color: "#fff" }
                        : { backgroundColor: "rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.4)" }
                    }
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
