
import { About } from "@/components/about"; 
import { LazyLoad } from "@/components/lazy-load";
import dynamic from "next/dynamic";

const Projects = dynamic(() =>
  import("@/components/projects").then((mod) => mod.Projects)
);
const Memories = dynamic(() =>
  import("@/components/memories").then((mod) => mod.Memories)
);
const TopSongs = dynamic(() =>
  import("@/components/top-songs").then((mod) => mod.TopSongs)
);
const Bookshelf = dynamic(() =>
  import("@/components/bookshelf").then((mod) => mod.Bookshelf)
);

export default function Home() {
  return (

    <div className="grid grid-flow-row gap-10 text-pretty">
      <About />
      
      <LazyLoad placeholderHeight="350px">
        <Projects />
      </LazyLoad>

      <LazyLoad placeholderHeight="300px">
        <Memories />
      </LazyLoad>

      <LazyLoad placeholderHeight="400px">
        <TopSongs />
      </LazyLoad>

      <LazyLoad placeholderHeight="300px">
        <Bookshelf />
      </LazyLoad>
    </div>
  );
}