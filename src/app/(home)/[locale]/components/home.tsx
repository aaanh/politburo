"use client";

import { OrgChart, Position } from "@/components/org-chart";
import { useI18n } from "@/contexts/i18n-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface HomeProps {
  initialPositions: Position[];
}

export default function Home({ initialPositions }: HomeProps) {
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

  const expandAll = () => {
    setExpandedPositions(new Set(getAllPositionIds(initialPositions)));
  };

  const collapseAll = () => {
    setExpandedPositions(new Set());
  };

  const { t } = useI18n();

  return (
    <div className="flex flex-col mx-auto mt-4 py-6 h-[calc(100vh-8rem)] container">
      <div className="flex flex-wrap items-center gap-4 mb-4 p-2">
        <h1 className="font-extralight text-lg md:text-3xl text-center">
          {t("government-of-the-socialist-republic-of-vietnam")}
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

        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={expandAll}
            className="flex items-center gap-1"
          >
            <ChevronDown className="w-4 h-4" />
            {t("expand-all") || "Expand All"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={collapseAll}
            className="flex items-center gap-1"
          >
            <ChevronUp className="w-4 h-4" />
            {t("collapse-all") || "Collapse All"}
          </Button>
        </div>
      </div>

      <div className="flex-1 shadow border md:rounded-xl overflow-auto">
        <OrgChart
          positions={initialPositions}
          expandedPositions={expandedPositions}
          onToggleExpand={toggleExpand}
        />
      </div>
    </div>
  );
}
