import { component$, QRL } from "@qwik.dev/core";
import "./mw-styles.css";
import NavList from "~/components/common/nav-list/NavList";
import TopMenu from "~/components/common/top-menu/TopMenu";

type Props = { isOpen: boolean; onClick: QRL<() => void> };

export default component$<Props>(({ isOpen, onClick }) => {
  return (
    <>
      <div class="mob_wraper" data-open={isOpen ? "true" : "false"} onClick$={onClick} />
      <div class="mob_menu">
        <NavList place="mobilemenu" onClick={onClick} />
        <TopMenu place="mob-menu" />
      </div>
    </>
  );
});
