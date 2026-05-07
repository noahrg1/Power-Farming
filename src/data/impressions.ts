export interface StateData {
  name: string;
  abbr: string;
  google: number;
  meta: number;
  total: number;
  clicks: { google: number; meta: number; total: number };
}

export const stateData: Record<string, StateData> = {
  NSW: {
    name: "New South Wales",
    abbr: "NSW",
    google: 2586642,
    meta: 645700,
    total: 3232342,
    clicks: { google: 30437, meta: 11115, total: 41552 },
  },
  VIC: {
    name: "Victoria",
    abbr: "VIC",
    google: 2204158,
    meta: 601628,
    total: 2805786,
    clicks: { google: 28051, meta: 10335, total: 38386 },
  },
  QLD: {
    name: "Queensland",
    abbr: "QLD",
    google: 1765711,
    meta: 555845,
    total: 2321556,
    clicks: { google: 20151, meta: 9702, total: 29853 },
  },
  WA: {
    name: "Western Australia",
    abbr: "WA",
    google: 1055155,
    meta: 258694,
    total: 1313849,
    clicks: { google: 12386, meta: 4127, total: 16513 },
  },
  SA: {
    name: "South Australia",
    abbr: "SA",
    google: 873404,
    meta: 174915,
    total: 1048319,
    clicks: { google: 9854, meta: 3239, total: 13093 },
  },
  TAS: {
    name: "Tasmania",
    abbr: "TAS",
    google: 166147,
    meta: 86278,
    total: 252425,
    clicks: { google: 2085, meta: 1404, total: 3489 },
  },
  ACT: {
    name: "Australian Capital Territory",
    abbr: "ACT",
    google: 73056,
    meta: 13128,
    total: 86184,
    clicks: { google: 711, meta: 240, total: 951 },
  },
  NT: {
    name: "Northern Territory",
    abbr: "NT",
    google: 23456,
    meta: 22897,
    total: 46353,
    clicks: { google: 315, meta: 449, total: 764 },
  },
};

export type Metric = "impressions" | "clicks";

export const reportPeriod = {
  google: "1 Jan 2025 – 7 May 2026",
  meta: "1 Jan 2026 – 7 May 2026",
};

export const totalImpressions = Object.values(stateData).reduce(
  (sum, s) => sum + s.total,
  0
);

export const totalClicks = Object.values(stateData).reduce(
  (sum, s) => sum + s.clicks.total,
  0
);
