import { ChevronDown, ChevronRight, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AssignPeopleDialog } from "@/app/admin/components/people/assign-people-dialog";
import { useState } from "react";
import { useI18n } from "@/contexts/i18n-context";
import { Badge } from "./ui/badge";

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
  showActions = true,
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

  const { t } = useI18n();

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="flex flex-col items-center">
            <div className="group relative bg-white shadow-sm p-3 border border-gray-200 rounded-lg w-[300px] text-center">
              <span className="font-medium">
                {t(position.title.toLowerCase().replaceAll(" ", "-"))}
              </span>
              {position.assignedPeople &&
                position.assignedPeople.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mt-2 text-gray-600 text-sm">
                    {position.assignedPeople.map((person) => (
                      <Badge variant={"secondary"} key={person.id}>
                        {person.name}
                      </Badge>
                    ))}
                  </div>
                )}
              {showActions && (onEdit || onDelete || onAssign) && (
                <div className="top-3 right-2 absolute opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="default"
                        size="icon"
                        className="w-6 h-6 hover:cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {onEdit && (
                        <DropdownMenuItem onClick={() => onEdit(position)}>
                          Edit
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => setIsAssignDialogOpen(true)}
                      >
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
                className="mt-2 p-0 w-6 h-6"
              >
                {isNodeExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        </div>
        {hasChildren && isNodeExpanded && (
          <div className="flex flex-wrap justify-center lg:justify-between gap-4 mt-4">
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
