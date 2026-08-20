import styles from "./styles_inputs.module.css";

import ContactFormComponent from "~/components/common/contact-form/ContactFormComponent";

export default function InputsContact() {
  return (
    <section className={styles.ic_content_box}>
      <ContactFormComponent modal={false} />
    </section>
  );
}
