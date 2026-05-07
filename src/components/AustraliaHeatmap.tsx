"use client";

import { useState, useMemo, useCallback } from "react";
import { geoPath, geoMercator } from "d3-geo";
import { stateData, type StateData } from "@/data/impressions";
import australiaGeo from "@/data/australia.geojson";
import type { Feature, FeatureCollection, Geometry } from "geojson";

// Name → abbreviation lookup
const nameToAbbr: Record<string, string> = {
  "New South Wales": "NSW",
  Victoria: "VIC",
  Queensland: "QLD",
  "South Australia": "SA",
  "Western Australia": "WA",
  Tasmania: "TAS",
  "Northern Territory": "NT",
  "Australian Capital Territory": "ACT",
};

function getColor(total: number, maxTotal: number): string {
  const ratio = total / maxTotal;
  if (ratio > 0.8) return "#15803d";
  if (ratio > 0.6) return "#16a34a";
  if (ratio > 0.4) return "#22c55e";
  if (ratio > 0.2) return "#4ade80";
  if (ratio > 0.05) return "#86efac";
  return "#bbf7d0";
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

function formatNumberFull(n: number): string {
  return n.toLocaleString("en-AU");
}

const WIDTH = 800;
const HEIGHT = 750;

export default function AustraliaHeatmap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const maxTotal = Math.max(...Object.values(stateData).map((s) => s.total));

  const hoveredData: StateData | null = hoveredState
    ? stateData[hoveredState]
    : null;

  // Set up D3 projection fitted to Australia
  const { pathGenerator, centroids } = useMemo(() => {
    const geo = australiaGeo as FeatureCollection;

    const projection = geoMercator().fitSize([WIDTH, HEIGHT - 60], geo);
    const pathGen = geoPath().projection(projection);

    // Compute label positions (centroids)
    const cents: Record<string, [number, number]> = {};
    for (const feature of geo.features) {
      const abbr = nameToAbbr[feature.properties?.name] || "";
      const centroid = pathGen.centroid(feature as Feature<Geometry>);
      if (abbr && centroid && isFinite(centroid[0])) {
        cents[abbr] = centroid;
      }
    }

    return { pathGenerator: pathGen, centroids: cents };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  const geo = australiaGeo as FeatureCollection;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
      >
        {/* State shapes from real GeoJSON */}
        {geo.features.map((feature) => {
          const name = feature.properties?.name as string;
          const abbr = nameToAbbr[name];
          if (!abbr || !stateData[abbr]) return null;

          const data = stateData[abbr];
          const isHovered = hoveredState === abbr;
          const d = pathGenerator(feature as Feature<Geometry>);
          if (!d) return null;

          const centroid = centroids[abbr];

          return (
            <g
              key={abbr}
              onMouseEnter={() => setHoveredState(abbr)}
              onMouseLeave={() => setHoveredState(null)}
              className="cursor-pointer"
            >
              <path
                d={d}
                fill={getColor(data.total, maxTotal)}
                stroke={isHovered ? "#ffffff" : "#0a0a0f"}
                strokeWidth={isHovered ? 2 : 1}
                className="transition-all duration-150"
                opacity={hoveredState === null || isHovered ? 1 : 0.5}
              />
              {centroid && abbr !== "ACT" && (
                <>
                  <text
                    x={centroid[0]}
                    y={centroid[1] - 8}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fff"
                    fontSize={14}
                    fontWeight="600"
                    pointerEvents="none"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                  >
                    {abbr}
                  </text>
                  <text
                    x={centroid[0]}
                    y={centroid[1] + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#e4e4e7"
                    fontSize={11}
                    pointerEvents="none"
                    opacity={0.9}
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                  >
                    {formatNumber(data.total)}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* ACT label with leader line (too small for in-state label) */}
        {centroids.ACT && (
          <g pointerEvents="none">
            <line
              x1={centroids.ACT[0]}
              y1={centroids.ACT[1]}
              x2={centroids.ACT[0] + 60}
              y2={centroids.ACT[1] - 40}
              stroke="#a1a1aa"
              strokeWidth={1}
              strokeDasharray="3,2"
            />
            <text
              x={centroids.ACT[0] + 64}
              y={centroids.ACT[1] - 48}
              fill="#fff"
              fontSize={11}
              fontWeight="600"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
            >
              ACT
            </text>
            <text
              x={centroids.ACT[0] + 64}
              y={centroids.ACT[1] - 34}
              fill="#e4e4e7"
              fontSize={10}
              opacity={0.9}
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
            >
              {formatNumber(stateData.ACT.total)}
            </text>
          </g>
        )}

        {/* Legend */}
        <g transform={`translate(30, ${HEIGHT - 40})`}>
          <text x="0" y="0" fill="#a1a1aa" fontSize="11">
            Fewer impressions
          </text>
          {[
            "#bbf7d0",
            "#86efac",
            "#4ade80",
            "#22c55e",
            "#16a34a",
            "#15803d",
          ].map((color, i) => (
            <rect
              key={color}
              x={i * 30}
              y={8}
              width={28}
              height={12}
              fill={color}
              rx={2}
            />
          ))}
          <text x="190" y="0" fill="#a1a1aa" fontSize="11">
            More impressions
          </text>
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredData && (
        <div
          className="absolute pointer-events-none z-50 bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg shadow-2xl px-4 py-3 min-w-[240px]"
          style={{
            left: tooltipPos.x + 16,
            top: tooltipPos.y - 10,
            transform:
              tooltipPos.x > 500 ? "translateX(-110%)" : "translateX(0)",
          }}
        >
          <div className="font-semibold text-white text-sm mb-2">
            {hoveredData.name}
          </div>
          <div className="text-xs text-zinc-400 mb-2">
            Total: {formatNumberFull(hoveredData.total)} impressions
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                Google Ads
              </span>
              <span className="text-zinc-300 font-medium">
                {formatNumberFull(hoveredData.googleAds)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
                DV360
              </span>
              <span className="text-zinc-300 font-medium">
                {formatNumberFull(hoveredData.dv360)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                Meta
              </span>
              <span className="text-zinc-300 font-medium">
                {formatNumberFull(hoveredData.meta)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
