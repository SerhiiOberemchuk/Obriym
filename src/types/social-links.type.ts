type SocialNetwroks = "facebook" | "linkedIn" | "instagram";

type SocialLinks = {
  network: SocialNetwroks;
  link: string;
  iconLink: string;
  ariaLabel?: string;
};

export const socialLinks: SocialLinks[] = [
  {
    network: "facebook",
    link: "https://www.facebook.com/obriym",
    iconLink: "/icons/icon-facebook.svg",
    ariaLabel: "Link to facebook account",
  },
  {
    network: "linkedIn",
    link: "https://www.linkedin.com/company/obriym/",
    iconLink: "/icons/icon-linkedIn.svg",
    ariaLabel: "Link to linkedin account",
  },
  //   { network: "threads", link: "https://www.threads.com/@obriym_web_agency/" },
  {
    network: "instagram",
    link: "https://www.instagram.com/obriym_web_agency/",
    iconLink: "/icons/icon-instagram.svg",
    ariaLabel: "Link to instagram account",
  },
];
