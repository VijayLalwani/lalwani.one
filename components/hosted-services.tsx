"use client";

import Image from "next/image";
import { useCallback } from "react";

const SERVICES = [
  {
    name: "Photos",
    href: "https://photos.lalwani.one",
    description: "Personal Google Photos alternative.",
    icon: "/images/photos.png",
    background: "#895CE311",
    border: "1px solid #895CE322",
    color: "#895CE3",
    metric: "photos:count videos:count",
  },
  {
    name: "Music",
    href: "https://music.lalwani.one",
    description: "16 bit 44000 Hz FLAC music streaming.",
    icon: "/images/music.png",
    background: "#0b94fd11",
    border: "1px solid #0b94fd22",
    color: "#0b94fd",
    metric: "Songs:count",
  },
  {
    name: "Files",
    href: "https://files.lalwani.one",
    description: "Cloud storage with WebDAV and SFTP support.",
    icon: "/images/files.png",
    background: "#F7744411",
    border: "1px solid #F7744422",
    color: "#F77444",
    metric: "Used:in GB",
  },
  {
    name: "Documents",
    href: "https://docs.lalwani.one",
    description: "Document storage with OCR and AI tagging.",
    icon: "/images/documents.png",
    background: "#e8ab4811",
    border: "1px solid #e8ab4822",
    color: "#e8ab48",
    metric: "Documents:count",
  },
  {
    name: "Mail",
    href: "https://mail.lalwani.one",
    description: "Email, Calendar and Contacts.",
    icon: "/images/mail.png",
    background: "#E5393511",
    border: "1px solid #E5393522",
    color: "#E53935",
    metric: "Mailboxes:count",
  },
  {
    name: "Chat",
    href: "https://chat.lalwani.one",
    description: "All hosted AI models and API's",
    icon: "/images/chat.png",
    background: "#EC407A11",
    border: "1px solid #EC407A22",
    color: "#EC407A",
    metric: "AI Models:count",
  },
];

export function HostedServices() {
  const updateGradient = useCallback((element: HTMLAnchorElement, x: number, y: number, opacity: string) => {
    const gradientDiv = element.querySelector<HTMLDivElement>('.gradient');
    if (gradientDiv) {
      gradientDiv.style.setProperty("--x", `${x}px`);
      gradientDiv.style.setProperty("--y", `${y}px`);
      gradientDiv.style.opacity = opacity;
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    updateGradient(e.currentTarget, e.clientX - rect.left, e.clientY - rect.top, "1");
  }, [updateGradient]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    updateGradient(e.currentTarget, 0, 0, "0");
  }, [updateGradient]);

  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-mauve-50 dark:text-evuam-50">
        hosted services
      </h3>
      <div className="-ml-1 grid grid-flow-row gap-2 md:grid-cols-2">
        {SERVICES.map((service) => (
          <a
            key={service.name}
            href={service.href}
            className="relative z-10 mx-auto w-[80vw] cursor-pointer rounded-[10px] border-[1px] border-solid px-[1rem] py-[1rem] transition-shadow hover:shadow-sm md:w-full"
            style={{
              backgroundColor: service.background,
              border: service.border,
            }}
            target="_blank"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="absolute inset-[-0.5px] z-auto rounded-[10px] transition-opacity duration-300 gradient"
              style={{
                background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), ${service.color}2a, transparent 40%)`,
                opacity: 0,
              }}
            />
            <div className="flex flex-row gap-1.5 items-center pb-1">
              <Image
                src={service.icon}
                alt={service.name}
                width={25}
                height={25}
                className="z-auto rounded-[50%] shadow-lg"
              />
              <div className="z-auto flex justify-between">
                <h4 className="text-[20px] font-bold">{service.name}</h4>
              </div>
            </div>
            <p className="z-auto">{service.description}</p>
            <p
              className="mt-2 font-mono text-sm"
              style={{
                '--color-light': `${service.color}ff`,
                '--color-dark': `${service.color}55`,
                color: 'var(--color-light)',
              } as React.CSSProperties}
            >
              {service.metric}
            </p>
          </a>
        ))}
      </div>
    </section>
  );  
}
