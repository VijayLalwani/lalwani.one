
import { About } from "@/components/about"; 
import { LazyLoad } from "@/components/lazy-load";
import dynamic from "next/dynamic";

const HostedServices = dynamic(() =>
  import("@/components/hosted-services").then((mod) => mod.HostedServices)
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
const Stats = dynamic(() =>
  import("@/components/stats").then((mod) => mod.Stats)
);

export default function Home() {
  return (

    <div className="grid grid-flow-row gap-10 text-pretty">
      <About />
      
      <LazyLoad placeholderHeight="350px">
        <HostedServices />
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

      <LazyLoad placeholderHeight="200px">
        <Stats />
      </LazyLoad>
    </div>
  );
}