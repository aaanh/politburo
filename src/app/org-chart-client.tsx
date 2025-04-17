"use client";

import { OrgChart, Position } from "@/components/org-chart";
import { useState } from "react";

interface OrgChartClientProps {
  initialPositions: Position[];
}

export default function OrgChartClient({ initialPositions }: OrgChartClientProps) {
  const getAllPositionIds = (positions: Position[]): number[] => {
    return positions.flatMap(pos => [
      pos.id,
      ...(pos.children ? getAllPositionIds(pos.children) : [])
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
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Government of the Socialist Republic of Vietnam</h1>
      <OrgChart
        positions={initialPositions}
        expandedPositions={expandedPositions}
        onToggleExpand={toggleExpand}
      />
    </div>
  );
} 