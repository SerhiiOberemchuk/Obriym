import { component$ } from "@qwik.dev/core";
import "./mw-styles.css";

type Props = { isOpen: boolean };

export default component$<Props>(({ isOpen }) => {
  return (
    <div class="mob_wraper" data-open={isOpen ? "true" : "false"}>
      <div class="mob_container">
        <div class="opacity"></div>
        <div class="mob_menu">
          <h2 class="mob_title">mobile menu</h2>
        </div>
      </div>
    </div>
  );
});
