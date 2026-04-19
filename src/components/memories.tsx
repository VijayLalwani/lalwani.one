"use client";
import { useState, useCallback, useEffect, useRef, memo, useSyncExternalStore } from "react";
import Image from "next/image";
import { Volume2, VolumeOff } from "lucide-react";

// Image Imports
import holiImage from "@/assets/images/memories/holi.jpg";
import cornwallImage from "@/assets/images/memories/cornwall.jpg";
import peakDistrictImage from "@/assets/images/memories/peak-district.jpg";

// Poster Imports (You'll need to create these images)
import bungeePoster from "@/assets/images/memories/posters/bungee.jpg";
import drunkPoster from "@/assets/images/memories/posters/drunk.png";
import iceSkatingPoster from "@/assets/images/memories/posters/ice-skating.png";
import paraglidingPoster from "@/assets/images/memories/posters/paragliding.png";

// Move media data outside component to prevent recreating on each render
const MEDIA_ITEMS = [
  {
    type: "image",
    src: holiImage,
    alt: "Holi",
  },
  {
    type: "video",
    src: "/videos/memories/bungee.webm",
    posterSrc: bungeePoster,
    alt: "Bungee jumping",
  },
  {
    type: "video",
    src: "/videos/memories/drunk.mp4",
    posterSrc: drunkPoster,
    alt: "Drunk",
  },
  {
    type: "video",
    src: "/videos/memories/ice-skating.webm",
    posterSrc: iceSkatingPoster,
    alt: "Ice skating",
  },
  {
    type: "video",
    src: "/videos/memories/paragliding.webm",
    posterSrc: paraglidingPoster,
    alt: "Paragliding",
  },
  {
    type: "image",
    src: cornwallImage,
    alt: "Cornwall",
  },
  {
    type: "image",
    src: peakDistrictImage,
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
    const isDesktop = useSyncExternalStore(
      () => () => {},
      () => window.matchMedia("(pointer: fine)").matches,
      () => false
    );

    if (item.type === "video") {
      return (
        <video
          src={item.src}
          poster={item.posterSrc.src}
          preload="none"
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
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-110"
        placeholder="blur"
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
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const anchorRef = useRef<{ x: number; y: number } | null>(null);
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const MAX_DRIFT = 40; // max pixels the image can drift from anchor

  const getScaleValue = useCallback(() => {
    if (typeof window === "undefined") return 2;
    return window.innerWidth >= 640 ? 2.5 : 2;
  }, []);

  // Unified mouse/touch handlers
  const handlePressStart = useCallback((i: number, clientX: number, clientY: number, container: HTMLElement) => {
    anchorRef.current = { x: clientX, y: clientY };
    setOffset({ x: 0, y: 0 });
    setActiveIndex(i);
    document.documentElement.style.overflow = "hidden";
    // If this item has a video, play it
    const video = container.querySelector("video");
    if (video) {
      activeVideoRef.current = video;
      video.play();
    }
  }, []);

  const handlePressEnd = useCallback(() => {
    // Pause and reset the active video
    if (activeVideoRef.current) {
      activeVideoRef.current.pause();
      activeVideoRef.current.currentTime = 0;
      activeVideoRef.current = null;
    }
    setActiveIndex(null);
    setOffset({ x: 0, y: 0 });
    anchorRef.current = null;
    document.documentElement.style.overflow = "";
  }, []);

  // Global mousemove/mouseup/touchmove/touchend so release works even outside the element
  useEffect(() => {
    if (activeIndex === null) return;

    const handleMove = (clientX: number, clientY: number) => {
      if (!anchorRef.current) return;
      const dx = clientX - anchorRef.current.x;
      const dy = clientY - anchorRef.current.y;
      // Elastic: the further you go, the harder it pulls back
      const clamp = (v: number) => (MAX_DRIFT * Math.tanh(v / MAX_DRIFT));
      setOffset({ x: clamp(dx), y: clamp(dy) });
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onEnd = () => handlePressEnd();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    window.addEventListener("touchcancel", onEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("touchcancel", onEnd);
    };
  }, [activeIndex, handlePressEnd]);

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
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeOff className="w-5 h-5" />
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
                onTouchStart={(e) => {
                  const t = e.touches[0];
                  if (t) handlePressStart(i, t.clientX, t.clientY, e.currentTarget);
                }}
                onMouseDown={(e) => handlePressStart(i, e.clientX, e.clientY, e.currentTarget)}
                style={{
                  transform: `
                    translate(${isActive ? offset.x : 0}px, ${isActive ? offset.y : 0}px)
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
                      ? "transform 0.15s ease-out"
                      : "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  zIndex:
                    activeIndex === i || hoveredIndex === i ? 999999 : "auto",
                  overflow: "visible",
                  touchAction: "manipulation",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                <div
                  className="h-32 w-32 rounded-lg border-[3px] border-white shadow-md transform-gpu overflow-hidden relative"
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
