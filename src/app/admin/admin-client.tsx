"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePositions } from "./positions-context";
import { ChevronDown, ChevronRight, MoreVertical } from "lucide-react";
import { useState } from "react";

interface Position {
  id: number;
  title: string;
  children?: Position[];
  order: number;
}

interface AdminClientProps {
  initialPositions: Position[];
}

interface PositionNodeProps {
  position: Position;
  level: number;
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
  onEdit: (position: Position) => void;
  onDelete: (id: number) => void;
}

function PositionNode({ position, level, isExpanded, onToggleExpand, onEdit, onDelete }: PositionNodeProps) {
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
            <div className="absolute top-3 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 hover:cursor-pointer">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(position)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(position.id)}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {hasChildren && (
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
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminClient({ initialPositions }: AdminClientProps) {
  const {
    positions,
    isCreateDialogOpen,
    isEditDialogOpen,
    selectedPosition,
    newTitle,
    setNewTitle,
    setIsCreateDialogOpen,
    setIsEditDialogOpen,
    setSelectedPosition,
    handleCreate,
    handleEdit,
    handleDelete,
    setPositions,
  } = usePositions();

  const getAllPositionIds = (positions: Position[]): number[] => {
    return positions.flatMap(pos => [
      pos.id,
      ...(pos.children ? getAllPositionIds(pos.children) : [])
    ]);
  };

  const [expandedPositions, setExpandedPositions] = useState<Set<number>>(
    new Set(getAllPositionIds(positions))
  );
  const [selectedParentId, setSelectedParentId] = useState<string>("");

  const toggleExpand = (positionId: number) => {
    setExpandedPositions(prev => {
      const next = new Set(prev);
      if (next.has(positionId)) {
        next.delete(positionId);
      } else {
        next.add(positionId);
      }
      return next;
    });
  };

  const handleCreateWithParent = () => {
    const parentId = selectedParentId === "root" ? undefined : parseInt(selectedParentId);
    handleCreate(parentId);
    setSelectedParentId("");
  };

  const renderPositionOptions = (positions: Position[], level: number = 0): React.ReactNode[] => {
    return positions.flatMap((position) => [
      <SelectItem key={position.id} value={position.id.toString()}>
        {"\u00A0".repeat(level * 2)} {position.title}
      </SelectItem>,
      ...(position.children ? renderPositionOptions(position.children, level + 1) : [])
    ]);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Positions Management</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create Position</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Position</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Position Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Parent Position (Optional)</label>
                <Select value={selectedParentId} onValueChange={setSelectedParentId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="root">None (Top Level)</SelectItem>
                    {renderPositionOptions(positions)}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateWithParent}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg p-8 bg-gray-50 min-h-[400px] flex justify-center">
        {positions
          .sort((a, b) => a.order - b.order)
          .map((position) => (
            <PositionNode
              key={position.id}
              position={position}
              level={0}
              isExpanded={expandedPositions.has(position.id)}
              onToggleExpand={toggleExpand}
              onEdit={(pos) => {
                setSelectedPosition(pos);
                setNewTitle(pos.title);
                setIsEditDialogOpen(true);
              }}
              onDelete={handleDelete}
            />
          ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Position</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Position Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Parent Position</label>
              <Select value={selectedParentId} onValueChange={setSelectedParentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select parent position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="root">None (Top Level)</SelectItem>
                  {renderPositionOptions(positions.filter(p => p.id !== selectedPosition?.id))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => {
              const parentId = selectedParentId === "root" ? undefined : parseInt(selectedParentId);
              handleEdit(parentId);
            }}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 