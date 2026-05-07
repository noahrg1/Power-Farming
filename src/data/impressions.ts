export interface StateData {
  name: string;
  abbr: string;
  googleAds: number;
  dv360: number;
  meta: number;
  total: number;
  clicks?: { googleAds: number; meta: number };
}

export const stateData: Record<string, StateData> = {
  NSW: {
    name: "New South Wales",
    abbr: "NSW",
    googleAds: 2410533,
    dv360: 176109,
    meta: 645700,
    total: 3232342,
    clicks: { googleAds: 29947, meta: 11115 },
  },
  VIC: {
    name: "Victoria",
    abbr: "VIC",
    googleAds: 2105015,
    dv360: 99143,
    meta: 601628,
    total: 2805786,
    clicks: { googleAds: 27721, meta: 10335 },
  },
  QLD: {
    name: "Queensland",
    abbr: "QLD",
    googleAds: 1698377,
    dv360: 67334,
    meta: 555845,
    total: 2321556,
    clicks: { googleAds: 19949, meta: 9702 },
  },
  WA: {
    name: "Western Australia",
    abbr: "WA",
    googleAds: 1018266,
    dv360: 36889,
    meta: 258694,
    total: 1313849,
    clicks: { googleAds: 12275, meta: 4127 },
  },
  SA: {
    name: "South Australia",
    abbr: "SA",
    googleAds: 851755,
    dv360: 21649,
    meta: 174915,
    total: 1048319,
    clicks: { googleAds: 9780, meta: 3239 },
  },
  TAS: {
    name: "Tasmania",
    abbr: "TAS",
    googleAds: 166147,
    dv360: 0,
    meta: 86278,
    total: 252425,
    clicks: { googleAds: 2085, meta: 1404 },
  },
  ACT: {
    name: "Australian Capital Territory",
    abbr: "ACT",
    googleAds: 73056,
    dv360: 0,
    meta: 13128,
    total: 86184,
    clicks: { googleAds: 711, meta: 240 },
  },
  NT: {
    name: "Northern Territory",
    abbr: "NT",
    googleAds: 23456,
    dv360: 0,
    meta: 22897,
    total: 46353,
    clicks: { googleAds: 315, meta: 449 },
  },
};

export const reportPeriod = {
  googleAds: "18 Jan 2026 – 7 May 2026",
  dv360: "1 Jan 2025 – 7 May 2025",
  meta: "1 Jan 2026 – 7 May 2026",
};

export const totalImpressions = Object.values(stateData).reduce(
  (sum, s) => sum + s.total,
  0
);
