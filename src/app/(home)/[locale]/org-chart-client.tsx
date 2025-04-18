"use client";

import { OrgChart, Position } from "@/components/org-chart";
import Image from "next/image";
import { useState } from "react";

interface OrgChartClientProps {
  initialPositions: Position[];
}

export default function OrgChartClient({
  initialPositions,
}: OrgChartClientProps) {
  const getAllPositionIds = (positions: Position[]): number[] => {
    return positions.flatMap((pos) => [
      pos.id,
      ...(pos.children ? getAllPositionIds(pos.children) : []),
    ]);
  };

  const [expandedPositions, setExpandedPositions] = useState<Set<number>>(
    new Set(getAllPositionIds(initialPositions))
  );

  const toggleExpand = (positionId: number) => {
    setExpandedPositions((prev) => {
      const next = new Set(prev);
      if (next.has(positionId)) {
        next.delete(positionId);
      } else {
        next.add(positionId);
      }
      return next;
    });
  };

  return (
    <div className="mx-auto px-4 py-10 container">
      <div className="flex flex-wrap items-center gap-4 mb-6 p-2 w-fit">
        <h1 className="font-extralight text-3xl">
          Government of the Socialist Republic of Vietnam
        </h1>

        <svg
          width="50"
          height="33.5"
          viewBox="0 0 30 20"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="rounded-xl"
        >
          <rect width="30" height="20" fill="#da251d" />
          <polygon
            points="15,4 11.47,14.85 20.71,8.15 9.29,8.15 18.53,14.85"
            fill="#ff0"
          />
        </svg>
      </div>

      <OrgChart
        positions={initialPositions}
        expandedPositions={expandedPositions}
        onToggleExpand={toggleExpand}
      />
    </div>
  );
}
