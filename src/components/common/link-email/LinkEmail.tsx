import IconEmail from "~/assets/icons/icon_email.svg";

type Props = { place: "footer" | "main" };

export default function LinkEmail({ place }: Props) {
  return (
    <a
      data-place={place}
      className={`${place === "footer" ? "H5" : "btn_header grey"} link_email`}
      href="mailto:info@obriym.com"
    >
      {place === "main" && <IconEmail className="link_email_icon" width={24} height={24} />}
      <span>info@obriym.com</span>
    </a>
  );
}
