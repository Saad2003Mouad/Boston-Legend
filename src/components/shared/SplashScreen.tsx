"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("splashSeen");
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem("splashSeen", "true");
      const timer = setTimeout(() => setVisible(false), 2800);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, #071B3A 0%, #123E73 50%, #071B3A 100%)" }}
          onClick={() => setVisible(false)}
        >
          {/* Animated background rings — gold and strawberry */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{ border: "1px solid rgba(201,154,61,0.15)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{ border: "1px solid rgba(201,35,45,0.18)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          />
          <motion.div
            className="absolute w-[200px] h-[200px] rounded-full"
            style={{ background: "rgba(201,154,61,0.06)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
          >
            <div className="relative w-64 md:w-80 h-32 md:h-40 flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="American Legend Ice Cream Truck"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Brand name */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="font-sans font-black text-xs md:text-sm tracking-[0.35em] uppercase text-red">
                Ice Cream Truck • Massachusetts
              </p>
            </motion.div>

            {/* Animated dots loader — gold */}
            <motion.div
              className="flex gap-2 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#C99A3D" }}
                  animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Tap to skip hint */}
          <motion.p
            className="absolute bottom-10 text-sm font-medium tracking-wider"
            style={{ color: "rgba(255,255,255,0.25)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Tap anywhere to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
