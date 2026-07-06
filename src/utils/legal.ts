import { LEGAL_ENTITY } from "~/types/legal.info";

/** Locale-aware display values for the legal entity (uk-UA → Ukrainian, otherwise romanized). */
export const getLegalDisplay = (lang: string) => {
  const isUk = lang === "uk-UA";
  return {
    // Non-uk locales keep the official Ukrainian legal name (matches bank/EDR documents)
    // with the romanized form in parentheses.
    name: isUk
      ? LEGAL_ENTITY.name
      : LEGAL_ENTITY.nameEn
        ? `${LEGAL_ENTITY.name} (${LEGAL_ENTITY.nameEn})`
        : LEGAL_ENTITY.name,
    // Full address as in the EDR extract; the country is prepended by the caller (localized).
    address: isUk
      ? `${LEGAL_ENTITY.postalCode}, ${LEGAL_ENTITY.region}, ${LEGAL_ENTITY.district}, село ${LEGAL_ENTITY.locality}, ${LEGAL_ENTITY.streetAddress}`
      : `${LEGAL_ENTITY.postalCode}, ${LEGAL_ENTITY.regionEn || LEGAL_ENTITY.region}, ${LEGAL_ENTITY.districtEn || LEGAL_ENTITY.district}, ${LEGAL_ENTITY.localityEn || LEGAL_ENTITY.locality} village, ${LEGAL_ENTITY.streetAddressEn || LEGAL_ENTITY.streetAddress}`,
    edrDateFormatted: LEGAL_ENTITY.edrDate.split("-").reverse().join("."),
    phoneDisplay: LEGAL_ENTITY.phone,
  };
};
