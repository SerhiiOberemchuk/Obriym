declare module "ga-gtag" {
  type GtagConsentState = "granted" | "denied";
  type GtagConsentUpdate = {
    ad_storage?: GtagConsentState;
    analytics_storage?: GtagConsentState;
  };

  export function install(
    trackingId: string,
    additionalConfigInfo?: Record<string, unknown>,
  ): void;

  export function gtag(
    command: "consent",
    action: "update",
    params: GtagConsentUpdate,
  ): void;

  export function gtag(command: string, ...args: unknown[]): void;
}
