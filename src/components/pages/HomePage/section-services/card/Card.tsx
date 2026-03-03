import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import styles from "./card-tyles.css?inline";
import { ServicesCardProps } from "~/types/services-card.type";

export default component$<ServicesCardProps>(({ title, description, list, href, linkLabel }) => {
  useStylesScoped$(styles);

  return (
    <article class="card">
      <header class="wrapper_title">
        <h3 class="title body_big">{title} </h3>
        <p class="description btn_body">{description}</p>
        <ol class="list btn_body" aria-label="Key tasks in this phase">
          {list.map((item, index) => (
            <li key={index} class="item">
              {item}
            </li>
          ))}
        </ol>
        {href && (
          <Link
            href={href}
            class="card-link btn_body"
            aria-label={`${linkLabel ?? "Open service page"}: ${title}`}
          >
            {linkLabel ?? "Open service page"}
          </Link>
        )}
      </header>
      <Slot />
    </article>
  );
});