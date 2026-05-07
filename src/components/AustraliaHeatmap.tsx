"use client";

import { useState, useMemo, useCallback } from "react";
import { geoPath, geoMercator } from "d3-geo";
import { stateData, type StateData, type Metric } from "@/data/impressions";
import { cityData, type CityData } from "@/data/cities";
import australiaGeo from "@/data/australiaGeo";
import type { Feature, FeatureCollection, Geometry } from "geojson";

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

function getColor(value: number, maxValue: number, metric: Metric): string {
  const ratio = value / maxValue;
  if (metric === "clicks") {
    if (ratio > 0.8) return "#1e40af";
    if (ratio > 0.6) return "#2563eb";
    if (ratio > 0.4) return "#3b82f6";
    if (ratio > 0.2) return "#60a5fa";
    if (ratio > 0.05) return "#93c5fd";
    return "#bfdbfe";
  }
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

function getStateValue(data: StateData, metric: Metric): number {
  return metric === "impressions" ? data.total : data.clicks.total;
}

function getCityValue(data: CityData, metric: Metric): number {
  return metric === "impressions" ? data.total : data.totalClicks;
}

function getDotRadius(value: number, maxValue: number): number {
  const ratio = value / maxValue;
  return 3 + ratio * 14;
}

const WIDTH = 800;
const HEIGHT = 750;

type HoverTarget =
  | { type: "state"; abbr: string }
  | { type: "city"; data: CityData }
  | null;

interface Props {
  metric: Metric;
  stateDataOverride?: Record<string, StateData>;
}

export default function AustraliaHeatmap({ metric, stateDataOverride }: Props) {
  const activeStateData = stateDataOverride || stateData;
  const [hovered, setHovered] = useState<HoverTarget>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const maxStateValue = Math.max(
    ...Object.values(activeStateData).map((s) => getStateValue(s, metric))
  );
  const maxCityValue = Math.max(
    ...cityData.map((c) => getCityValue(c, metric))
  );

  const { pathGenerator, centroids, projection } = useMemo(() => {
    const geo = australiaGeo as FeatureCollection;
    const proj = geoMercator().fitSize([WIDTH, HEIGHT - 60], geo);
    const pathGen = geoPath().projection(proj);

    const cents: Record<string, [number, number]> = {};
    for (const feature of geo.features) {
      const abbr = nameToAbbr[feature.properties?.name] || "";
      const centroid = pathGen.centroid(feature as Feature<Geometry>);
      if (abbr && centroid && isFinite(centroid[0])) {
        cents[abbr] = centroid;
      }
    }

    return { pathGenerator: pathGen, centroids: cents, projection: proj };
  }, []);

  const projectedCities = useMemo(() => {
    return cityData
      .map((city) => {
        const point = projection([city.lng, city.lat]);
        if (!point) return null;
        return { ...city, x: point[0], y: point[1] };
      })
      .filter(Boolean) as (CityData & { x: number; y: number })[];
  }, [projection]);

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
  const hoveredStateAbbr = hovered?.type === "state" ? hovered.abbr : null;
  const hoveredStateData: StateData | null = hoveredStateAbbr
    ? activeStateData[hoveredStateAbbr]
    : null;
  const hoveredCity = hovered?.type === "city" ? hovered.data : null;

  const metricLabel = metric === "impressions" ? "impressions" : "clicks";
  const colorScale =
    metric === "impressions"
      ? ["#bbf7d0", "#86efac", "#4ade80", "#22c55e", "#16a34a", "#15803d"]
      : ["#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1e40af"];

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
      >
        {/* State shapes */}
        {geo.features.map((feature) => {
          const name = feature.properties?.name as string;
          const abbr = nameToAbbr[name];
          if (!abbr || !activeStateData[abbr]) return null;

          const data = activeStateData[abbr];
          const value = getStateValue(data, metric);
          const isHovered = hoveredStateAbbr === abbr;
          const d = pathGenerator(feature as Feature<Geometry>);
          if (!d) return null;

          const centroid = centroids[abbr];

          return (
            <g
              key={abbr}
              onMouseEnter={() => setHovered({ type: "state", abbr })}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <path
                d={d}
                fill={getColor(value, maxStateValue, metric)}
                stroke={isHovered ? "#ffffff" : "#0a0a0f"}
                strokeWidth={isHovered ? 2 : 1}
                className="transition-all duration-150"
                opacity={hovered === null || isHovered ? 1 : 0.6}
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
                    {formatNumber(value)}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* ACT label */}
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
              {formatNumber(getStateValue(activeStateData.ACT, metric))}
            </text>
          </g>
        )}

        {/* City dots */}
        {projectedCities.map((city) => {
          const value = getCityValue(city, metric);
          if (value === 0) return null;
          const r = getDotRadius(value, maxCityValue);
          const isCityHovered = hoveredCity?.city === city.city;
          return (
            <g
              key={`${city.city}-${city.lat}`}
              onMouseEnter={() => setHovered({ type: "city", data: city })}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <circle
                cx={city.x}
                cy={city.y}
                r={r}
                fill={isCityHovered ? "#f59e0b" : "#f97316"}
                fillOpacity={isCityHovered ? 0.95 : 0.7}
                stroke={isCityHovered ? "#fff" : "#fdba74"}
                strokeWidth={isCityHovered ? 2 : 0.5}
                className="transition-all duration-150"
              />
              {r > 8 && (
                <text
                  x={city.x}
                  y={city.y - r - 4}
                  textAnchor="middle"
                  fill="#fef3c7"
                  fontSize={9}
                  fontWeight="500"
                  pointerEvents="none"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}
                >
                  {city.city}
                </text>
              )}
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(30, ${HEIGHT - 55})`}>
          <text x="0" y="0" fill="#a1a1aa" fontSize="11">
            State fill: {metricLabel} volume
          </text>
          {colorScale.map((color, i) => (
            <rect
              key={color}
              x={i * 28}
              y={6}
              width={26}
              height={10}
              fill={color}
              rx={2}
            />
          ))}
        </g>
        <g transform={`translate(30, ${HEIGHT - 25})`}>
          <circle cx={6} cy={0} r={4} fill="#f97316" fillOpacity={0.7} />
          <text
            x={16}
            y="0"
            fill="#a1a1aa"
            fontSize="11"
            dominantBaseline="middle"
          >
            City dots: sized by city {metricLabel} (Google)
          </text>
        </g>
      </svg>

      {/* State tooltip */}
      {hoveredStateData && (
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
            {hoveredStateData.name}
          </div>
          <div className="text-xs text-zinc-400 mb-2">
            Total: {formatNumberFull(getStateValue(hoveredStateData, metric))}{" "}
            {metricLabel}
          </div>
          {metric === "impressions" ? (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                  Google
                </span>
                <span className="text-zinc-300 font-medium">
                  {formatNumberFull(hoveredStateData.google)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                  Meta
                </span>
                <span className="text-zinc-300 font-medium">
                  {formatNumberFull(hoveredStateData.meta)}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                  Google
                </span>
                <span className="text-zinc-300 font-medium">
                  {formatNumberFull(hoveredStateData.clicks.google)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                  Meta
                </span>
                <span className="text-zinc-300 font-medium">
                  {formatNumberFull(hoveredStateData.clicks.meta)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* City tooltip */}
      {hoveredCity && (
        <div
          className="absolute pointer-events-none z-50 bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg shadow-2xl px-4 py-3 min-w-[220px]"
          style={{
            left: tooltipPos.x + 16,
            top: tooltipPos.y - 10,
            transform:
              tooltipPos.x > 500 ? "translateX(-110%)" : "translateX(0)",
          }}
        >
          <div className="font-semibold text-white text-sm">
            {hoveredCity.city}
          </div>
          <div className="text-xs text-zinc-500 mb-2">{hoveredCity.state}</div>
          <div className="text-xs text-zinc-400 mb-2">
            {metric === "impressions"
              ? `Total: ${formatNumberFull(hoveredCity.total)} impressions`
              : `Total: ${formatNumberFull(hoveredCity.totalClicks)} clicks`}
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                Google
              </span>
              <span className="text-zinc-300 font-medium">
                {metric === "impressions"
                  ? formatNumberFull(hoveredCity.google)
                  : formatNumberFull(hoveredCity.googleClicks)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
