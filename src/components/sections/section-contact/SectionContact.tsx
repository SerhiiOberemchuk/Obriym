import { component$, useStylesScoped$ } from "@qwik.dev/core";
import ContentContact from "./content-contact/ContentContact";
import InputsContact from "./inputs-contact/InputsContact";
import styles from "./styles_contact.css?inline";
import IconGreen from "/public/icons/icon-green.svg?w=100&h100&jsx";

interface ContactForm {
  services: string[];
  budget: string;
  name: string;
  email: string;
  message: string;
}
interface SectionContactProps {
  initialValues: ContactForm;
}
export default component$(({ initialValues }: SectionContactProps) => {
  useStylesScoped$(styles);
  return (
    <section class="c_section">
      <div class="container ">
        <div class="c_box_title">
          <IconGreen class="c_title_icon" />
          <h2 class="H3_uppercase grey_dark">get a contact</h2>
        </div>

        <div class="с_container">
          <ContentContact />
          <InputsContact initialValues={initialValues} />
        </div>
      </div>
    </section>
  );
});
