import Person1 from "~/assets/images/oberemchuk.png?w=880&h=1192&jsx";
import Person2 from "~/assets/images/person2.png?w=880&h=1192&jsx";
import Person3 from "~/assets/images/person3.png?w=880&h=1192&jsx";
import { TeamMemberType } from "~/types/team-member";

export const TEAM_MEMBERS: TeamMemberType[] = [
  {
    id: 1,
    name: "Jane Smith",
    role: "Designer",
    image: Person2,
  },
  {
    id: 2,
    name: "Alice Johnson",
    role: "Product Manager",
    image: Person3,
  },
  {
    id: 3,
    name: "Serhii Oberemchuk",
    role: "Founder & CEO",
    image: Person1,
  },
];
