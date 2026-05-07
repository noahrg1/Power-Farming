"use client";

import { useState } from "react";
import AustraliaHeatmap from "@/components/AustraliaHeatmap";
import {
  stateData,
  totalImpressions,
  totalClicks,
  reportPeriod,
  type Metric,
} from "@/data/impressions";

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

const platformTotals = Object.values(stateData).reduce(
  (acc, s) => ({
    google: acc.google + s.google,
    meta: acc.meta + s.meta,
    clicksGoogle: acc.clicksGoogle + s.clicks.google,
    clicksMeta: acc.clicksMeta + s.clicks.meta,
  }),
  { google: 0, meta: 0, clicksGoogle: 0, clicksMeta: 0 }
);

export default function Home() {
  const [metric, setMetric] = useState<Metric>("impressions");

  return (
    <main className="min-h-screen px-4 py-8 md:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Power Farming
          </h1>
          <p className="text-zinc-400 mt-1 text-sm">
            Advertising activity by region
          </p>
        </div>

      </div>

      {/* Summary cards */}
      {metric === "impressions" ? (
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
          <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
              Total Impressions
            </p>
            <p className="text-xl md:text-2xl font-bold text-white">
              {formatNumber(totalImpressions)}
            </p>
            <p className="text-xs text-zinc-500 mt-1">All platforms</p>
          </div>
          <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
              Google
            </p>
            <p className="text-xl md:text-2xl font-bold text-white">
              {formatNumber(platformTotals.google)}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {reportPeriod.google}
            </p>
          </div>
          <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
              Meta
            </p>
            <p className="text-xl md:text-2xl font-bold text-white">
              {formatNumber(platformTotals.meta)}
            </p>
            <p className="text-xs text-zinc-500 mt-1">{reportPeriod.meta}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
          <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
              Total Clicks
            </p>
            <p className="text-xl md:text-2xl font-bold text-white">
              {formatNumber(totalClicks)}
            </p>
            <p className="text-xs text-zinc-500 mt-1">All platforms</p>
          </div>
          <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
              Google
            </p>
            <p className="text-xl md:text-2xl font-bold text-white">
              {formatNumber(platformTotals.clicksGoogle)}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {reportPeriod.google}
            </p>
          </div>
          <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
              Meta
            </p>
            <p className="text-xl md:text-2xl font-bold text-white">
              {formatNumber(platformTotals.clicksMeta)}
            </p>
            <p className="text-xs text-zinc-500 mt-1">{reportPeriod.meta}</p>
          </div>
        </div>
      )}

      {/* Map + Table */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Heatmap */}
        <div className="lg:col-span-3 bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4 md:p-6">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h2 className="text-base font-semibold text-white mb-1">
                {metric === "impressions"
                  ? "Impressions by State"
                  : "Clicks by State"}
              </h2>
              <p className="text-xs text-zinc-500 mb-4">
                Hover over a state or city dot to see the breakdown
              </p>
            </div>
            <div className="flex bg-[#12121a] border border-[#2a2a3e] rounded-lg p-1">
              <button
                onClick={() => setMetric("impressions")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  metric === "impressions"
                    ? "bg-[#22c55e]/15 text-green-400 border border-green-500/30"
                    : "text-zinc-400 hover:text-zinc-200 border border-transparent"
                }`}
              >
                Impressions
              </button>
              <button
                onClick={() => setMetric("clicks")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  metric === "clicks"
                    ? "bg-[#3b82f6]/15 text-blue-400 border border-blue-500/30"
                    : "text-zinc-400 hover:text-zinc-200 border border-transparent"
                }`}
              >
                Clicks
              </button>
            </div>
          </div>
          <AustraliaHeatmap metric={metric} />
        </div>

        {/* Table */}
        <div className="lg:col-span-2 bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4 md:p-6">
          <h2 className="text-base font-semibold text-white mb-4">
            State Breakdown
          </h2>
          <div className="overflow-x-auto">
            {metric === "impressions" ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-500 text-xs uppercase tracking-wider border-b border-[#2a2a3e]">
                    <th className="text-left py-2 pr-2">State</th>
                    <th className="text-right py-2 px-2">Google</th>
                    <th className="text-right py-2 px-2">Meta</th>
                    <th className="text-right py-2 pl-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(stateData)
                    .sort((a, b) => b.total - a.total)
                    .map((state) => (
                      <tr
                        key={state.abbr}
                        className="border-b border-[#2a2a3e]/50 hover:bg-[#22223a] transition-colors"
                      >
                        <td className="py-2.5 pr-2 font-medium text-zinc-300">
                          {state.abbr}
                        </td>
                        <td className="py-2.5 px-2 text-right text-zinc-400 tabular-nums">
                          {formatNumber(state.google)}
                        </td>
                        <td className="py-2.5 px-2 text-right text-zinc-400 tabular-nums">
                          {formatNumber(state.meta)}
                        </td>
                        <td className="py-2.5 pl-2 text-right font-semibold text-white tabular-nums">
                          {formatNumber(state.total)}
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-[#2a2a3e] font-semibold text-white">
                    <td className="py-2.5 pr-2">Total</td>
                    <td className="py-2.5 px-2 text-right tabular-nums">
                      {formatNumber(platformTotals.google)}
                    </td>
                    <td className="py-2.5 px-2 text-right tabular-nums">
                      {formatNumber(platformTotals.meta)}
                    </td>
                    <td className="py-2.5 pl-2 text-right tabular-nums">
                      {formatNumber(totalImpressions)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-500 text-xs uppercase tracking-wider border-b border-[#2a2a3e]">
                    <th className="text-left py-2 pr-2">State</th>
                    <th className="text-right py-2 px-2">Google</th>
                    <th className="text-right py-2 px-2">Meta</th>
                    <th className="text-right py-2 pl-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(stateData)
                    .sort((a, b) => b.clicks.total - a.clicks.total)
                    .map((state) => (
                      <tr
                        key={state.abbr}
                        className="border-b border-[#2a2a3e]/50 hover:bg-[#22223a] transition-colors"
                      >
                        <td className="py-2.5 pr-2 font-medium text-zinc-300">
                          {state.abbr}
                        </td>
                        <td className="py-2.5 px-2 text-right text-zinc-400 tabular-nums">
                          {formatNumber(state.clicks.google)}
                        </td>
                        <td className="py-2.5 px-2 text-right text-zinc-400 tabular-nums">
                          {formatNumber(state.clicks.meta)}
                        </td>
                        <td className="py-2.5 pl-2 text-right font-semibold text-white tabular-nums">
                          {formatNumber(state.clicks.total)}
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-[#2a2a3e] font-semibold text-white">
                    <td className="py-2.5 pr-2">Total</td>
                    <td className="py-2.5 px-2 text-right tabular-nums">
                      {formatNumber(platformTotals.clicksGoogle)}
                    </td>
                    <td className="py-2.5 px-2 text-right tabular-nums">
                      {formatNumber(platformTotals.clicksMeta)}
                    </td>
                    <td className="py-2.5 pl-2 text-right tabular-nums">
                      {formatNumber(totalClicks)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-zinc-600">
        Data sources: Google Ads, DV360, Meta Ads
      </div>
    </main>
  );
}
