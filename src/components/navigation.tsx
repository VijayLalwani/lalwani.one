"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useCallback, useState, useMemo, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

function playClickSound() {
  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(1800, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.03);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.06);
}

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

const NAVIGATION_LINKS: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/blog", label: "blog" },
  { href: "/photos", label: "photos" },
] as const;

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = useCallback(() => {
    playClickSound();
  }, []);

  const currentBlogPost = useMemo(() => {
    const match = pathname.match(/^\/blog\/([^/]+)/);
    if (match) {
      const slug = match[1];
      return slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }
    return null;
  }, [pathname]);

  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between relative">
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col items-start">
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-white">
              Vijay Lalwani
            </h1>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Button & Theme Switcher */}
      <div className="md:hidden flex items-center gap-3 relative z-50">
        {/* Mobile Menu Button */}
        <button
          className={cn(
            "p-2 rounded-full transition-colors",
            isMenuOpen
              ? "bg-black/80 text-white dark:bg-white/10 dark:text-white"
              : "hover:bg-gray-200 dark:hover:bg-white/5"
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* Theme Switcher */}
        <button
          className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-white/5"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          type="button"
        >
          {mounted &&
            (theme === "dark" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            ))}
        </button>
      </div>

      {/* Dark Overlay when Menu is Open */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Background Darkener */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-16 left-4 right-4 z-50 md:hidden rounded-2xl overflow-hidden shadow-lg"
            >
              <motion.nav
                className="relative bg-white dark:bg-black backdrop-blur-lg rounded-2xl"
                role="dialog"
              >
                <div className="p-4 space-y-4 text-left">
                  {" "}
                  {/* Add text-left for left alignment */}
                  {NAVIGATION_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "block px-4 py-2 rounded-full transition-colors text-left", // Ensure left-alignment
                        pathname === link.href ||
                          (pathname.startsWith("/blog/") &&
                            link.href === "/blog") ||
                          (pathname.startsWith("/photos") &&
                            link.href === "/photos")
                          ? "text-white bg-black/80 dark:bg-white/10 dark:text-white"
                          : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                      )}
                      onClick={() => { handleNavClick(); setIsMenuOpen(false); }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2" role="navigation">
        {NAVIGATION_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={cn(
              "px-3 py-1 rounded-full transition-colors relative font-semibold",
              pathname === link.href ||
                (pathname.startsWith("/blog/") && link.href === "/blog") ||
                (pathname.startsWith("/photos") && link.href === "/photos")
                ? "text-white dark:text-white"
                : "hover:text-gray-900 dark:hover:text-white"
            )}
            onClick={handleNavClick}
            aria-current={
              pathname === link.href ||
              (pathname.startsWith("/blog/") && link.href === "/blog") ||
              (pathname.startsWith("/photos") && link.href === "/photos")
                ? "page"
                : undefined
            }
          >
            {link.label === "blog" && currentBlogPost ? (
              <>
                <span className="">blog/</span>
                <span className="">{currentBlogPost}</span>
              </>
            ) : (
              link.label
            )}
            {(pathname === link.href ||
              (pathname.startsWith("/blog/") && link.href === "/blog") ||
              (pathname.startsWith("/photos") && link.href === "/photos")) && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-black/90 dark:bg-white mix-blend-difference rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                aria-hidden="true"
              />
            )}
          </Link>
        ))}
        <button
          className="p-1 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-white/5"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          type="button"
        >
          {mounted &&
            (theme === "dark" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            ))}
        </button>
      </nav>
    </header>
  );
}
