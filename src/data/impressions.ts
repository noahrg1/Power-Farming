export interface MonthlyData {
  google: number;
  meta: number;
  total: number;
  clicks: { google: number; meta: number; total: number };
}

export interface StateData {
  name: string;
  abbr: string;
  google: number;
  meta: number;
  total: number;
  clicks: { google: number; meta: number; total: number };
  monthly: Record<string, MonthlyData>;
}

export const stateData: Record<string, StateData> = {
  NSW: {
    name: "New South Wales",
    abbr: "NSW",
    google: 2588321,
    meta: 647096,
    total: 3235417,
    clicks: { google: 30454, meta: 11132, total: 41586 },
    monthly: {
      "2025-02": { google: 137961, meta: 0, total: 137961, clicks: { google: 343, meta: 0, total: 343 } },
      "2025-03": { google: 38148, meta: 0, total: 38148, clicks: { google: 147, meta: 0, total: 147 } },
      "2026-01": { google: 29851, meta: 51164, total: 81015, clicks: { google: 544, meta: 1030, total: 1574 } },
      "2026-02": { google: 6009, meta: 64813, total: 70822, clicks: { google: 310, meta: 1010, total: 1320 } },
      "2026-03": { google: 321949, meta: 174448, total: 496397, clicks: { google: 3532, meta: 2735, total: 6267 } },
      "2026-04": { google: 1617839, meta: 301360, total: 1919199, clicks: { google: 20856, meta: 5369, total: 26225 } },
      "2026-05": { google: 436564, meta: 55311, total: 491875, clicks: { google: 4722, meta: 988, total: 5710 } },
    },
  },
  VIC: {
    name: "Victoria",
    abbr: "VIC",
    google: 2205530,
    meta: 602791,
    total: 2808321,
    clicks: { google: 28069, meta: 10354, total: 38423 },
    monthly: {
      "2025-02": { google: 81144, meta: 0, total: 81144, clicks: { google: 254, meta: 0, total: 254 } },
      "2025-03": { google: 17999, meta: 0, total: 17999, clicks: { google: 76, meta: 0, total: 76 } },
      "2026-01": { google: 23501, meta: 58662, total: 82163, clicks: { google: 461, meta: 1333, total: 1794 } },
      "2026-02": { google: 5673, meta: 60753, total: 66426, clicks: { google: 408, meta: 955, total: 1363 } },
      "2026-03": { google: 282994, meta: 151766, total: 434760, clicks: { google: 3553, meta: 2462, total: 6015 } },
      "2026-04": { google: 1436360, meta: 282158, total: 1718518, clicks: { google: 19310, meta: 4757, total: 24067 } },
      "2026-05": { google: 357859, meta: 49452, total: 407311, clicks: { google: 4007, meta: 847, total: 4854 } },
    },
  },
  QLD: {
    name: "Queensland",
    abbr: "QLD",
    google: 1766822,
    meta: 556954,
    total: 2323776,
    clicks: { google: 20170, meta: 9719, total: 29889 },
    monthly: {
      "2025-02": { google: 50536, meta: 0, total: 50536, clicks: { google: 133, meta: 0, total: 133 } },
      "2025-03": { google: 16798, meta: 0, total: 16798, clicks: { google: 69, meta: 0, total: 69 } },
      "2026-01": { google: 14647, meta: 43771, total: 58418, clicks: { google: 303, meta: 793, total: 1096 } },
      "2026-02": { google: 4721, meta: 60869, total: 65590, clicks: { google: 322, meta: 1039, total: 1361 } },
      "2026-03": { google: 223232, meta: 147155, total: 370387, clicks: { google: 2626, meta: 2163, total: 4789 } },
      "2026-04": { google: 1154865, meta: 256170, total: 1411035, clicks: { google: 13690, meta: 4792, total: 18482 } },
      "2026-05": { google: 302023, meta: 48989, total: 351012, clicks: { google: 3027, meta: 932, total: 3959 } },
    },
  },
  WA: {
    name: "Western Australia",
    abbr: "WA",
    google: 1055852,
    meta: 259184,
    total: 1315036,
    clicks: { google: 12388, meta: 4140, total: 16528 },
    monthly: {
      "2025-02": { google: 28876, meta: 0, total: 28876, clicks: { google: 82, meta: 0, total: 82 } },
      "2025-03": { google: 8013, meta: 0, total: 8013, clicks: { google: 29, meta: 0, total: 29 } },
      "2026-01": { google: 7810, meta: 16618, total: 24428, clicks: { google: 129, meta: 285, total: 414 } },
      "2026-02": { google: 1516, meta: 22687, total: 24203, clicks: { google: 79, meta: 309, total: 388 } },
      "2026-03": { google: 121828, meta: 76461, total: 198289, clicks: { google: 1308, meta: 1067, total: 2375 } },
      "2026-04": { google: 694335, meta: 120650, total: 814985, clicks: { google: 8746, meta: 2043, total: 10789 } },
      "2026-05": { google: 193474, meta: 22768, total: 216242, clicks: { google: 2015, meta: 436, total: 2451 } },
    },
  },
  SA: {
    name: "South Australia",
    abbr: "SA",
    google: 874037,
    meta: 175282,
    total: 1049319,
    clicks: { google: 9855, meta: 3249, total: 13104 },
    monthly: {
      "2025-02": { google: 16823, meta: 0, total: 16823, clicks: { google: 58, meta: 0, total: 58 } },
      "2025-03": { google: 4826, meta: 0, total: 4826, clicks: { google: 16, meta: 0, total: 16 } },
      "2026-01": { google: 7768, meta: 12586, total: 20354, clicks: { google: 123, meta: 287, total: 410 } },
      "2026-02": { google: 1383, meta: 13920, total: 15303, clicks: { google: 75, meta: 206, total: 281 } },
      "2026-03": { google: 97692, meta: 51068, total: 148760, clicks: { google: 1146, meta: 814, total: 1960 } },
      "2026-04": { google: 590749, meta: 81319, total: 672068, clicks: { google: 6979, meta: 1633, total: 8612 } },
      "2026-05": { google: 154796, meta: 16389, total: 171185, clicks: { google: 1458, meta: 309, total: 1767 } },
    },
  },
  TAS: {
    name: "Tasmania",
    abbr: "TAS",
    google: 166264,
    meta: 86381,
    total: 252645,
    clicks: { google: 2086, meta: 1407, total: 3493 },
    monthly: {
      "2026-01": { google: 1675, meta: 8697, total: 10372, clicks: { google: 40, meta: 149, total: 189 } },
      "2026-02": { google: 579, meta: 9012, total: 9591, clicks: { google: 32, meta: 101, total: 133 } },
      "2026-03": { google: 19763, meta: 21350, total: 41113, clicks: { google: 295, meta: 300, total: 595 } },
      "2026-04": { google: 111837, meta: 40071, total: 151908, clicks: { google: 1392, meta: 738, total: 2130 } },
      "2026-05": { google: 32410, meta: 7251, total: 39661, clicks: { google: 327, meta: 119, total: 446 } },
    },
  },
  ACT: {
    name: "Australian Capital Territory",
    abbr: "ACT",
    google: 73141,
    meta: 13149,
    total: 86290,
    clicks: { google: 711, meta: 240, total: 951 },
    monthly: {
      "2026-01": { google: 852, meta: 819, total: 1671, clicks: { google: 10, meta: 17, total: 27 } },
      "2026-02": { google: 77, meta: 1666, total: 1743, clicks: { google: 3, meta: 40, total: 43 } },
      "2026-03": { google: 7918, meta: 3074, total: 10992, clicks: { google: 87, meta: 51, total: 138 } },
      "2026-04": { google: 50877, meta: 6400, total: 57277, clicks: { google: 511, meta: 110, total: 621 } },
      "2026-05": { google: 13417, meta: 1190, total: 14607, clicks: { google: 100, meta: 22, total: 122 } },
    },
  },
  NT: {
    name: "Northern Territory",
    abbr: "NT",
    google: 23460,
    meta: 22943,
    total: 46403,
    clicks: { google: 315, meta: 449, total: 764 },
    monthly: {
      "2026-01": { google: 244, meta: 1333, total: 1577, clicks: { google: 6, meta: 27, total: 33 } },
      "2026-02": { google: 112, meta: 1873, total: 1985, clicks: { google: 8, meta: 14, total: 22 } },
      "2026-03": { google: 3010, meta: 5534, total: 8544, clicks: { google: 53, meta: 93, total: 146 } },
      "2026-04": { google: 16995, meta: 11798, total: 28793, clicks: { google: 217, meta: 255, total: 472 } },
      "2026-05": { google: 3099, meta: 2405, total: 5504, clicks: { google: 31, meta: 60, total: 91 } },
    },
  },
};

export type Metric = "impressions" | "clicks";

export const availableMonths = [
  { key: "all", label: "All Time" },
  { key: "2026-01", label: "January 2026" },
  { key: "2026-02", label: "February 2026" },
  { key: "2026-03", label: "March 2026" },
  { key: "2026-04", label: "April 2026" },
  { key: "2026-05", label: "May 2026" },
];

export const reportPeriod = {
  google: "1 Jan 2025 – 7 May 2026",
  meta: "1 Jan 2026 – 7 May 2026",
};

export function getFilteredStateData(month: string): Record<string, StateData> {
  if (month === "all") return stateData;
  const filtered: Record<string, StateData> = {};
  for (const [key, state] of Object.entries(stateData)) {
    const m = state.monthly[month] || { google: 0, meta: 0, total: 0, clicks: { google: 0, meta: 0, total: 0 } };
    filtered[key] = { ...state, google: m.google, meta: m.meta, total: m.total, clicks: m.clicks };
  }
  return filtered;
}

export const totalImpressions = Object.values(stateData).reduce(
  (sum, s) => sum + s.total,
  0
);

export const totalClicks = Object.values(stateData).reduce(
  (sum, s) => sum + s.clicks.total,
  0
);
