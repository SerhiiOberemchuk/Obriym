import { component$ } from "@qwik.dev/core";
import clsx from "clsx";
import "./link_styles.css";
import IconEmail from "/public/icons/icon_email.svg?w=24&h24&jsx";

type Props = { place: "footer" | "main" };

export default component$<Props>(({ place }) => {
  return (
    <a
      data-place={place}
      class={clsx(place === "footer" && "H5", place === "main" && "btn_header", " link_email")}
      href="mailto:info@obriym.com"
    >
      {place === "main" && <IconEmail class="link_email_icon" />}
      <span>info@obriym.com</span>
    </a>
  );
});
