"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { toast } from "sonner";
import {
  createPerson,
  getAllPeople,
  updatePerson,
  deletePerson,
} from "@/app/admin/actions";
import { CreatePeople } from "@/types";

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

export function PeopleProvider({
  children,
  initialPeople,
}: PeopleProviderProps) {
  const [people, setPeople] = useState<Person[]>(initialPeople);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [newName, setNewName] = useState("");

  // Memoize state setters
  const handleSetNewName = useCallback((name: string) => {
    setNewName(name);
  }, []);

  const handleSetIsCreateDialogOpen = useCallback((open: boolean) => {
    setIsCreateDialogOpen(open);
  }, []);

  const handleSetIsEditDialogOpen = useCallback((open: boolean) => {
    setIsEditDialogOpen(open);
  }, []);

  const handleSetSelectedPerson = useCallback((person: Person | null) => {
    setSelectedPerson(person);
  }, []);

  const handleCreate = useCallback(async () => {
    if (newName.trim()) {
      const personData: CreatePeople = {
        name: newName.trim(),
        profile: null,
      };
      const result = await createPerson(personData);
      if (result.success && result.data) {
        setPeople((prev) => [...prev, result.data]);
        setNewName("");
        setIsCreateDialogOpen(false);
        toast.success(`Created ${newName.trim()}`);
      }
    }
  }, [newName]);

  const handleEdit = useCallback(async () => {
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
        toast.success(`Updated ${selectedPerson.name}`);
        setNewName("");
        setIsEditDialogOpen(false);
      }
    }
  }, [selectedPerson, newName]);

  const handleDelete = useCallback(
    async (person?: Person) => {
      const personToDelete = person || selectedPerson;
      if (personToDelete) {
        const result = await deletePerson(personToDelete.id);
        if (result.success) {
          toast.success(`Deleted ${personToDelete.name}`);
          setPeople((prev) => prev.filter((p) => p.id !== personToDelete.id));
          setSelectedPerson(null);
        } else {
          toast.error("Failed to delete person");
        }
      }
    },
    [selectedPerson]
  );

  return (
    <PeopleContext.Provider
      value={{
        people,
        setPeople,
        isCreateDialogOpen,
        isEditDialogOpen,
        selectedPerson,
        newName,
        setNewName: handleSetNewName,
        setIsCreateDialogOpen: handleSetIsCreateDialogOpen,
        setIsEditDialogOpen: handleSetIsEditDialogOpen,
        setSelectedPerson: handleSetSelectedPerson,
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
