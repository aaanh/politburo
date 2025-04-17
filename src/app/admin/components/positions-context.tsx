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
  handleEdit: () => Promise<void>;
  handleDelete: () => Promise<void>;
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

  const handleCreate = async (parentId?: number) => {
    if (newTitle.trim()) {
      const result = await createPosition(newTitle.trim(), parentId);
      if (result.success && result.data) {
        const newPosition: Position = {
          ...result.data,
          order: positions.length,
          children: [],
          assignedPeople: []
        };
        if (parentId) {
          setPositions(prev => prev.map(pos =>
            pos.id === parentId
              ? { ...pos, children: [...(pos.children || []), newPosition] }
              : pos
          ));
        } else {
          setPositions(prev => [...prev, newPosition]);
        }
        setNewTitle("");
        setIsCreateDialogOpen(false);
      }
    }
  };

  const handleEdit = async () => {
    if (selectedPosition && newTitle.trim()) {
      const result = await updatePosition(selectedPosition.id, newTitle.trim());
      if (result.success && result.data) {
        setPositions(prev => prev.map(pos =>
          pos.id === selectedPosition.id
            ? { ...pos, title: newTitle.trim() }
            : pos
        ));
        setNewTitle("");
        setIsEditDialogOpen(false);
      }
    }
  };

  const handleDelete = async () => {
    if (selectedPosition) {
      const result = await deletePosition(selectedPosition.id);
      if (result.success) {
        setPositions(prev => prev.filter(pos => pos.id !== selectedPosition.id));
        setSelectedPosition(null);
      }
    }
  };

  const handleAddChild = async (parentId: number, childId: number) => {
    const result = await addChildPosition(parentId, childId);
    if (result.success) {
      setPositions(prev => prev.map(pos => {
        if (pos.id === parentId) {
          const child = prev.find(p => p.id === childId);
          if (child) {
            return { ...pos, children: [...(pos.children || []), child] };
          }
        }
        return pos;
      }));
    }
  };

  const handleAssign = async (positionId: number, personId: number) => {
    const result = await assignPerson(positionId, personId);
    if (result.success) {
      setPositions(prev => prev.map(pos => {
        if (pos.id === positionId) {
          return {
            ...pos,
            assignedPeople: [...(pos.assignedPeople || []), { id: personId, name: "New Person" }]
          };
        }
        return pos;
      }));
    }
  };

  const handleUnassign = async (positionId: number, personId: number) => {
    const result = await unassignPerson(positionId, personId);
    if (result.success) {
      setPositions(prev => prev.map(pos => {
        if (pos.id === positionId) {
          return {
            ...pos,
            assignedPeople: pos.assignedPeople?.filter(p => p.id !== personId)
          };
        }
        return pos;
      }));
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