"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import {
  createPerson,
  getAllPeople,
  updatePerson,
  deletePerson,
} from "@/app/admin/actions";

interface Person {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PeopleContextType {
  people: Person[];
  setPeople: (people: Person[]) => void;
  isCreateDialogOpen: boolean;
  isEditDialogOpen: boolean;
  selectedPerson: Person | null;
  newName: string;
  setNewName: (name: string) => void;
  setIsCreateDialogOpen: (open: boolean) => void;
  setIsEditDialogOpen: (open: boolean) => void;
  setSelectedPerson: (person: Person | null) => void;
  handleCreate: () => Promise<void>;
  handleEdit: () => Promise<void>;
  handleDelete: (person?: Person) => Promise<void>;
}

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

interface PeopleProviderProps {
  children: ReactNode;
  initialPeople: Person[];
}

export function PeopleProvider({ children, initialPeople }: PeopleProviderProps) {
  const [people, setPeople] = useState<Person[]>(initialPeople);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [newName, setNewName] = useState("");

  const handleCreate = async () => {
    if (newName.trim()) {
      const result = await createPerson(newName.trim());
      if (result.success && result.data) {
        setPeople((prev) => [...prev, result.data]);
        setNewName("");
        setIsCreateDialogOpen(false);
      }
    }
  };

  const handleEdit = async () => {
    if (selectedPerson && newName.trim()) {
      const result = await updatePerson(selectedPerson.id, newName.trim());
      if (result.success && result.data) {
        setPeople((prev) =>
          prev.map((person) =>
            person.id === selectedPerson.id
              ? { ...person, name: newName.trim() }
              : person
          )
        );
        setNewName("");
        setIsEditDialogOpen(false);
      }
    }
  };

  const handleDelete = async (person?: Person) => {
    const personToDelete = person || selectedPerson;
    if (personToDelete) {
      const result = await deletePerson(personToDelete.id);
      if (result.success) {
        setPeople((prev) => prev.filter((p) => p.id !== personToDelete.id));
        setSelectedPerson(null);
        toast.success("Person deleted successfully");
      } else {
        toast.error("Failed to delete person");
      }
    }
  };

  return (
    <PeopleContext.Provider
      value={{
        people,
        setPeople,
        isCreateDialogOpen,
        isEditDialogOpen,
        selectedPerson,
        newName,
        setNewName,
        setIsCreateDialogOpen,
        setIsEditDialogOpen,
        setSelectedPerson,
        handleCreate,
        handleEdit,
        handleDelete,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
}

export function usePeople() {
  const context = useContext(PeopleContext);
  if (context === undefined) {
    throw new Error("usePeople must be used within a PeopleProvider");
  }
  return context;
} 