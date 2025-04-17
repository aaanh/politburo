"use client";

import { usePositions } from "./positions-context";
import { Position, PositionNode } from "@/components/position-node";
import { useState } from "react";
import { CreatePositionDialog } from "./create-position-dialog";
import { EditPositionDialog } from "./edit-position-dialog";

interface AdminClientProps {
  initialPositions: Position[];
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
    handleAssign,
    handleUnassign,
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

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Positions Management</h1>
        <CreatePositionDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          newTitle={newTitle}
          onTitleChange={setNewTitle}
          selectedParentId={selectedParentId}
          onParentIdChange={setSelectedParentId}
          positions={positions}
          onCreate={handleCreateWithParent}
        />
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
              expandedPositions={expandedPositions}
              onToggleExpand={toggleExpand}
              onEdit={(pos) => {
                setSelectedPosition(pos);
                setNewTitle(pos.title);
                setIsEditDialogOpen(true);
              }}
              onDelete={handleDelete}
              onAssign={handleAssign}
              onUnassign={handleUnassign}
            />
          ))}
      </div>

      <EditPositionDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        newTitle={newTitle}
        onTitleChange={setNewTitle}
        selectedPosition={selectedPosition}
        selectedParentId={selectedParentId}
        onParentIdChange={setSelectedParentId}
        positions={positions}
        onSave={() => {
          const parentId = selectedParentId === "root" ? undefined : parseInt(selectedParentId);
          handleEdit(parentId);
          setSelectedParentId("");
        }}
      />
    </div>
  );
} 