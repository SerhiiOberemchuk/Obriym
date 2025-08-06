import { inlineTranslate } from "qwik-speak";
import { TeamMemberType, ImageKey } from "~/types/team-member.type";
import Oberemchuk from "~/assets/images/oberemchuk.png?w=880&h=1192&jsx";
import Kovchyk from "~/assets/images/ganna_kovchyk.png?w=880&h=1192&jsx";
import Nazarenko from "~/assets/images/olga_nazarenko.png?w=880&h=1192&jsx";
import Kiriiaka from "~/assets/images/svitlana_kiriiaka.png?w=880&h=1192&jsx";
import type { JSX } from "@qwik.dev/core";

export const TEAM_MEMBERS: TeamMemberType[] = [
  {
    id: 1,
    name: "Serhii Oberemchuk",
    slug: "serhii_oberemchuk",
    role: "Founder & CEO",
    imageKey: "person1",
    description1:
      "Serhii is a strategic leader with a clear vision for how design, technology, and business intersect. As the CEO and co-founder of the agency, he brings over a decade of experience in building teams, managing complex projects, and scaling digital products. ",
    description2:
      "Before launching the agency, Serhii led digital transformation initiatives across multiple industries, where he identified the need for a more agile, design-driven approach to business growth.",
    linkedin: "https://www.linkedin.com/in/serhii-oberemchuk/",
  },
  {
    id: 2,
    name: "Ganna Kovchyk",
    slug: "ganna_kovchyk",
    role: "Full stack Developer",
    imageKey: "person2",
    description1:
      "Ganna is a Full Stack Developer who works across both front-end and back-end, focusing on functionality, performance, and reliability. She is not afraid to implement unconventional or challenging solutions when the project calls for it. Always polishing her work and aiming for tangible results, Ganna brings a thoughtful, detail-oriented mindset to every task.",
    description2:
      "Outside of work, she enjoys surfing, spending time in nature, and values freedom — in code, in life, and in thinking.",
    linkedin: "https://www.linkedin.com/in/ganna-kovchyk/",
  },
  {
    id: 3,
    name: "Olga Nazarenko",
    slug: "olga_nazarenko",
    role: "UX UI Designer",
    imageKey: "person3",
    description1:
      "Olga is a UX UI designer who values structure and system thinking, always focusing on creating products that work seamlessly and solve real user needs. She’s open to modern design trends and innovative solutions but believes they should be balanced with thoughtful, purposeful design, not just trendy visuals.",
    description2:
      "Outside of work, she enjoys exploring new ideas and staying curious about how design and technology can come together to improve everyday life.",
    linkedin: "https://www.linkedin.com/in/olya7715/",
  },
  {
    id: 4,
    name: "Svitlana Kiriiaka",
    slug: "svitlana_kiriiaka",
    role: "UX UI Designer",
    imageKey: "person4",
    description1:
      "Svitlana is a UX UI designer who values structure and system thinking, always focusing on creating products that work seamlessly and solve real user needs. She’s open to modern design trends and innovative solutions but believes they should be balanced with thoughtful, purposeful design, not just trendy visuals.",
    description2:
      "Outside of work, she enjoys exploring new ideas and staying curious about how design and technology can come together to improve everyday life.",
    linkedin: "https://www.linkedin.com/in/svitlana-kiriyaka/",
  },
];

export const imageMap: Record<ImageKey, () => JSX.Element> = {
  person1: () => {
    const t = inlineTranslate();
    return (
      <Oberemchuk
        class="slide-image"
        draggable={false}
        role="img"
        aria-label={t("team.member.serhii_oberemchuk.image_alt@@Photo of {{name}}", {
          name: t("team.member.serhii_oberemchuk.name@@Serhii Oberemchuk"),
        })}
      />
    );
  },
  person2: () => {
    const t = inlineTranslate();
    return (
      <Kovchyk
        class="slide-image"
        draggable={false}
        role="img"
        aria-label={t("team.member.ganna_kovchyk.image_alt@@Photo of {{name}}", {
          name: t("team.member.ganna_kovchyk.name@@Ganna Kovchyk"),
        })}
      />
    );
  },
  person3: () => {
    const t = inlineTranslate();
    return (
      <Nazarenko
        class="slide-image"
        draggable={false}
        role="img"
        aria-label={t("team.member.olga_nazarenko.image_alt@@Photo of {{name}}", {
          name: t("team.member.olga_nazarenko.name@@Olga Nazarenko"),
        })}
      />
    );
  },
  person4: () => {
    const t = inlineTranslate();
    return (
      <Kiriiaka
        class="slide-image"
        draggable={false}
        role="img"
        aria-label={t("team.member.svitlana_kiriiaka.image_alt@@Photo of {{name}}", {
          name: t("team.member.svitlana_kiriiaka.name@@Svitlana Kiriiaka"),
        })}
      />
    );
  },
};
