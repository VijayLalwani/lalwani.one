import { HomelabDiff } from "@/components/homelab-diff";

// Prototype: no real rack photo/schematic yet (drop them in /public and pass
// the paths below), and the specs are placeholders - swap in the real ones.
const HOMELAB = {
  description:
    "A full Kubernetes cluster, PKI, GitOps, and single sign-on, running on real hardware.",
  title: "The rack",
  photoSrc: "",
  schematicSrc: "",
  specs: [
    { label: "Nodes", value: "TODO" },
    { label: "CPU", value: "TODO" },
    { label: "Memory", value: "TODO" },
    { label: "Storage", value: "TODO" },
  ],
};

export const Homelab = () => (
  <section id="homelab" className="w-full space-y-8 py-12">
    <div className="flex flex-col items-center justify-center space-y-3 text-center">
      <div className="inline-block rounded-full bg-gray-900 px-3 py-1 text-sm text-white dark:bg-white dark:text-black">
        Homelab
      </div>
      <h2 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-white sm:text-4xl">
        My Infrastructure
      </h2>
      <p className="max-w-xl text-gray-600 dark:text-white/70">{HOMELAB.description}</p>
    </div>

    <div className="mx-auto max-w-[1000px] px-4">
      <HomelabDiff
        title={HOMELAB.title}
        description={HOMELAB.description}
        specs={HOMELAB.specs}
        photoSrc={HOMELAB.photoSrc}
        schematicSrc={HOMELAB.schematicSrc}
      />
    </div>
  </section>
);
