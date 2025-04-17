"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import {
  createPosition,
  getAllPositions,
  updatePosition,
  deletePosition,
  addChildPosition,
  assignPerson,
  unassignPerson,
} from "../actions";

interface Position {
  id: number;
  title: string;
  order: number;
  children?: Position[];
  assignedPeople?: { id: number; name: string }[];
}

interface PositionsContextType {
  positions: Position[];
  setPositions: (positions: Position[]) => void;
  isCreateDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isAssignDialogOpen: boolean;
  selectedPosition: Position | null;
  newTitle: string;
  setNewTitle: (title: string) => void;
  setIsCreateDialogOpen: (open: boolean) => void;
  setIsEditDialogOpen: (open: boolean) => void;
  setIsAssignDialogOpen: (open: boolean) => void;
  setSelectedPosition: (position: Position | null) => void;
  handleCreate: (parentId?: number) => Promise<void>;
  handleEdit: (parentId?: number) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  handleAddChild: (parentId: number, childId: number) => Promise<void>;
  handleAssign: (positionId: number, personId: number) => Promise<void>;
  handleUnassign: (positionId: number, personId: number) => Promise<void>;
}

const PositionsContext = createContext<PositionsContextType | undefined>(undefined);

interface PositionsProviderProps {
  children: ReactNode;
  initialPositions: Position[];
}

export function PositionsProvider({ children, initialPositions }: PositionsProviderProps) {
  const [positions, setPositions] = useState<Position[]>(initialPositions);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const loadPositions = async () => {
    const result = await getAllPositions();
    if (result.success) {
      const positionsWithOrder = (result.data || []).map((pos, index) => ({
        ...pos,
        order: index
      }));
      setPositions(positionsWithOrder);
    } else {
      toast.error("Failed to load positions");
    }
  };

  const handleCreate = async (parentId?: number) => {
    if (!newTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    const result = await createPosition(newTitle, parentId);
    if (result.success) {
      setIsCreateDialogOpen(false);
      setNewTitle("");
      if (result.data) {
        const newPosition = {
          ...result.data,
          order: positions.length
        };

        if (parentId) {
          // Add to parent's children
          setPositions(prevPositions => {
            const updatePositionWithChildren = (positions: Position[]): Position[] => {
              return positions.map(position => {
                if (position.id === parentId) {
                  return {
                    ...position,
                    children: [...(position.children || []), newPosition]
                  };
                }
                if (position.children) {
                  return {
                    ...position,
                    children: updatePositionWithChildren(position.children)
                  };
                }
                return position;
              });
            };
            return updatePositionWithChildren(prevPositions);
          });
        } else {
          // Add as top-level position
          setPositions([...positions, newPosition]);
        }
      }
      toast.success("Position created successfully");
    } else {
      toast.error("Failed to create position");
    }
  };

  const handleEdit = async (parentId?: number) => {
    if (!selectedPosition || !newTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    const result = await updatePosition(selectedPosition.id, newTitle);
    if (result.success) {
      // If parent changed, update the hierarchy
      if (parentId !== undefined) {
        const currentParent = positions.find(p =>
          p.children?.some(child => child.id === selectedPosition.id)
        );
        const currentParentId = currentParent?.id;

        if (currentParentId !== parentId) {
          if (currentParentId) {
            // Remove from current parent
            await addChildPosition(currentParentId, selectedPosition.id);
          }
          if (parentId) {
            // Add to new parent
            await addChildPosition(parentId, selectedPosition.id);
          }
        }
      }

      setIsEditDialogOpen(false);
      setNewTitle("");
      setPositions(
        positions.map((p) =>
          p.id === selectedPosition.id ? { ...p, title: newTitle } : p
        )
      );
      setSelectedPosition(null);
      toast.success("Position updated successfully");
    } else {
      toast.error("Failed to update position");
    }
  };

  const handleDelete = async (id: number) => {
    const result = await deletePosition(id);
    if (result.success) {
      setPositions(positions.filter((p) => p.id !== id));
      toast.success("Position deleted successfully");
    } else {
      toast.error("Failed to delete position");
    }
  };

  const handleAddChild = async (parentId: number, childId: number) => {
    const result = await addChildPosition(parentId, childId);
    if (result.success) {
      setPositions(prevPositions => {
        const findPosition = (positions: Position[], id: number): Position | null => {
          for (const position of positions) {
            if (position.id === id) return position;
            if (position.children) {
              const found = findPosition(position.children, id);
              if (found) return found;
            }
          }
          return null;
        };

        const childPosition = findPosition(prevPositions, childId);
        if (!childPosition) return prevPositions;

        // Remove from current parent
        const removeFromParent = (positions: Position[]): Position[] => {
          return positions.map(position => {
            if (position.children) {
              return {
                ...position,
                children: position.children.filter(child => child.id !== childId)
              };
            }
            return position;
          });
        };

        // Add to new parent
        const updatePositionWithChildren = (positions: Position[]): Position[] => {
          return positions.map(position => {
            if (position.id === parentId) {
              return {
                ...position,
                children: [...(position.children || []), childPosition]
              };
            }
            if (position.children) {
              return {
                ...position,
                children: updatePositionWithChildren(position.children)
              };
            }
            return position;
          });
        };

        const positionsWithoutChild = removeFromParent(prevPositions);
        return updatePositionWithChildren(positionsWithoutChild);
      });
      toast.success("Child position added successfully");
    } else {
      toast.error("Failed to add child position");
    }
  };

  const handleAssign = async (positionId: number, personId: number) => {
    const result = await assignPerson(positionId, personId);
    if (result.success) {
      await loadPositions();
    }
  };

  const handleUnassign = async (positionId: number, personId: number) => {
    const result = await unassignPerson(positionId, personId);
    if (result.success) {
      await loadPositions();
    }
  };

  return (
    <PositionsContext.Provider
      value={{
        positions,
        setPositions,
        isCreateDialogOpen,
        isEditDialogOpen,
        isAssignDialogOpen,
        selectedPosition,
        newTitle,
        setNewTitle,
        setIsCreateDialogOpen,
        setIsEditDialogOpen,
        setIsAssignDialogOpen,
        setSelectedPosition,
        handleCreate,
        handleEdit,
        handleDelete,
        handleAddChild,
        handleAssign,
        handleUnassign,
      }}
    >
      {children}
    </PositionsContext.Provider>
  );
}

export function usePositions() {
  const context = useContext(PositionsContext);
  if (context === undefined) {
    throw new Error("usePositions must be used within a PositionsProvider");
  }
  return context;
} 