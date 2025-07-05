import { component$ } from '@qwik.dev/core';
import { DocumentHead } from '@qwik.dev/router';
import { inlineTranslate } from 'qwik-speak';

export default component$(() => {
  const t = inlineTranslate();

  const key = 'dynamic';

  return (
    <>
      <h1>{t('app.title', { name: 'Qwik Speak' })}</h1>

      <p>{t(`runtime.${key}`)}</p>
    </>
  );
});

export const head: DocumentHead = () => {
  const t = inlineTranslate();
  return {
    title: t('app.head.home.title@@{{name}}', { name: 'Obriym' }),
    meta: [{}],
  };
};
