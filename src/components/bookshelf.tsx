"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";

import paradoxCover from "@/assets/images/books/paradox.jpg";
import grandDesignCover from "@/assets/images/books/grand-design.jpg";
import elegantUniverseCover from "@/assets/images/books/elegant-universe.jpg";
import particleCover from "@/assets/images/books/particle-at-the-end-of-the-universe.jpg";
import infernoCover from "@/assets/images/books/inferno.jpg";
import schrodingersCatCover from "@/assets/images/books/schrodingers-cat.jpg";
import badScienceCover from "@/assets/images/books/bad-science.jpg";
import timeMachineCover from "@/assets/images/books/build-time-machine.jpg";

interface Book {
  id: number;
  title: string;
  author: string;
  spineColor: string;
  textColor: string;
  coverUrl: StaticImageData;
}

const books: Book[] = [
  {
    id: 1,
    title: "Paradox",
    author: "Richard Rhodes",
    spineColor: "rgb(33,64,84)",
    textColor: "rgb(240,199,93)",
    coverUrl: paradoxCover,
  },
  {
    id: 2,
    title: "The Grand Design",
    author: "Stephen Hawking",
    spineColor: "rgb(14,24,30)",
    textColor: "rgb(242,242,242)",
    coverUrl: grandDesignCover,
  },
  {
    id: 3,
    title: "The Elegant Universe",
    author: "Brian Greene",
    spineColor: "rgb(46,80,144)",
    textColor: "rgb(254,255,255)",
    coverUrl: elegantUniverseCover,
  },
  {
    id: 4,
    title: "Particle - End of the Universe",
    author: "Sean Carroll",
    spineColor: "rgb(0,0,0)",
    textColor: "rgb(200,200,200)",
    coverUrl: particleCover,
  },
  {
    id: 5,
    title: "Inferno",
    author: "Dan Brown",
    spineColor: "rgb(108,120,96)",
    textColor: "rgb(250,250,250)",
    coverUrl: infernoCover,
  },
  {
    id: 7,
    title: "In Search of Schrödinger's Cat",
    author: "John Gribbin",
    spineColor: "rgb(255,255,255)",
    textColor: "rgb(30,30,30)",
    coverUrl: schrodingersCatCover,
  },
  {
    id: 8,
    title: "Bad Science",
    author: "Ben Goldacre",
    spineColor: "rgb(233,6,36)",
    textColor: "rgb(230,235,238)",
    coverUrl: badScienceCover,
  },
  {
    id: 9,
    title: "How to Build a Time Machine",
    author: "Brian Clegg",
    spineColor: "rgb(32,69,138)",
    textColor: "rgb(199,222,241)",
    coverUrl: timeMachineCover,
  },
];

export function Bookshelf() {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">
          bookshelf
        </h3>
        <p className="text-lg leading-snug">
          The books that once had me hooked.
        </p>
      </div>
      <div className="not-prose">
        <div className="max-w-4xl mx-auto overflow-visible">
          <div role="list" className="flex justify-center w-full">
            <div className="flex flex-wrap justify-center gap-2">
              {books.map((book, index) => (
                <motion.button
                  key={book.id}
                  role="listitem"
                  className={`
                    flex flex-row items-center outline-none transition-all duration-300 ease-in-out 
                    focus-visible:-translate-y-2 ${index === 0 ? "" : "-ml-12 sm:-ml-16 md:-ml-24 lg:-ml-30"}
                  `}
                  style={{
                    perspective: "1000px",
                    WebkitPerspective: "1000px",
                    zIndex: hoveredBook === book.id ? 40 : index + 1,
                  }}
                  onMouseEnter={() => setHoveredBook(book.id)}
                  onMouseLeave={() => setHoveredBook(null)}
                  onTouchStart={(e) => {
                    e.preventDefault(); // Prevent long-press context menu
                    setHoveredBook(book.id);
                  }}
                  onTouchEnd={() => setHoveredBook(null)}
                  onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
                  whileHover={{
                    translateZ: 20,
                    translateY: -10,
                    transition: { duration: 0.2, ease: "easeInOut" },
                  }}
                  animate={
                    hoveredBook === book.id
                      ? { translateZ: 20, translateY: -10 }
                      : {}
                  }
                >
{/* Spine */}
<div
  className="z-50 h-32 sm:h-40 md:h-48 lg:h-56 w-[20px] sm:w-[24px] md:w-[28px] lg:w-[32px] shrink-0 origin-right py-2 brightness-[0.95] relative"
  style={{
    backgroundColor: book.spineColor,
    color: book.textColor,
    transformStyle: "preserve-3d",
    transform: "rotateY(-60deg) translateZ(0px)",
  }}
>
  {/* Shadow and reflection effects on the spine */}
  <span
    aria-hidden="true"
    className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10"
  />
  <h2
    className="text-xs sm:text-sm md:text-md m-auto font-bold"
    style={{ writingMode: "vertical-lr" }}
  >
    {book.title}
  </h2>
</div>

{/* Cover */}
<div
  className="relative z-10 h-32 sm:h-40 md:h-48 lg:h-56 shrink-0 origin-left overflow-hidden border-gray-900 brightness-[0.95]"
  style={{
    transformStyle: "preserve-3d",
    transform: "rotateY(10deg) translateZ(0px)",
  }}
>
  {/* Gradient highlight to create realistic transition between spine and cover */}
  <span
    aria-hidden="true"
    className="absolute left-0 top-0 z-50 h-full w-full"
    style={{
      background:
        "linear-gradient(to right, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.5) 3px, rgba(255, 255, 255, 0.25) 4px, rgba(255, 255, 255, 0.25) 6px, transparent 7px, transparent 9px, rgba(255, 255, 255, 0.25) 9px, transparent 12px)",
    }}
  />
  
  <Image
    alt={book.title}
    src={book.coverUrl}
    // width={384}
    // height={576}
    className="h-full w-[97px] sm:w-[116px] md:w-[135px] lg:w-[154px] bg-cover"
    placeholder="blur"
    sizes="(max-width: 640px) 97px, (max-width: 768px) 116px, (max-width: 1024px) 135px, 154px"
    // priority={book.id === 1}
  />
</div>

                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
