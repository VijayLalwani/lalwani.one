'use client';

import React from "react";
import Image from "next/image";

interface Song {
  title: string;
  artist: string;
  link: string;
  imageUrl: string;
  background: string;
}

export const TopSongs = React.memo(function TopSongs() {
  const songs = React.useMemo<Song[]>(() => [
    {
      title: "Big Dawgs",
      artist: "Hanumankind, Kalmi",
      link: "https://open.spotify.com/album/6Yw4204wbgmpsGTzjXBhYD",
      imageUrl: "/images/big-dawgs.jpg",
      background:
        "radial-gradient(circle at 0% 50%, rgba(92,51,31, 0.12) 33%, rgba(222,182,164, 0.12) 66%)",
    },
    {
      title: "Mary Jane",
      artist: "K.A.A.N",
      link: "https://open.spotify.com/track/2ExqahkLFfOnLKUebdewRq".replace(/^http:/, 'https:'),
      imageUrl: "/images/mary-jane.jpg",
      background:
        "radial-gradient(circle at 0% 50%, rgba(48,37,40,0.12) 33%, rgba(112,60,65, 0.12) 66%)",
    },
    {
      title: "One Love",
      artist: "Blue",
      link: "https://open.spotify.com/album/7hleBoZbfZyL2umi4JzxCL",
      imageUrl: "/images/BlueOneLove.jpg",
      background:
        "radial-gradient(circle at 0% 50%, rgba(6,6,6, 0.12) 33%, rgba(185,145,96, 0.12) 66%)",
    },
    {
      title: "Boyz-N-The-Hood",
      artist: "Eazy-E",
      link: "https://open.spotify.com/track/5RGXoZt1qxmAErdhbyKJKq",
      imageUrl: "/images/boyz-n-the-hood.jpg",
      background:
        "radial-gradient(circle at 0% 50%, rgba(215,184,180, 0.12) 33%, rgba(241,83,53, 0.12) 66%)",
    },
    {
      title: "La kiffance",
      artist: "Naps",
      link: "https://open.spotify.com/track/4CWcaGtaOyAqBDKIeZMUe0?si=d24b9f208b964294",
      imageUrl: "/images/la-kiffance.jpg",
      background:
        "radial-gradient(circle at 0% 50%, rgba(227,226,211, 0.12) 33%, rgba(127,153,164, 0.12) 66%)",
    },
    {
      title: "Cheques",
      artist: "Shubh",
      link: "https://open.spotify.com/track/1ZHYJ2Wwgxes4m8Ba88PeK",
      imageUrl: "/images/cheques.webp",
      background:
        "radial-gradient(circle at 0% 50%,  rgba(42, 85, 84, 0.12) 33%, rgba(210, 255, 5, 0.12) 66%)",
    },
  ], []);

  return (
    <section className="flex flex-col gap-1">
      <h3 className="text-lg font-semibold text-mauve-50 dark:text-evuam-50">
        <span className="font-departure text-sm">♫</span> top songs
      </h3>
      <p className="text-lg leading-snug text-mauve-50/90 dark:text-evuam-50/90">
        I only listen to absolute bangers. Don&apos;t @ me.
      </p>
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 md:justify-center max-md:max-w-[80vw] max-md:mx-auto">
        {songs.map((song) => (
          <div 
            key={song.link}
            className="flex cursor-pointer flex-row items-center w-full"
          >
            <a
              className="cursor-pointer rounded-lg border border-black/5 dark:border-white/5 p-4 w-full h-full transition-all duration-300 hover:scale-[1.02] hover:brightness-75 dark:hover:brightness-150"
              target="_blank"
              rel="noopener noreferrer nofollow"
              href={song.link}
              aria-label={`Open ${song.title} by ${song.artist} on Spotify`}
              style={{
                background: song.background,
              }}
            >
              <div className="flex flex-row items-center h-full">
                <div className="relative h-10">
                  <Image
                    alt={`${song.title} album art`}
                    width={40}
                    height={40}
                    className="min-h-10 min-w-10 rounded-[7px]"
                    src={song.imageUrl}
                    loading="lazy"
                    quality={75}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/fallback.jpg';
                    }}
                  />
                </div>
                <div className="ml-3">
                  <h5 className="text-[13.28px] font-bold leading-tight text-evuam-1100 dark:text-mauve-1100">
                    {song.title}
                  </h5>
                  <p className="text-[12.8px] leading-tight text-evuam-1100/80 dark:text-mauve-1100/80">
                    by {song.artist}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
});
