"use client";

import Image from "next/image";
import { useCallback } from "react";

import photosIcon from "@/assets/images/icons/photos.png";
import musicIcon from "@/assets/images/icons/music.png";
import filesIcon from "@/assets/images/icons/files.png";
import documentsIcon from "@/assets/images/icons/documents.png";
import mailIcon from "@/assets/images/icons/mail.png";
import chatIcon from "@/assets/images/icons/chat.png";

const SERVICES = [
  {
    name: "Photos",
    href: "https://photos.lalwani.one",
    description: "Personal Google Photos alternative.",
    icon: photosIcon,
    background: "#895CE30a",
    border: "1px solid #895CE318",
    color: "#895CE3",
    metric: "photos:count videos:count",
  },
  {
    name: "Music",
    href: "https://music.lalwani.one",
    description: "16 bit 44000 Hz FLAC music streaming.",
    icon: musicIcon,
    background: "#0b94fd0a",
    border: "1px solid #0b94fd18",
    color: "#0b94fd",
    metric: "Songs:count",
  },
  {
    name: "Files",
    href: "https://files.lalwani.one",
    description: "Cloud storage with WebDAV and SFTP support.",
    icon: filesIcon,
    background: "#F774440a",
    border: "1px solid #F7744418",
    color: "#F77444",
    metric: "Used:in GB",
  },
  {
    name: "Documents",
    href: "https://docs.lalwani.one",
    description: "Document storage with OCR and AI tagging.",
    icon: documentsIcon,
    background: "#e8ab480a",
    border: "1px solid #e8ab4818",
    color: "#e8ab48",
    metric: "Documents:count",
  },
  {
    name: "Mail",
    href: "https://mail.lalwani.one/SOGo/",
    description: "Email, Calendar and Contacts.",
    icon: mailIcon,
    background: "#E539350a",
    border: "1px solid #E5393518",
    color: "#E53935",
    metric: "Mailboxes:count",
  },
  {
    name: "Chat",
    href: "https://chat.lalwani.one",
    description: "All hosted AI models and API's",
    icon: chatIcon,
    background: "#EC407A0a",
    border: "1px solid #EC407A18",
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
      <h3 className="text-lg font-semibold">
        hosted services
      </h3>
      <div className="-ml-1 grid grid-flow-row gap-2 md:grid-cols-2">
        {SERVICES.map((service) => (
          <a
            key={service.name}
            href={service.href}
            className="relative z-10 mx-auto w-[80vw] cursor-pointer rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-4 transition-shadow hover:shadow-md md:w-full"
            style={{
              backgroundColor: service.background,
              border: service.border,
            }}
            target="_blank"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Gradient Hover Effect */}
            <div
              className="absolute inset-[-0.5px] z-auto rounded-lg transition-opacity duration-300 gradient"
              style={{
                background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), ${service.color}2a, transparent 40%)`,
                opacity: 0,
              }}
            />
            <div className="flex flex-row items-center justify-between pb-1">
              <div className="flex flex-row gap-1.5 items-center">
                <Image
                  src={service.icon}
                  alt={service.name}
                  width={25}
                  height={25}
                  className="z-auto rounded-full shadow-lg"
                />
                <h4 className="z-auto text-lg font-medium">{service.name}</h4>
              </div>
              <p
                className="z-auto font-mono text-xs opacity-60"
                style={{ color: service.color }}
              >
                {service.metric}
              </p>
            </div>
            <p className="z-auto">{service.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
