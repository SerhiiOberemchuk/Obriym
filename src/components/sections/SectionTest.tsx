import { component$ } from "@qwik.dev/core";
import LinkEmail from "../common/link-email/LinkEmail";

export default component$(() => {
  return (
    <section>
      <LinkEmail place="main" />
    </section>
  );
});
