type SocialNetwroks = "facebook" | "linkedIn" | "instagram";

type SocialLinks = {
  network: SocialNetwroks;
  link: string;
  iconLink: string;
};

export const socialLinks: SocialLinks[] = [
  {
    network: "facebook",
    link: "https://www.facebook.com/obriym",
    iconLink: "/icons/icon-facebook.svg",
  },
  {
    network: "linkedIn",
    link: "https://www.linkedin.com/company/obriym/",
    iconLink: "/icons/icon-linkedIn.svg",
  },
  //   { network: "threads", link: "https://www.threads.com/@obriym_web_agency/" },
  {
    network: "instagram",
    link: "https://www.instagram.com/obriym_web_agency/",
    iconLink: "/icons/icon-instagram.svg",
  },
];
