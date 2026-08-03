/**
 * The formulary: every brand carried, cross-referenced to its laboratory and
 * therapeutic area.
 *
 * Derived strictly from the CV's own two lists — the products named under each
 * laboratory, and the products named under each therapeutic specialty. Nothing
 * here classifies a brand the CV does not already classify.
 *
 * `area: null` means the CV names the brand under a laboratory but does not
 * place it in a specialty; those render under the laboratory's multi-line
 * portfolio rather than being assigned an area we cannot support.
 *
 * `labKey` indexes experience.items[] by company; `areaKey` indexes
 * specialties.items[] by id. Labels come from i18n so both languages work.
 */

export const LAB_ORDER = [
  'Laboratorios Hessel',
  'PHARMAINSA',
  'GUTIS',
  'IMFARSA',
  'Grupo Menarini',
  'Pfizer'
];

/** Display name per language for laboratories whose name is translated. */
export const LAB_LABELS = {
  'Laboratorios Hessel': { es: 'Laboratorios Hessel', en: 'Hessel Laboratories' },
  PHARMAINSA: { es: 'PHARMAINSA', en: 'PHARMAINSA' },
  GUTIS: { es: 'GUTIS', en: 'GUTIS' },
  IMFARSA: { es: 'IMFARSA', en: 'IMFARSA' },
  'Grupo Menarini': { es: 'Grupo Menarini', en: 'Menarini Group' },
  Pfizer: { es: 'Pfizer', en: 'Pfizer' }
};

export const portfolio = [
  // Laboratorios Hessel — Nov 2023 to Nov 2025
  { brand: 'Colestor', lab: 'Laboratorios Hessel', areaKey: 'hiperlipidemia', from: 2023, to: 2025 },
  { brand: 'Colestor Z', lab: 'Laboratorios Hessel', areaKey: 'hiperlipidemia', from: 2023, to: 2025 },
  { brand: 'Colestop', lab: 'Laboratorios Hessel', areaKey: 'hiperlipidemia', from: 2023, to: 2025 },

  // GUTIS — Sep 2019 to Jan 2020
  { brand: 'Relucit', lab: 'GUTIS', areaKey: 'dolor', from: 2019, to: 2020 },

  // IMFARSA — Jan 2016 to Aug 2019
  { brand: 'ISIS Pharma', lab: 'IMFARSA', areaKey: 'derma', from: 2016, to: 2019 },

  // Grupo Menarini — Jul 2013 to Dec 2015
  { brand: 'Nebilet', lab: 'Grupo Menarini', areaKey: 'cardio', from: 2013, to: 2015 },
  { brand: 'Benicar', lab: 'Grupo Menarini', areaKey: 'cardio', from: 2013, to: 2015 },
  { brand: 'Zofenil', lab: 'Grupo Menarini', areaKey: 'cardio', from: 2013, to: 2015 },
  { brand: 'Badyket', lab: 'Grupo Menarini', areaKey: 'dolor', from: 2013, to: 2015 },
  { brand: 'Carbimen', lab: 'Grupo Menarini', areaKey: null, from: 2013, to: 2015 },
  { brand: 'Disgren', lab: 'Grupo Menarini', areaKey: null, from: 2013, to: 2015 },

  // Pfizer — Sep 2010 to Jun 2013
  { brand: 'Lipitor', lab: 'Pfizer', areaKey: 'cardio', from: 2010, to: 2013 },
  { brand: 'Valdine', lab: 'Pfizer', areaKey: 'dolor', from: 2010, to: 2013 },
  { brand: 'Valdureim', lab: 'Pfizer', areaKey: 'dolor', from: 2010, to: 2013 },
  { brand: 'Viagra', lab: 'Pfizer', areaKey: null, from: 2010, to: 2013 }
];

/** Therapeutic areas that actually appear in the formulary, in CV order. */
export const AREA_ORDER = ['cardio', 'hiperlipidemia', 'dolor', 'derma'];
