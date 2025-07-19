import { component$, Slot } from "@qwik.dev/core";
import NavList from "~/components/common/nav-list/NavList";
import Footer from "~/components/layout/footer/Footer";
import Header from "~/components/layout/header/Header";
import LetsWork from "~/components/lets-work/LetsWork";
import MobileMenu from "~/components/mobile-menu/MobileMenu";

export default component$(() => {
  return (
    <>
      <Header />
      <LetsWork place="header" />
      <MobileMenu />
      <NavList place="header" />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
