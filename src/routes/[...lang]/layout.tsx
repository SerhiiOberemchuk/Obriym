import { component$, Slot } from "@qwik.dev/core";
import Footer from "~/components/layout/footer/Footer";
import Header from "~/components/layout/header/Header";

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
