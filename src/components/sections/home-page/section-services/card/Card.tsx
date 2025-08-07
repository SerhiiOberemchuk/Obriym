import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./card-tyles.css?inline";
import { ServicesCardProps } from "~/types/services-card.type";

export default component$<ServicesCardProps>(({ title, description, list, srcImage }) => {
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
      </header>
      <figure class="image_wrapper">
        <img src={srcImage} alt={`${title} service illustration`} loading="lazy" />
      </figure>
    </article>
  );
});
