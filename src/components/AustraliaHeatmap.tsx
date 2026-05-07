"use client";

import { useState } from "react";
import { stateData, type StateData } from "@/data/impressions";

// Simplified but recognisable SVG paths for Australian states/territories
// Coordinate system: viewBox 0 0 800 720
const statePaths: Record<string, { d: string; labelX: number; labelY: number }> = {
  WA: {
    d: `M 40,95 L 295,95 L 295,130 L 330,130 L 330,370 L 295,370 L 295,580
        L 250,620 L 200,640 L 155,630 L 120,600 L 85,540 L 55,460 L 40,380
        L 32,300 L 30,220 L 35,150 Z`,
    labelX: 165,
    labelY: 370,
  },
  NT: {
    d: `M 295,95 L 500,95 L 500,370 L 330,370 L 330,130 L 295,130 Z`,
    labelX: 400,
    labelY: 230,
  },
  SA: {
    d: `M 330,370 L 500,370 L 500,440 L 560,440 L 560,570 L 510,600
        L 460,615 L 420,610 L 380,590 L 340,560 L 295,580 Z`,
    labelX: 430,
    labelY: 490,
  },
  QLD: {
    d: `M 500,95 L 700,95 L 720,140 L 730,200 L 720,260 L 700,310
        L 680,360 L 660,400 L 640,440 L 560,440 L 500,440 L 500,370
        L 500,95 Z`,
    labelX: 600,
    labelY: 270,
  },
  NSW: {
    d: `M 500,440 L 560,440 L 640,440 L 660,460 L 680,490 L 690,520
        L 695,540 L 680,560 L 650,575 L 620,585 L 580,590 L 560,570 Z`,
    labelX: 620,
    labelY: 510,
  },
  VIC: {
    d: `M 460,615 L 510,600 L 560,570 L 580,590 L 620,585 L 650,575
        L 640,600 L 620,620 L 580,635 L 540,640 L 500,635 L 470,625 Z`,
    labelX: 555,
    labelY: 610,
  },
  TAS: {
    d: `M 570,670 L 610,660 L 640,670 L 650,695 L 640,720 L 610,730
        L 580,725 L 565,705 L 565,685 Z`,
    labelX: 607,
    labelY: 698,
  },
  ACT: {
    d: `M 630,535 L 650,530 L 658,545 L 650,558 L 632,555 Z`,
    labelX: 643,
    labelY: 545,
  },
};

function getColor(total: number, maxTotal: number): string {
  const ratio = total / maxTotal;
  // Green gradient: darker = more impressions
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

export default function AustraliaHeatmap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const maxTotal = Math.max(...Object.values(stateData).map((s) => s.total));
  const hoveredData: StateData | null = hoveredState
    ? stateData[hoveredState]
    : null;

  return (
    <div className="relative">
      <svg
        viewBox="0 0 800 750"
        className="w-full h-auto"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setTooltipPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
      >
        {/* State shapes */}
        {Object.entries(statePaths).map(([abbr, { d, labelX, labelY }]) => {
          const data = stateData[abbr];
          const isHovered = hoveredState === abbr;
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
                strokeWidth={isHovered ? 2.5 : 1.5}
                className="transition-all duration-150"
                opacity={
                  hoveredState === null || isHovered ? 1 : 0.5
                }
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff"
                fontSize={abbr === "ACT" ? 10 : 16}
                fontWeight="600"
                pointerEvents="none"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
              >
                {abbr}
              </text>
              <text
                x={labelX}
                y={labelY + (abbr === "ACT" ? 12 : 20)}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#e4e4e7"
                fontSize={abbr === "ACT" ? 8 : 12}
                pointerEvents="none"
                opacity={0.85}
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
              >
                {formatNumber(data.total)}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(30, 660)">
          <text x="0" y="0" fill="#a1a1aa" fontSize="11">
            Fewer impressions
          </text>
          {["#bbf7d0", "#86efac", "#4ade80", "#22c55e", "#16a34a", "#15803d"].map(
            (color, i) => (
              <rect
                key={color}
                x={i * 30}
                y={8}
                width={28}
                height={12}
                fill={color}
                rx={2}
              />
            )
          )}
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
