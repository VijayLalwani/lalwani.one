"use client";

// React port of broomfieldhomelab.net's HomelabDiff.svelte: drag left/right
// to compare a schematic diagram against a real photo of the rack.
// Prototype-safe: pass empty strings for photoSrc/schematicSrc and it shows
// placeholder panels instead of broken <img> tags, until real images exist.
import { useState, useRef, type MouseEvent as ReactMouseEvent, type TouchEvent as ReactTouchEvent } from "react";

interface Spec {
  label: string;
  value: string;
}

interface HomelabDiffProps {
  title: string;
  description: string;
  specs: Spec[];
  photoSrc?: string;
  schematicSrc?: string;
}

function ImagePane({ src, label }: { src?: string; label: string }) {
  if (!src) {
    return (
      <div className="flex h-full w-full items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400 dark:border-white/15 dark:bg-white/5 dark:text-white/30">
        {label} coming soon
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={label} className="h-full w-full object-cover" draggable={false} />;
}

export function HomelabDiff({ title, description, specs, photoSrc, schematicSrc }: HomelabDiffProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);

  const moveTo = (clientX: number, container: HTMLElement) => {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    setSliderPosition(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  };

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    moveTo(e.clientX, e.currentTarget);
  };

  const handleTouchMove = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    moveTo(e.touches[0].clientX, e.currentTarget);
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
      <div className="flex-[2] space-y-4 lg:order-1 lg:min-w-0">
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-white/70">{description}</p>
        </div>

        {specs.length > 0 && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-white/10 dark:bg-white/5"
              >
                <span className="text-xs font-medium text-gray-500 dark:text-white/50">{spec.label}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{spec.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="lg:order-2 lg:w-[300px] lg:flex-shrink-0">
        <div
          className="relative aspect-[3695/6354] w-full select-none overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-white/5"
          onMouseDown={() => (isDragging.current = true)}
          onMouseUp={() => (isDragging.current = false)}
          onMouseLeave={() => (isDragging.current = false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => (isDragging.current = true)}
          onTouchEnd={() => (isDragging.current = false)}
          onTouchMove={handleTouchMove}
        >
          <div className="absolute inset-0">
            <ImagePane src={photoSrc} label="Photo" />
            <div className="absolute bottom-4 right-4 rounded bg-white/80 px-3 py-1.5 text-xs font-medium backdrop-blur-sm dark:bg-black/80">
              Photo
            </div>
          </div>

          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
            <ImagePane src={schematicSrc} label="Schematic" />
            <div className="absolute bottom-4 left-4 rounded bg-white/80 px-3 py-1.5 text-xs font-medium backdrop-blur-sm dark:bg-black/80">
              Schematic
            </div>
          </div>

          <div
            role="slider"
            aria-label="Image comparison slider"
            aria-valuenow={sliderPosition}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            className="absolute inset-y-0 w-1 cursor-ew-resize bg-white shadow-lg"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={() => (isDragging.current = true)}
            onTouchStart={() => (isDragging.current = true)}
          >
            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
              <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
