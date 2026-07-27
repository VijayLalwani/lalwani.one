import { HomelabDiff } from "@/components/homelab-diff";

// Prototype: no real rack photo/schematic yet (drop them in /public and pass
// the paths below), and the specs are placeholders - swap in the real ones.
const HOMELAB = {
  intro:
    "A full Kubernetes cluster, PKI, GitOps, and single sign-on, running on real hardware.",
  title: "The rack",
  cardDescription: "Drag to compare the photo against the schematic.",
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
  <section id="homelab" className="flex flex-col gap-1">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">homelab</h3>
    <p className="text-lg leading-snug text-gray-800 dark:text-white/90">{HOMELAB.intro}</p>

    <div className="mt-3">
      <HomelabDiff
        title={HOMELAB.title}
        description={HOMELAB.cardDescription}
        specs={HOMELAB.specs}
        photoSrc={HOMELAB.photoSrc}
        schematicSrc={HOMELAB.schematicSrc}
      />
    </div>
  </section>
);
