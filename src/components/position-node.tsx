import { ChevronDown, ChevronRight, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AssignPeopleDialog } from "@/app/admin/components/assign-people-dialog";
import { useState } from "react";

export interface Position {
  id: number;
  title: string;
  children?: Position[];
  order: number;
  assignedPeople?: { id: number; name: string }[];
}

interface PositionNodeProps {
  position: Position;
  level: number;
  isExpanded: boolean;
  expandedPositions: Set<number>;
  onToggleExpand: (id: number) => void;
  onEdit?: (position: Position) => void;
  onDelete?: (id: number) => void;
  onAssign?: (positionId: number, personId: number) => void;
  onUnassign?: (positionId: number, personId: number) => void;
  showActions?: boolean;
}

export function PositionNode({
  position,
  level,
  isExpanded,
  expandedPositions,
  onToggleExpand,
  onEdit,
  onDelete,
  onAssign,
  onUnassign,
  showActions = true
}: PositionNodeProps) {
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const hasChildren = position.children && position.children.length > 0;
  const isNodeExpanded = expandedPositions.has(position.id);

  const handleAssign = (personId: number) => {
    if (onAssign) {
      onAssign(position.id, personId);
    }
  };

  const handleUnassign = (personId: number) => {
    if (onUnassign) {
      onUnassign(position.id, personId);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="relative">
          {/* {level > 0 && (
            <div className="absolute -top-4 left-1/2 w-px h-4 bg-gray-300" />
          )} */}
          <div className="flex flex-col items-center">
            <div className="group bg-white rounded-lg border border-gray-200 p-3 shadow-sm min-w-[200px] text-center relative">
              <span className="font-medium">{position.title}</span>
              {position.assignedPeople && position.assignedPeople.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  {position.assignedPeople.map(person => (
                    <div key={person.id}>{person.name}</div>
                  ))}
                </div>
              )}
              {showActions && (onEdit || onDelete || onAssign) && (
                <div className="absolute top-3 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="default" size="icon" className="h-6 w-6 hover:cursor-pointer">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {onEdit && (
                        <DropdownMenuItem onClick={() => onEdit(position)}>
                          Edit
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => setIsAssignDialogOpen(true)}>
                        Assign People
                      </DropdownMenuItem>
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
            {hasChildren && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleExpand(position.id)}
                className="mt-2 h-6 w-6 p-0"
              >
                {isNodeExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
        {hasChildren && isNodeExpanded && (
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {position.children?.map((child) => (
              <PositionNode
                key={child.id}
                position={child}
                level={level + 1}
                isExpanded={isExpanded}
                expandedPositions={expandedPositions}
                onToggleExpand={onToggleExpand}
                onEdit={onEdit}
                onDelete={onDelete}
                onAssign={onAssign}
                onUnassign={onUnassign}
                showActions={showActions}
              />
            ))}
          </div>
        )}
      </div>

      <AssignPeopleDialog
        isOpen={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        position={position}
        onAssign={handleAssign}
        onUnassign={handleUnassign}
      />
    </>
  );
} 