import { useTranslations } from "next-intl";
import Image from "next/image";
import type { JSX } from "react";
import { TeamMemberType, ImageKey } from "~/types/team-member.type";
import oberemchuk from "~/assets/images/oberemchuk.png";
import kovchyk from "~/assets/images/ganna_kovchyk.png";
import nazarenko from "~/assets/images/olga_nazarenko.png";
import kiriiaka from "~/assets/images/svitlana_kiriiaka.png";

export const TEAM_MEMBERS: TeamMemberType[] = [
  {
    id: 1,
    name: "Serhii Oberemchuk",
    slug: "serhii_oberemchuk",
    role: "Founder & CEO",
    imageKey: "person1",
    description1:
      "Serhii is a strategic leader with a clear vision for how design, technology, and business intersect. As the CEO and co-founder of the agency, he brings over a decade of experience in building teams, managing complex projects, and scaling digital products.",
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
      "Outside of work, she enjoys surfing, spending time in nature, and values freedom - in code, in life, and in thinking.",
    linkedin: "https://www.linkedin.com/in/ganna-kovchyk/",
  },
  {
    id: 3,
    name: "Olga Nazarenko",
    slug: "olga_nazarenko",
    role: "UX UI Designer",
    imageKey: "person3",
    description1:
      "Olga is a UX UI designer who values structure and system thinking, always focusing on creating products that work seamlessly and solve real user needs. She is open to modern design trends and innovative solutions but believes they should be balanced with thoughtful, purposeful design, not just trendy visuals.",
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
      "Svitlana is a UX UI designer who values structure and system thinking, always focusing on creating products that work seamlessly and solve real user needs. She is open to modern design trends and innovative solutions but believes they should be balanced with thoughtful, purposeful design, not just trendy visuals.",
    description2:
      "Outside of work, she enjoys exploring new ideas and staying curious about how design and technology can come together to improve everyday life.",
    linkedin: "https://www.linkedin.com/in/svitlana-kiriiaka/",
  },
];

/**
 * Each entry is a React component so the `useTranslations()` call inside stays a
 * regular hook call. The caller supplies the class name because the photo is
 * styled by the slide sheet in the carousel and left unstyled in the modal.
 */
type MemberImageProps = { className?: string };

const MemberPhotoSerhii = ({ className }: MemberImageProps) => {
  const t = useTranslations();
  return (
    <Image
      src={oberemchuk}
      alt=""
      width={880}
      height={1192}
      className={className}
      draggable={false}
      role="img"
      aria-label={t("team.member.serhii_oberemchuk.image_alt")}
    />
  );
};

const MemberPhotoGanna = ({ className }: MemberImageProps) => {
  const t = useTranslations();
  return (
    <Image
      src={kovchyk}
      alt=""
      width={880}
      height={1192}
      className={className}
      draggable={false}
      role="img"
      aria-label={t("team.member.ganna_kovchyk.image_alt")}
    />
  );
};

const MemberPhotoOlga = ({ className }: MemberImageProps) => {
  const t = useTranslations();
  return (
    <Image
      src={nazarenko}
      alt=""
      width={880}
      height={1192}
      className={className}
      draggable={false}
      role="img"
      aria-label={t("team.member.olga_nazarenko.image_alt")}
    />
  );
};

const MemberPhotoSvitlana = ({ className }: MemberImageProps) => {
  const t = useTranslations();
  return (
    <Image
      src={kiriiaka}
      alt=""
      width={880}
      height={1192}
      className={className}
      draggable={false}
      role="img"
      aria-label={t("team.member.svitlana_kiriiaka.image_alt")}
    />
  );
};

export const imageMap: Record<ImageKey, (props: MemberImageProps) => JSX.Element> = {
  person1: MemberPhotoSerhii,
  person2: MemberPhotoGanna,
  person3: MemberPhotoOlga,
  person4: MemberPhotoSvitlana,
};
