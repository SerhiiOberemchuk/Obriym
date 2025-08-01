import { TeamMemberType, ImageKey } from "~/types/team-member.type";
import Person1 from "~/assets/images/oberemchuk.png?w=880&h=1192&jsx";
import Person2 from "~/assets/images/person2.png?w=880&h=1192&jsx";
import Person3 from "~/assets/images/person3.png?w=880&h=1192&jsx";
import type { JSX } from "@qwik.dev/core";

export const TEAM_MEMBERS: TeamMemberType[] = [
  {
    id: 1,
    name: "Serhii Oberemchuk",
    role: "Founder & CEO",
    imageKey: "person1",
    description:
      " Serhii is a strategic leader with a clear vision for how design, technology, and business intersect. As the CEO and co-founder of the agency, he brings over a decade of experience in building teams, managing complex projects, and scaling digital products. Before launching the agency. Serhii led digital transformation initiatives across multiple industries, where he identified the need for a more agile, design-driven approach to business growth.",
  },
  {
    id: 2,
    name: "Person 2",
    role: "Designer",
    imageKey: "person2",
    description:
      " Person2 is a strategic leader with a clear vision for how design, technology, and business intersect. As the CEO and co-founder of the agency, he brings over a decade of experience in building teams, managing complex projects, and scaling digital products. Before launching the agency. Serhii led digital transformation initiatives across multiple industries, where he identified the need for a more agile, design-driven approach to business growth.",
  },
  {
    id: 3,
    name: "Person 3",
    role: "Product Manager",
    imageKey: "person3",
    description:
      " Person3 is a strategic leader with a clear vision for how design, technology, and business intersect. As the CEO and co-founder of the agency, he brings over a decade of experience in building teams, managing complex projects, and scaling digital products. Before launching the agency. Serhii led digital transformation initiatives across multiple industries, where he identified the need for a more agile, design-driven approach to business growth.",
  },
];

export const imageMap: Record<ImageKey, () => JSX.Element> = {
  person1: () => (
    <Person1
      class="slide-image"
      draggable={false}
      role="img"
      aria-label="Photo of Serhii Oberemchuk"
    />
  ),
  person2: () => (
    <Person2 class="slide-image" draggable={false} role="img" aria-label="Photo of Person 2" />
  ),
  person3: () => (
    <Person3 class="slide-image" draggable={false} role="img" aria-label="Photo of Person 3" />
  ),
};
