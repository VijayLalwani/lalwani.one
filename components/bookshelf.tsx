"use client";

import { useState, memo } from "react";
import Image from "next/image";

// Move books data outside component and make it immutable
const BOOKS = Object.freeze([
  {
    title: "Paradox",
    cover: "/images/books/paradox-cover.jpg", // Added leading slash
    color: "rgba(137, 92, 227, 0.6)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(232, 171, 72, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(247, 116, 68, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(156, 39, 176, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(76, 175, 80, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(33, 150, 243, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(255, 152, 0, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(244, 67, 54, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(0, 150, 136, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(121, 85, 72, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(158, 158, 158, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(63, 81, 181, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(233, 30, 99, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(255, 193, 7, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(139, 195, 74, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(96, 125, 139, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(255, 87, 34, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(103, 58, 183, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(0, 188, 212, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(233, 30, 99, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(158, 158, 158, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(255, 152, 0, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(33, 150, 243, 0.5)",
  },
  {
    title: "Placeholder",
    cover: "images/cover.jpg",
    color: "rgba(121, 134, 203, 0.5)",
  },
].map((book) => Object.freeze(book))); // Freeze each book object

// Separate Book component for better performance
const Book = memo(({ 
  book, 
  index, 
  isHovered, 
  onHover 
}: {
  book: typeof BOOKS[0],
  index: number,
  isHovered: boolean,
  onHover: (index: number | null) => void
}) => {
  const handleMouseEnter = () => onHover(index);
  const handleMouseLeave = () => onHover(null);

  return (
    <div
      className={`flex-none cursor-pointer relative ${
        isHovered ? "z-50" : "z-10"
      }`}
      style={{ width: "25px", height: "200px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full perspective-1000">
        <div
          className={`relative w-full h-full transform-style-3d transition-all duration-500 ease-in-out ${
            isHovered ? "scale-125" : "scale-100"
          }`}
        >
          {/* Spine */}
          <div
            className={`absolute inset-0 rounded-sm shadow-md origin-left transition-transform duration-500 ease-in-out backface-hidden ${
              isHovered ? "rotate-y-90" : "rotate-y-0"
            }`}
            style={{
              width: "25px",
              zIndex: 20,
              backgroundColor: book.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className="text-white text-xs font-medium writing-mode-vertical-rl transform rotate-180 whitespace-nowrap px-1 flex items-center"
            >
              {book.title}
            </span>
          </div>

          {/* Front Cover */}
          <div
            className={`absolute left-0 origin-left transition-transform duration-500 ease-in-out backface-hidden ${
              isHovered
                ? "rotate-y-0 translate-z-20 opacity-100"
                : "rotate-y-90 translate-z-0 opacity-0"
            }`}
            style={{
              width: "140px",
              height: "200px",
              zIndex: isHovered ? 30 : 0,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src={book.cover}
              alt={`Cover of ${book.title}`}
              width={140}
              height={200}
              className="w-full h-full object-cover rounded-sm shadow-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" />
          </div>
        </div>
      </div>
    </div>
  );
});

Book.displayName = 'Book'; // For React DevTools

export const Bookshelf = memo(function Bookshelf() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      <div className="flex flex-wrap gap-x-1 gap-y-4 px-4 -mx-4 py-5 justify-center">
        {BOOKS.map((book, index) => (
          <div key={index} className="mb-4">
            <Book
              book={book}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={setHoveredIndex}
            />
          </div>
        ))}
      </div>
    </section>
  );
});
