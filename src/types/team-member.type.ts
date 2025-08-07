export type TeamMemberType = {
  id: number;
  name: string;
  role: string;
  imageKey: "person1" | "person2" | "person3" | "person4";
  description1: string;
  description2: string;
  linkedin: string;
  slug: string;
  // image: FunctionComponent<{ class?: string; draggable?: boolean }>;
};
export type ImageKey = "person1" | "person2" | "person3" | "person4";
