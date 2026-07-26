export const LEGAL_ENTITY = {
  /** Official Ukrainian legal name incl. entity form, e.g. "ФОП Прізвище Ім'я По-батькові". */
  name: "ФІЗИЧНА ОСОБА - ПІДПРИЄМЕЦЬ Оберемчук Сергій Олександрович",
  /** Romanized display name for /en pages. Empty → falls back to `name`. */
  nameEn: "ФІЗИЧНА ОСОБА - ПІДПРИЄМЕЦЬ Оберемчук Сергій Олександрович",
  /** ЄДР registration record number (номер запису в ЄДР). */
  edrRecord: "178752761226",
  /** State registration date (ISO 8601 for JSON-LD `foundingDate`, e.g. "2026-07-03"). */
  edrDate: "2026-07-03",
  /** РНОКПП / ІПН (individual taxpayer number). */
  taxId: "3121116950",
  /** Registered city / village. */
  locality: "село Сатиїв",
  /** Romanized city/village for /en pages. Empty → falls back to `locality`. */
  localityEn: "село Сатиїв",
  /** Registered district (район), e.g. "Дубенський район". */
  district: "Дубенський р-н",
  /** Romanized district for /en pages (matches certified translation). Empty → falls back to `district`. */
  districtEn: "Дубенський р-н",
  /** Registered region (область), e.g. "Рівненська область". */
  region: "Рівненська обл.",
  /** Romanized region for /en pages (matches certified translation). Empty → falls back to `region`. */
  regionEn: "Рівненська обл.",
  /** Street + building as in the EDR extract, e.g. "вулиця Миру, будинок 2". */
  streetAddress: "вул. Миру, будинок 2",
  /** Romanized street + building for /en pages (matches certified translation). Empty → falls back to `streetAddress`. */
  streetAddressEn: "вул. Миру, будинок 2",
  /** Postal code (optional). */
  postalCode: "35610",
  /** Contact phone in E.164, e.g. "+380…". */
  phone: "+380970447229",
  /** Bank name. */
  bankName: "PUMB",
  /** IBAN, e.g. "UA…". */
  iban: "UA173348510000000026001364501",
} as const;