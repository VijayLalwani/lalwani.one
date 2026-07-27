// @types/react (19.2.14) predates React's canary-only <ViewTransition> component,
// so it isn't declared anywhere in the shipped types. Ambient-declare just enough
// of its surface to typecheck; drop this once @types/react catches up.
import type { ComponentType, ReactNode } from "react";

declare module "react" {
  export const ViewTransition: ComponentType<{
    children?: ReactNode;
    name?: string;
    default?: string;
    enter?: string;
    exit?: string;
    update?: string;
    share?: string;
    layout?: string;
  }>;
}
