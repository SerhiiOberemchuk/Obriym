import { useTranslations } from "next-intl";
import { Link } from "~/i18n/navigation";
import LogoSVG from "../../../../public/logo.svg";

type Props = {
  place: "footer" | "header";
  className?: string;
};

export default function Logo({ place }: Props) {
  const t = useTranslations();
  return (
    <Link href="/" className="logo" data-place={place} aria-label={t("logo.link")}>
      <LogoSVG aria-hidden="true" focusable="false" />
    </Link>
  );
}
