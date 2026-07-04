import { LEGAL_ENTITY } from "~/types/legal.info";

/** Locale-aware display values for the legal entity (uk-UA → Ukrainian, otherwise romanized). */
export const getLegalDisplay = (lang: string) => {
  const isUk = lang === "uk-UA";
  return {
    name: isUk ? LEGAL_ENTITY.name : LEGAL_ENTITY.nameEn || LEGAL_ENTITY.name,
    address: isUk
      ? `с. ${LEGAL_ENTITY.locality}, ${LEGAL_ENTITY.region}, ${LEGAL_ENTITY.postalCode}`
      : `${LEGAL_ENTITY.localityEn || LEGAL_ENTITY.locality}, ${LEGAL_ENTITY.regionEn || LEGAL_ENTITY.region}, ${LEGAL_ENTITY.postalCode}`,
    edrDateFormatted: LEGAL_ENTITY.edrDate.split("-").reverse().join("."),
    phoneDisplay: LEGAL_ENTITY.phone.replace(
      /^(\+380)(\d{2})(\d{3})(\d{2})(\d{2})$/,
      "$1 $2 $3 $4 $5",
    ),
  };
};
