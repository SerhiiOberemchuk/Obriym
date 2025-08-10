import { component$, QRL } from "@qwik.dev/core";
import "./mw-styles.css";
import NavList from "~/components/common/nav-list/NavList";
import { ChangeLocale } from "~/components/change-locale/change-locale";
import LetsWork from "~/components/lets-work/LetsWork";

type Props = { isOpen: boolean; onClick: QRL<() => void> };

export default component$<Props>(({ isOpen, onClick }) => {
  return (
    <>
      <div class="mob_wraper" data-open={isOpen ? "true" : "false"} onClick$={onClick} />
      <div class="mob_menu">
        <NavList place="mobilemenu" onClick={onClick} />
        <div>
          <ChangeLocale place="mob-menu" />
          <LetsWork place="mob-menu" />
        </div>
      </div>
    </>
  );
});
