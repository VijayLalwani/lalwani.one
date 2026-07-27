"use client";

// Magic UI's Dock/DockIcon (magicuidesign/magicui), adapted to this repo's
// existing framer-motion + cn() instead of adding class-variance-authority
// for what's otherwise one static class string.
import React, { useRef } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

export interface DockProps {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  children: React.ReactNode;
}

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () =>
      React.Children.map(children, (child) => {
        if (React.isValidElement<DockIconProps>(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            mouseX,
            size: iconSize,
            magnification: iconMagnification,
            distance: iconDistance,
          });
        }
        return child;
      });

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md",
          className
        )}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);
Dock.displayName = "Dock";

export interface DockIconProps
  extends Omit<MotionProps & React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
}

export function DockIcon({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const padding = Math.max(6, size * 0.2);
  const defaultMouseX = useMotionValue(Infinity);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale (a transform), not literal width/height: those are layout
  // properties, so animating them - driven continuously by mouse position -
  // reflows every sibling icon on each frame, meaning the icon under your
  // cursor can shift a few pixels as a NEIGHBOR grows/shrinks at the same
  // time, right as you click it. `scale` is compositor-only: the box's
  // actual layout footprint (what clicks hit-test against) never moves,
  // only its paint size does - fixes clicks needing a second try (reported
  // on desktop/mouse, never touch - consistent with this being a mouse-
  // tracking reflow issue rather than anything device-specific).
  const scaleTransform = useTransform(distanceCalc, [-distance, 0, distance], [1, magnification / size, 1]);
  const scale = useSpring(scaleTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size, padding, scale }}
      className={cn("flex aspect-square cursor-pointer items-center justify-center rounded-full", className)}
      {...props}
    >
      <div>{children}</div>
    </motion.div>
  );
}
