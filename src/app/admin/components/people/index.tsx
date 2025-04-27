"use client";

import { usePeople } from "@/contexts/people-context";
import { useState, useMemo, useCallback } from "react";
import { CreatePersonDialog } from "./create-person-dialog";
import { EditPersonDialog } from "./edit-person-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePositions } from "@/contexts/positions-context";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type SortField = "name" | "position";
type SortOrder = "asc" | "desc";

export default function People() {
  const {
    people,
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
  } = usePeople();

  const { positions } = usePositions();
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Memoize the position mapping function
  const getPersonPosition = useCallback(
    (personId: number) => {
      const findInPosition = (position: any): string | null => {
        if (position.assignedPeople?.some((p: any) => p.id === personId)) {
          return position.title;
        }
        if (position.children) {
          for (const child of position.children) {
            const found = findInPosition(child);
            if (found) return found;
          }
        }
        return null;
      };

      for (const position of positions) {
        const found = findInPosition(position);
        if (found) return found;
      }
      return "Not assigned";
    },
    [positions]
  );

  // Create a memoized map of person IDs to their positions for quick lookup
  const personPositionsMap = useMemo(() => {
    const map = new Map<number, string>();
    people.forEach((person) => {
      map.set(person.id, getPersonPosition(person.id));
    });
    return map;
  }, [people, getPersonPosition]);

  const handleSort = useCallback(
    (field: SortField) => {
      setSortField((prev) => {
        if (prev === field) {
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          return field;
        }
        setSortOrder("asc");
        return field;
      });
    },
    [sortOrder]
  );

  // Memoize the sorted people array to prevent recalculation on every render
  const sortedPeople = useMemo(() => {
    return [...people].sort((a, b) => {
      const aValue =
        sortField === "name"
          ? a.name
          : personPositionsMap.get(a.id) || "Not assigned";
      const bValue =
        sortField === "name"
          ? b.name
          : personPositionsMap.get(b.id) || "Not assigned";
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [people, sortField, sortOrder, personPositionsMap]);

  const handleEditPerson = useCallback(
    (person: any) => {
      setSelectedPerson(person);
      setNewName(person.name);
      setIsEditDialogOpen(true);
    },
    [setSelectedPerson, setNewName, setIsEditDialogOpen]
  );

  return (
    <div className="flex flex-col mx-auto py-6 h-[calc(100vh-14rem)] container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-extralight text-4xl">People Management</h1>
        <CreatePersonDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          newName={newName}
          onNameChange={setNewName}
          onCreate={handleCreate}
        />
      </div>

      <div className="flex flex-col flex-1 bg-gray-50 border rounded-lg overflow-hidden">
        <div className="p-2 overflow-auto">
          <Table>
            <TableHeader className="top-0 sticky bg-gray-50">
              <TableRow>
                <TableHead>
                  <button
                    onClick={() => handleSort("name")}
                    className="group flex items-center gap-1 p-2 hover:cursor-pointer"
                  >
                    Name
                    <ArrowUpDown className="hidden group-hover:inline-block w-4 h-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("position")}
                    className="group flex items-center gap-1 p-2 hover:cursor-pointer"
                  >
                    Current Position
                    <ArrowUpDown className="hidden group-hover:inline-block w-4 h-4" />
                  </button>
                </TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPeople.map((person) => (
                <TableRow key={person.id}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        personPositionsMap.get(person.id) === "Not assigned"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {personPositionsMap.get(person.id)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPerson(person)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(person)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <EditPersonDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        newName={newName}
        onNameChange={setNewName}
        selectedPerson={selectedPerson}
        onSave={handleEdit}
      />
    </div>
  );
}
