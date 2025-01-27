"use client";
import { useState, useCallback, memo } from "react";
import Image from "next/image"; // For optimized image loading

// Move media data outside component to prevent recreating on each render
const MEDIA_ITEMS = [
  {
    type: "image",
    src: "/images/placeholder.svg",
    alt: "Modern building architecture",
  },
  {
    type: "video",
    src: "/videos/placeholder.mp4",
    alt: "Sunset timelapse",
  },
  {
    type: "image",
    src: "/images/placeholder.svg",
    alt: "Golden Gate Bridge",
  },
  {
    type: "video",
    src: "/videos/placeholder.mp4",
    alt: "Ocean waves",
  },
  {
    type: "image",
    src: "/images/placeholder.svg",
    alt: "Coastal view",
  },
  {
    type: "image",
    src: "/images/placeholder.svg",
    alt: "Ocean sunset",
  },
  {
    type: "image",
    src: "/images/placeholder.svg",
    alt: "Vibrant sunset",
  },
  {
    type: "image",
    src: "/images/placeholder.svg",
    alt: "Orange sunset",
  },
] as const; // Make readonly for security

// Memoized media item component
const MediaItem = memo(({ 
  item, 
  onPlay, 
  onPause 
}: { 
  item: (typeof MEDIA_ITEMS)[number],
  onPlay?: (e: React.MouseEvent<HTMLVideoElement>) => void,
  onPause?: (e: React.MouseEvent<HTMLVideoElement>) => void
}) => {
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        playsInline
        loop
        muted // For security, start muted
        className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-110 [&::-webkit-media-controls-panel]:hidden"
        onMouseEnter={onPlay}
        onMouseLeave={onPause}
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
});
MediaItem.displayName = 'MediaItem';

export function Memories() {
  const [hoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getScaleValue = useCallback(() => {
    if (typeof window === 'undefined') return 2;
    return window.innerWidth >= 640 ? 2.5 : 2;
  }, []);

  // Unified mouse/touch handlers
  const handlePressStart = useCallback((i: number) => {
    setActiveIndex(i); // Set active index without toggle
  }, []);

  const handlePressEnd = useCallback(() => {
    setActiveIndex(null); // Clear active state
  }, []);

  // Memoize video handlers
  const handleVideoPlay = useCallback((e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.play();
  }, []);

  const handleVideoPause = useCallback((e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.pause();
    e.currentTarget.currentTime = 0;
  }, []);

  return (
    <section className="flex flex-col gap-1 relative places-gallery">
      <h3 className="text-lg font-semibold text-mauve-50 dark:text-evuam-50">
        memories
      </h3>
      <p className="text-lg leading-snug text-mauve-50/90 dark:text-evuam-50/90">
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
                className="h-32 w-32 rounded-2xl bg-white shadow-lg transition-all duration-300 ease-out hover:scale-150 hover:-translate-y-2 touch-manipulation"
                onContextMenu={(e) => e.preventDefault()} // Prevent context menu
                onTouchStart={() => handlePressStart(i)}
                onTouchEnd={handlePressEnd}
                onMouseDown={() => handlePressStart(i)}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                style={{
                  transform: `
                    rotate(${(activeIndex === i || hoveredIndex === i) ? 0 : rotationAngle}deg)
                    ${isActive ? 'translateZ(0) scale(1.5)' : ''}
                  `,
                  zIndex: isActive ? 999999 : hoveredIndex === i ? 998 : 'auto',
                  overflow: 'visible',
                  touchAction: 'manipulation',
                  userSelect: 'none',
                  WebkitUserSelect: 'none'
                }}
              >
                <div 
                  className="h-32 w-32 rounded-lg border-[3px] border-white shadow-md transform-gpu overflow-hidden"
                  style={{
                    transform: isActive ? `scale(${scaleValue})` : 'none',
                    transformOrigin: 'center center',
                    willChange: 'transform'
                  }}
                >
                  <MediaItem 
                    item={item}
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
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
