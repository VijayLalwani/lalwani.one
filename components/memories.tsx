"use client";
import { useState, useCallback, memo, useEffect } from "react";
import Image from "next/image"; // For optimized image loading

// Move media data outside component to prevent recreating on each render
const MEDIA_ITEMS = [
  {
    type: "image",
    src: "/images/memories/holi.jpg",
    alt: "Modern building architecture",
  },
  {
    type: "video",
    src: "/videos/memories/bungee.mp4",
    alt: "Bungee jumping",
  },
  {
    type: "video",
    src: "/videos/memories/drunk.mp4",
    alt: "Drunk",
  },
  {
    type: "video",
    src: "/videos/memories/ice-skating.mp4",
    alt: "Ice skating",
  },
  {
    type: "video",
    src: "/videos/memories/paragliding.mp4",
    alt: "Paragliding",
  },
  {
    type: "image",
    src: "/images/memories/cornwall.jpg",
    alt: "Cornwall",
  },
  {
    type: "image",
    src: "/images/memories/peak-district.jpg",
    alt: "Peak District",
  },
] as const; // Make readonly for security

// Memoized media item component
const MediaItem = memo(
  ({
    item,
    onPlay,
    onPause,
    isSoundEnabled,
  }: {
    item: (typeof MEDIA_ITEMS)[number];
    onPlay?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
    onPause?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
    isSoundEnabled: boolean;
  }) => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
      setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    }, []);

    if (item.type === "video") {
      return (
        <video
          src={item.src}
          playsInline
          loop
          muted={!isDesktop && !isSoundEnabled}
          className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-110 [&::-webkit-media-controls-panel]:hidden"
          onMouseEnter={onPlay}
          onMouseLeave={onPause}
          onTouchStart={onPlay}
          onTouchEnd={onPause}
          onTouchCancel={onPause}
        />
      );
    }

    return (
      <Image
        src={item.src}
        alt={item.alt}
        width={112} // 28 * 4
        height={112}
        className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-110"
        loading="lazy"
        quality={75}
      />
    );
  }
);
MediaItem.displayName = "MediaItem";

export function Memories() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getScaleValue = useCallback(() => {
    if (typeof window === "undefined") return 2;
    return window.innerWidth >= 640 ? 2.5 : 2;
  }, []);

  // Unified mouse/touch handlers
  const handlePressStart = useCallback((i: number) => {
    setActiveIndex(i);
    document.documentElement.style.overflow = "hidden"; // Prevent scroll
  }, []);

  const handlePressEnd = useCallback(() => {
    setActiveIndex(null);
    document.documentElement.style.overflow = ""; // Restore scroll
  }, []);

  // Memoize video handlers
  const handleVideoPlay = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      e.currentTarget.play();
    },
    []
  );

  const handleVideoPause = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      e.currentTarget.pause();
      e.currentTarget.currentTime = 0;
    },
    []
  );

  return (
    <section className="flex flex-col gap-1 relative places-gallery">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          memories
        </h3>
        {/* Mobile-only sound toggle */}
        <button
          onClick={() => setIsSoundEnabled(!isSoundEnabled)}
          className="lg:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label={isSoundEnabled ? "Mute sound" : "Unmute sound"}
        >
          {isSoundEnabled ? (
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-4 0L8 4.65l-3-3L3.27 3.5 5.73 6 3 8.73l1.27 1.27L7 7.27l3 3V3.23z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          )}
        </button>
      </div>
      <p className="text-lg leading-snug">
        Life&apos;s too short for bad lighting… or bad vibes.
      </p>
      <div className="relative">
        <div className="my-4 grid grid-cols-[repeat(auto-fit,minmax(96px,1fr))] grid-rows-auto justify-center gap-1 px-4">
          {MEDIA_ITEMS.map((item, i) => {
            const rotationAngle = i % 2 === 0 ? 4 : -4;
            const isActive = activeIndex === i;
            const scaleValue = isActive ? getScaleValue() : 1;

            return (
              <div
                key={i}
                className="h-32 w-32 rounded-2xl bg-white shadow-lg transition-all duration-300 ease-out hover:scale-125 touch-manipulation"
                onContextMenu={(e) => e.preventDefault()}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTouchStart={() => handlePressStart(i)}
                onTouchEnd={handlePressEnd}
                onTouchCancel={handlePressEnd}
                onMouseDown={() => handlePressStart(i)}
                onMouseUp={handlePressEnd}
                style={{
                  transform: `
                    rotate(${
                      activeIndex === i || hoveredIndex === i
                        ? 0
                        : rotationAngle
                    }deg)
                    scale(${
                      activeIndex === i
                        ? scaleValue
                        : hoveredIndex === i
                        ? 1.25
                        : 1
                    })
                  `,
                  transition:
                    activeIndex === i
                      ? "transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)"
                      : "transform 0.3s ease-out",
                  zIndex:
                    activeIndex === i || hoveredIndex === i ? 999999 : "auto",
                  overflow: "visible",
                  touchAction: "manipulation",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                <div
                  className="h-32 w-32 rounded-lg border-[3px] border-white shadow-md transform-gpu overflow-hidden"
                  style={{
                    transform: "none",
                    transformOrigin: "center center",
                    willChange: "transform",
                  }}
                >
                  <MediaItem
                    item={item}
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    isSoundEnabled={isSoundEnabled}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
