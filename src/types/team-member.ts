import type { FunctionComponent } from "@qwik.dev/core";

export type TeamMemberType = {
  id: number;
  name: string;
  role: string;
  image: FunctionComponent;
};
