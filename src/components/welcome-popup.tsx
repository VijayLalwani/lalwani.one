"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("welcome-seen");
    if (!hasSeenPopup) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("welcome-seen", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative max-w-lg w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4 text-[15px] leading-relaxed text-gray-700 dark:text-white/80">
              <p>
                The original promise of the internet was simple: a decentralized
                digital Wild West where people could be themselves. You brought
                your personality, art, and weird ideas, and you threw them up on
                a screen for the world to mock you. It was chaotic, but it was
                beautiful.
              </p>
              <p>
                I consider myself the middle child of the internet. AOL
                chatrooms and raw RSS feeds were a bit before my time, but the
                algorithmic Facebook era was already too new. My glory days were
                spent on Orkut. That was where I proudly rocked an emo teen
                skull background paired with deeply profound quotes like,
                &ldquo;Mah L1fe, my Rul3s.&rdquo; While I am eternally grateful
                that my old profile somehow managed to dodge the Wayback Machine,
                saving me from lifelong embarrassment, I still feel a little sad
                about what we&apos;ve lost.
              </p>
              <p>
                Today&apos;s social media is no longer about expressing yourself.
                It&apos;s just an endless dopamine-farming corporate billboard. I
                miss the chaos. I want a little piece of the internet to actually
                be mine again.
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                So, here it is. Let the second era of embarrassing myself begin.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="mt-6 w-full cursor-pointer rounded-lg bg-gray-900 dark:bg-white px-4 py-2.5 text-sm font-semibold text-white dark:text-black transition-colors hover:bg-gray-700 dark:hover:bg-white/85"
            >
              Enter
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
