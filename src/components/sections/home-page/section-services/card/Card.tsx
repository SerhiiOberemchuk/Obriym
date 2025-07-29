import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./card-tyles.css?inline";
import Img from "/public/images/preview.png?jsx";
import { ServicesCardProps } from "~/types/services-card.type";

export default component$<ServicesCardProps>(({ title, description, list }) => {
  useStylesScoped$(styles);

  return (
    <article class="card">
      <header class="wrapper_title">
        <h2 class="title body_big">{title} </h2>
        <p class="description btn_body">{description}</p>
        <ol class="list btn_body" aria-label="Key tasks in this phase">
          {list.map((item, index) => (
            <li key={index} class="item">
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </header>
      <figure class="image_wrapper">
        <Img alt="Preview of launch and optimization process" />
      </figure>
    </article>
  );
});
