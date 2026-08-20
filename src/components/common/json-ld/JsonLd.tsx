type JsonLdProps = {
  id: string;
  data: unknown;
};

/** Renders one `application/ld+json` block, matching the Qwik `DocumentScript` output. */
export default function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
