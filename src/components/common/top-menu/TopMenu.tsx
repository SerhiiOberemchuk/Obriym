import { component$ } from "@qwik.dev/core";
import { ChangeLocale } from "./change-locale/change-locale";
import "./tm-styles.css";
import LetsWork from "./lets-work/LetsWork";

type Props = { place: "mob-menu" | "header" };
export default component$<Props>(({ place }) => {
  return (
    <div class="tm_container" data-place={place}>
      <ChangeLocale />
      <LetsWork />
    </div>
  );
});
