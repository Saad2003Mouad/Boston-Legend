"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Only show the jaw-dropping animation on the homepage
    if (pathname !== "/") {
      setVisible(false);
      return;
    }
    
    // The animation takes exactly 2.6 seconds before sliding up
    const timer = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ y: 0 }}
          exit={{ y: "-100%", opacity: 0.5 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#071B3A] overflow-hidden"
        >
          {/* Subtle animated background glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[#C9232D]/20 blur-[120px]" />
          </motion.div>

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -90 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.5 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="text-[#C99A3D] text-5xl md:text-6xl drop-shadow-[0_0_15px_rgba(201,154,61,0.5)]">
                ★
              </div>
            </motion.div>

            <div className="flex flex-col items-center overflow-hidden">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white tracking-wider uppercase text-center leading-none"
              >
                American
              </motion.h1>
            </div>
            
            <div className="flex flex-col items-center overflow-hidden mt-1 md:mt-2">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.76, 0, 0.24, 1] }}
                className="font-display font-black italic text-5xl md:text-7xl lg:text-8xl text-[#C9232D] tracking-tight uppercase text-center leading-none"
              >
                Legend
              </motion.h1>
            </div>
            
            <div className="mt-8 overflow-hidden">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className="font-sans font-bold text-sm md:text-base text-[#FFF4D6]/70 tracking-[0.4em] uppercase text-center"
              >
                Massachusetts' Premier Ice Cream
              </motion.p>
            </div>
          </div>
          
          {/* Loading line sweep */}
          <motion.div 
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#071B3A] via-[#C99A3D] to-[#071B3A]"
            initial={{ width: "0%", left: "50%", x: "-50%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, delay: 0.2, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
