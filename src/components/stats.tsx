"use client";

import React, { Fragment } from "react";

export function Stats() {
  const statsConfig = [
    {
      label: "crypto profits",
      value: "2 pizzas",
      hoverContent: ["1 large", "1 medium", "Thanks, BTC!"],
      color: "text-blue-500",
    },
    {
      label: "trading profits",
      value: "pepperoni",
      hoverContent: ["To go with my pizza obviously"],
      color: "text-blue-500",
    },
    {
      label: "typing speed",
      value: "150.38 wpm",
      hoverContent: ["Outran autocorrect", "Keyboard crying"],
      color: "text-green-500",
    },
    {
      label: "keyboard",
      value: "EPOMAKER Galaxy80",
      color: "text-purple-500",
    },
    {
      label: "mouse",
      value: "Logitech G305 ",
      color: "text-purple-500",
    },
    {
      label: "wishlist",
      value: "stuff",
      hoverContent: ["Mustang Shelby GT 500", "Jensen Huangs Leather Jacket"],
      color: "text-red-500",
    },
  ];

  return (
    <div
      className={`flex select-none flex-col gap-1 font-spmono`}
    >
      <h3 className="text-sm font-semibold">
        ░ STATS
      </h3>

      <div className="min-w-0 md:min-w-96">
        {statsConfig.map((stat) => (
          <StatRow key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}

function StatRow({
  label,
  value,
  hoverContent,
  color,
}: {
  label: string;
  value: string;
  hoverContent?: string[];
  color: string;
}) {
  const [isActive, setIsActive] = React.useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleTouchOutside = (e: TouchEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener("touchstart", handleTouchOutside);
    return () => document.removeEventListener("touchstart", handleTouchOutside);
  }, []);

  return (
    <div className="flex justify-between">
      <span className="truncate text-sm md:text-base">{label}</span>
      <div
        ref={divRef}
        className={`group relative flex cursor-pointer flex-col md:flex-row md:items-center ${color}`}
        onTouchStart={(e) => {
          e.stopPropagation();
          setIsActive(true);
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          setIsActive(false);
        }}
      >
        <span className="truncate text-sm md:text-base pr-1">{value}</span>

        {hoverContent && (
          <div className={`${isActive ? "block" : "hidden"} group-hover:block`}>
            <div className="flex flex-col bg-gray-100 shadow-md md:flex-row md:items-center md:bg-transparent md:shadow-none dark:bg-gray-800 md:dark:bg-transparent">
              <span className="hidden md:inline pl-1">¦</span>

              {hoverContent.map((content, index) => (
                <Fragment key={content}>
                  {index > 0 && (
                    <span className="hidden md:inline px-1">¦</span>
                  )}
                  <span className="flex items-center gap-1 whitespace-nowrap px-2 py-1 text-sm md:py-0 md:text-base">
                    <span className="md:hidden">¦ </span>
                    {content}
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
