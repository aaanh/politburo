"use client";

import { Position, PositionNode } from "@/components/position-node";

export type { Position };

interface OrgChartProps {
  positions: Position[];
  expandedPositions?: Set<number>;
  onToggleExpand?: (id: number) => void;
  onEdit?: (position: Position) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean;
}

export function OrgChart({
  positions,
  expandedPositions = new Set(),
  onToggleExpand,
  onEdit,
  onDelete,
  showActions = true
}: OrgChartProps) {
  return (
    <div className="border rounded-lg p-8 bg-gray-50 min-h-[400px] flex justify-center flex-wrap">
      {positions
        .sort((a, b) => a.order - b.order)
        .map((position) => (
          <PositionNode
            key={position.id}
            position={position}
            level={0}
            isExpanded={expandedPositions.has(position.id)}
            expandedPositions={expandedPositions}
            onToggleExpand={onToggleExpand || (() => { })}
            onEdit={onEdit}
            onDelete={onDelete}
            showActions={showActions}
          />
        ))}
    </div>
  );
} 