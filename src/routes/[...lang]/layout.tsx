import { component$, Slot } from "@qwik.dev/core";
import Header from "~/components/header/Header";

export default component$(() => {
  return (
    <div>
      <Header />
      <Slot />
    </div>
  );
});
