"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { House, Notebook, Image as ImageIcon, Mail, Sun, Moon } from "lucide-react";
import { Dock, DockIcon } from "@/components/dock";
import { cn } from "@/lib/utils";

// lucide-react dropped brand/company logos a while back (points to
// simple-icons instead) - inline the two brand marks we need directly,
// same approach broomfieldhomelab.net uses for the same reason.
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <title>LinkedIn</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: House },
  { href: "/blog", label: "Blog", icon: Notebook },
  { href: "/photos", label: "Photos", icon: ImageIcon },
  { href: "/contact", label: "Contact", icon: Mail },
] as const;

const SOCIAL_LINKS = [
  { href: "https://github.com/VijayLalwani", label: "GitHub", icon: GithubIcon },
  { href: "https://www.linkedin.com/in/lalwanivijay/", label: "LinkedIn", icon: LinkedinIcon },
] as const;

export function BottomNav() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 mx-auto flex h-full max-h-14 origin-bottom">
      <div className="fixed inset-x-0 bottom-0 h-16 w-full bg-[var(--tone-bg)] to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]" />

      <Dock className="pointer-events-auto relative z-50 gap-0.5 border border-[var(--card-border)] bg-[var(--card-bg)] px-1 shadow-doing sm:gap-1 md:gap-2">
        {NAV_ITEMS.map((item) => (
          <DockIcon key={item.href} className="hover:bg-gray-100 dark:hover:bg-white/10">
            <a
              href={item.href}
              title={item.label}
              className="flex size-10 items-center justify-center rounded-full"
            >
              <item.icon className="size-[18px]" strokeWidth={1.5} />
            </a>
          </DockIcon>
        ))}

        <div className="mx-1 h-full w-px shrink-0 bg-gray-200 dark:bg-white/10" />

        {SOCIAL_LINKS.map((social) => (
          <DockIcon key={social.href} className="hover:bg-gray-100 dark:hover:bg-white/10">
            <a
              href={social.href}
              title={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-10 items-center justify-center rounded-full"
            >
              <social.icon className="size-[18px]" />
            </a>
          </DockIcon>
        ))}

        <div className="mx-1 h-full w-px shrink-0 bg-gray-200 dark:bg-white/10" />

        <DockIcon className="hover:bg-gray-100 dark:hover:bg-white/10">
          <button
            type="button"
            title="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className={cn("flex size-10 items-center justify-center rounded-full")}
          >
            {mounted && (resolvedTheme === "dark" ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />)}
          </button>
        </DockIcon>
      </Dock>
    </div>
  );
}
