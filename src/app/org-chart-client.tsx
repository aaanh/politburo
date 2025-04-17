"use client";

import { OrgChart, Position } from "@/components/org-chart";
import { useState } from "react";

interface OrgChartClientProps {
  initialPositions: Position[];
}

export default function OrgChartClient({ initialPositions }: OrgChartClientProps) {
  const [expandedPositions, setExpandedPositions] = useState<Set<number>>(
    new Set(initialPositions.map((pos) => pos.id))
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
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Organization Chart</h1>
      <OrgChart
        positions={initialPositions}
        expandedPositions={expandedPositions}
        onToggleExpand={toggleExpand}
      />
    </div>
  );
} 