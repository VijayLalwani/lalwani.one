import { HostedServices } from "@/components/hosted-services";
import { Memories } from "@/components/memories";
import { TopSongs } from "@/components/top-songs";
import { Bookshelf } from "@/components/bookshelf";
import { Stats } from "@/components/stats";
import { About } from "@/components/about";

export default function Home() {
  return (
    <div className="grid grid-flow-row gap-10 text-pretty">
      <About />
      <HostedServices />
      <Memories />
      <TopSongs />
      <Bookshelf />
      <Stats />
    </div>
  );
}
