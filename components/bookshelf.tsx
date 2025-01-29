"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  spineColor: string;
  textColor: string;
  coverUrl: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Paradox",
    author: "Richard Rhodes",
    spineColor: "rgb(33,64,84)",
    textColor: "rgb(240,199,93)",
    coverUrl: "/images/books/paradox.jpg",
  },
  {
    id: 2,
    title: "The Grand Design",
    author: "Stephen Hawking",
    spineColor: "rgb( 14, 24, 30)",
    textColor: "rgb(242, 242, 242)",
    coverUrl: "/images/books/grand-design.jpg",
  },
  {
    id: 3,
    title: "The Elegant Universe",
    author: "Brian Greene",
    spineColor: "rgb(46,80,144)",
    textColor: "rgb(254,255,255)",
    coverUrl: "/images/books/elegant-universe.jpg",
  },
  {
    id: 4,
    title: "Particle - End of the Universe",
    author: "Sean Carroll",
    spineColor: "rgb(0,0,0)",
    textColor: "rgb(200,200,200)",
    coverUrl: "/images/books/particle-at-the-end-of-the-universe.jpg",
  },
  {
    id: 5,
    title: "Inferno",
    author: "Dan Brown",
    spineColor: "rgb(108,120,96)",
    textColor: "rgb(250,250,250)",
    coverUrl: "/images/books/inferno.jpg",
  },
  {
    id: 7,
    title: "In Search of Schrödinger's Cat",
    author: "John Gribbin",
    spineColor: "rgb(255,255,255)",
    textColor: "rgb(30,30,30)",
    coverUrl: "/images/books/schrodingers-cat.jpg",
  },
  {
    id: 8,
    title: "Bad Science",
    author: "Ben Goldacre",
    spineColor: "rgb(233,6,36)",
    textColor: "rgb(230,235,238)",
    coverUrl: "/images/books/bad-science.jpg",
  },
  {
    id: 9,
    title: "How to Build a Time Machine",
    author: "Brian Clegg",
    spineColor: "rgb(32,69,138)",
    textColor: "rgb(199,222,241)",
    coverUrl: "/images/books/build-time-machine.jpg",
  },
];

export function Bookshelf() {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-mauve-50 dark:text-evuam-50">
          bookshelf
        </h3>
        <p className="text-lg leading-snug text-mauve-50/90 dark:text-evuam-50/90">
          The books that once had me completely hooked.
        </p>
      </div>
      <div className="not-prose">
        <div className="max-w-4xl mx-auto overflow-visible">
          <div role="list" className="flex justify-center w-full">
            <div
              className="flex flex-wrap justify-center"
              style={{
                width: "100%",
                maxWidth: "100%", // Ensures full width usage
                gap: "0.5rem", // Small gap between books
              }}
            >
              {books.map((book, index) => (
                <motion.button
                  key={book.id}
                  role="listitem"
                  className={`
                  flex flex-row items-center outline-none 
                  transition-all duration-300 ease-in-out focus-visible:-translate-y-2
                  ${index === 0 ? "" : "-ml-14 sm:-ml-16 md:-ml-20 lg:-ml-24"}
                `}
                  style={{
                    perspective: "1000px",
                    WebkitPerspective: "1000px",
                    zIndex: hoveredBook === book.id ? 40 : index + 1,
                    maxWidth: "90vw", // Prevents overflow beyond 90% of screen
                    flexShrink: 0, // Prevents weird flex shrinking
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
                    className="z-50 h-32 sm:h-40 md:h-48 lg:h-56 w-[20px] sm:w-[24px] md:w-[28px] lg:w-[32px] shrink-0 origin-right py-2 brightness-[0.95]"
                    style={{
                      backgroundColor: book.spineColor,
                      color: book.textColor,
                      transformStyle: "preserve-3d",
                      transform: "rotateY(-60deg) translateZ(0px)",
                    }}
                  >
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
                    <Image
                      alt={book.title}
                      src={book.coverUrl || "/placeholder.svg"}
                      width={384}
                      height={576}
                      className="h-full w-[88px] sm:w-[105px] md:w-[122px] lg:w-[140px] bg-cover"
                      priority={book.id === 1}
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
