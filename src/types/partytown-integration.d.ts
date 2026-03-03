declare module "@builder.io/partytown/integration" {
  export interface PartytownConfig {
    [key: string]: unknown;
    forward?: string[];
  }

  export function partytownSnippet(config?: PartytownConfig): string;
}
