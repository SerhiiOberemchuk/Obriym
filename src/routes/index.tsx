import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import "./styles.css";

export default component$(() => {
  return (
    <section class="placeholder">
      <div class="container">
        <h1>OBRIYM Web Agency</h1>
        <p class="tagline">From first spark to full launch.</p>

        <div class="text-block">
          <p>
            <strong>OBRIYM</strong> — from insight to execution. We plan, design, develop, and launch products that make a real impact.
          </p>
          <p>
            We are a team of experienced professionals passionate about crafting innovative solutions to help businesses grow.
          </p>
        </div>

        <a href="mailto:serhiioberemchuk@gmail.com" class="email">
          serhiioberemchuk@gmail.com
        </a>

        <div class="status">🚧 Site under development</div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Obriym",
  meta: [
    {
      name: "description",
      content: "Obriym web agency - We create web products, mobile apps, and design solutions.",
    },
    { property: "og:title", content: "Welcome to Obriym Web Agency." },
    { property: "og:description", content: "Obriym web agency" },
    { property: "og:image", content: "/og-image.png" },
    { name: "twitter:title", content: "Welcome to Obriym" },
    { name: "twitter:description", content: "Obriym web agency" },
    { name: "twitter:image", content: "/og-image.png" },
  ],
};
