import type { JSXOutput } from "@builder.io/qwik";
import type { PartytownConfig } from "@qwik.dev/partytown/integration";
import { partytownSnippet } from "@qwik.dev/partytown/integration";

/**
 * @public
 * You can pass setting with props
 */
export const QwikPartytown = (props: PartytownConfig): JSXOutput => {
  return <script dangerouslySetInnerHTML={partytownSnippet(props)} />;
};
