import Logo from "~/components/common/logo/logo";
import { ChangeLocale } from "~/components/change-locale/change-locale";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <Logo place="header" />
        <ChangeLocale place="header" />
      </div>
    </header>
  );
}
