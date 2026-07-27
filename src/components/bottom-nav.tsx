"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { House, Server, Notebook, Image as ImageIcon, Github, Linkedin, Sun, Moon } from "lucide-react";
import { Dock, DockIcon } from "@/components/dock";
import { cn } from "@/lib/utils";

// Same shape as broomfieldhomelab.net's dock nav (Max Broomfield's site),
// mapped to what actually exists here instead of forcing his pages
// (projects/#contact) that this site doesn't have.
const NAV_ITEMS = [
  { href: "/", label: "Home", icon: House },
  { href: "#homelab", label: "Homelab", icon: Server },
  { href: "/blog", label: "Blog", icon: Notebook },
  { href: "/photos", label: "Photos", icon: ImageIcon },
] as const;

// TODO: replace with the real profile URL.
const SOCIAL_LINKS = [
  { href: "https://github.com/VijayLalwani", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/TODO", label: "LinkedIn", icon: Linkedin },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith("#")) return;

    if (pathname !== "/") {
      // Let the browser navigate to "/#homelab" normally.
      return;
    }

    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 mx-auto flex h-full max-h-14 origin-bottom">
      <div className="fixed inset-x-0 bottom-0 h-16 w-full bg-white to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-black" />

      <Dock className="pointer-events-auto relative z-50 gap-0.5 bg-white/80 px-1 shadow-[0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-black/80 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] sm:gap-1 md:gap-2">
        {NAV_ITEMS.map((item) => (
          <DockIcon key={item.href} className="hover:bg-gray-100 dark:hover:bg-white/10">
            <a
              href={item.href === "#homelab" && pathname !== "/" ? `/${item.href}` : item.href}
              title={item.label}
              onClick={(e) => handleNavClick(e, item.href)}
              className="flex h-full w-full items-center justify-center rounded-full"
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
              className="flex h-full w-full items-center justify-center rounded-full"
            >
              <social.icon className="size-[18px]" strokeWidth={1.5} />
            </a>
          </DockIcon>
        ))}

        <div className="mx-1 h-full w-px shrink-0 bg-gray-200 dark:bg-white/10" />

        <DockIcon className="hover:bg-gray-100 dark:hover:bg-white/10">
          <button
            type="button"
            title="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn("flex h-full w-full items-center justify-center rounded-full")}
          >
            {mounted && (theme === "dark" ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />)}
          </button>
        </DockIcon>
      </Dock>
    </div>
  );
}
