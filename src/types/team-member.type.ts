export type TeamMemberType = {
  id: number;
  name: string;
  role: string;
  imageKey: "person1" | "person2" | "person3";
  description: string;
  // image: FunctionComponent<{ class?: string; draggable?: boolean }>;
};
export type ImageKey = "person1" | "person2" | "person3";
