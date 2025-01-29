"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define types for better type safety
interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

// Move static data outside component
const NAVIGATION_LINKS: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/blog", label: "blog" },
  { href: "/photos", label: "photos" },
  {
    href: "/files/resume.pdf",
    label: "resume",
    external: true,
  },
] as const;

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize complex computations
  const currentBlogPost = useMemo(() => {
    // Match blog post path format
    const match = pathname.match(/^\/blog\/([^/]+)/);
    if (match) {
      const slug = match[1];
      const formatted = slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, l => l.toUpperCase());
      console.log('Formatted blog title:', formatted);
      return formatted;
    }
    return null;
  }, [pathname]);

  // Security attributes for external links
  const externalLinkProps = {
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": "Visit LinkedIn profile (opens in new tab)",
  };

  return (
    <header className="mx-auto grid w-full max-w-3xl grid-flow-col gap-4 sm:grid-flow-row md:grid-flow-col md:justify-between">
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col items-start">
          {/* Use Next.js Link for internal navigation */}
          <Link href="/">
            <h1 className="text-lg font-bold tracking-tighter text-mauve-50 dark:text-evuam-50">
              Vijay Lalwani
            </h1>
          </Link>
          <a
            href="https://www.linkedin.com/in/lalwanivijay"
            {...externalLinkProps}
            className="text-md -mt-1 flex flex-row items-center gap-x-1 font-bold tracking-tighter text-black hover:underline dark:text-gray-500"
          >
            <svg
              width="12px"
              height="12px"
              viewBox="0 -2 44 44"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Color-"
                  transform="translate(-702.000000, -265.000000)"
                  fill="#007EBB"
                >
                  <path
                    d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z"
                    id="LinkedIn"
                  ></path>
                </g>
              </g>
            </svg>
             lalwanivijay
          </a>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="flex sm:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/5"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
        type="button"
      >
        <motion.div
          className="w-6 h-6 relative"
          animate={isMenuOpen ? "open" : "closed"}
        >
          <motion.span
            className="absolute h-[2px] w-full bg-current rounded-full"
            variants={{
              open: { rotate: 45, y: 7 },
              closed: { rotate: 0, y: -2 }
            }}
          />
          <motion.span
            className="absolute h-[2px] w-full bg-current rounded-full"
            variants={{
              open: { rotate: -45, y: 7 },
              closed: { rotate: 0, y: 2 }
            }}
          />
        </motion.div>
      </button>

      {/* Desktop Navigation (updated to hide on mobile) */}
      <nav className="hidden sm:flex items-center gap-2" role="navigation">
        {NAVIGATION_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={cn(
              "px-3 py-1 rounded-full transition-colors relative font-semibold",
              (pathname === link.href || 
               (pathname.startsWith("/blog/") && link.href === "/blog") ||
               (pathname.startsWith("/photos") && link.href === "/photos"))
                ? "text-white dark:text-white"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            )}
            aria-current={(pathname === link.href || 
                          (pathname.startsWith("/blog/") && link.href === "/blog") ||
                          (pathname.startsWith("/photos") && link.href === "/photos")) ? "page" : undefined}
          >
            {link.label === "blog" && currentBlogPost ? (
              <>
                <span className="">blog/</span>
                <span className=" text-gray-400">{currentBlogPost}</span>
              </>
            ) : (
              link.label
            )}
            {(pathname === link.href || 
             (pathname.startsWith("/blog/") && link.href === "/blog") ||
             (pathname.startsWith("/photos") && link.href === "/photos")) && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-black/80 dark:bg-white mix-blend-difference rounded-full"
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
          {mounted && (
            theme === "dark" ? (
              <Moon className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Sun className="w-5 h-5" aria-hidden="true" />
            )
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed sm:hidden inset-0 bg-black/90 dark:bg-white/5 backdrop-blur-lg z-50 p-8 flex flex-col items-center justify-center gap-6"
            role="dialog"
            aria-modal="true"
          >
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "text-2xl px-6 py-3 rounded-full",
                  (pathname === link.href || 
                   (pathname.startsWith("/blog/") && link.href === "/blog") ||
                   (pathname.startsWith("/photos") && link.href === "/photos"))
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              className="mt-8 p-4 rounded-full hover:bg-white/10"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              type="button"
            >
              {mounted && (theme === "dark" ? <Moon size={24} /> : <Sun size={24} />)}
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
