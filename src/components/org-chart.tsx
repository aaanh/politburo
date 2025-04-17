"use client";

import { ChevronDown, ChevronRight, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Position {
  id: number;
  title: string;
  children?: Position[];
  order: number;
}

interface PositionNodeProps {
  position: Position;
  level: number;
  isExpanded: boolean;
  onToggleExpand?: (id: number) => void;
  onEdit?: (position: Position) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean;
}

function PositionNode({
  position,
  level,
  isExpanded,
  onToggleExpand,
  onEdit,
  onDelete,
  showActions = true
}: PositionNodeProps) {
  const hasChildren = position.children && position.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {level > 0 && (
          <div className="absolute -top-4 left-1/2 w-px h-4 bg-gray-300" />
        )}
        <div className="flex flex-col items-center">
          <div className="group bg-white rounded-lg border border-gray-200 p-3 shadow-sm min-w-[200px] text-center relative">
            <span className="font-medium">{position.title}</span>
            {showActions && (onEdit || onDelete) && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onEdit && (
                      <DropdownMenuItem onClick={() => onEdit(position)}>
                        Edit
                      </DropdownMenuItem>
                    )}
                    {onDelete && (
                      <DropdownMenuItem
                        onClick={() => onDelete(position.id)}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
          {hasChildren && onToggleExpand && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleExpand(position.id)}
              className="mt-2 h-6 w-6 p-0"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
      {hasChildren && isExpanded && (
        <div className="flex gap-8 mt-4">
          {position.children?.map((child) => (
            <PositionNode
              key={child.id}
              position={child}
              level={level + 1}
              isExpanded={isExpanded}
              onToggleExpand={onToggleExpand}
              onEdit={onEdit}
              onDelete={onDelete}
              showActions={showActions}
            />
          ))}
        </div>
      )}
    </div>
  );
}

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
    <div className="border rounded-lg p-8 bg-gray-50 min-h-[400px] flex justify-center">
      {positions
        .sort((a, b) => a.order - b.order)
        .map((position) => (
          <PositionNode
            key={position.id}
            position={position}
            level={0}
            isExpanded={expandedPositions.has(position.id)}
            onToggleExpand={onToggleExpand}
            onEdit={onEdit}
            onDelete={onDelete}
            showActions={showActions}
          />
        ))}
    </div>
  );
} 