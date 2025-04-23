"use client";

import { usePeople } from "@/contexts/people-context";
import { useState } from "react";
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

  const getPersonPosition = (personId: number) => {
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
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedPeople = [...people].sort((a, b) => {
    const aValue = sortField === "name" ? a.name : getPersonPosition(a.id);
    const bValue = sortField === "name" ? b.name : getPersonPosition(b.id);
    return sortOrder === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  return (
    <div className="mx-auto py-10 container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-extralight text-4xl">People Management</h1>
        <CreatePersonDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          newName={newName}
          onNameChange={setNewName}
          onCreate={handleCreate}
        />
      </div>

      <div className="bg-gray-50 p-8 border rounded-lg">
        <Table>
          <TableHeader>
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
                      getPersonPosition(person.id) === "Not assigned"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {getPersonPosition(person.id)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedPerson(person);
                        setNewName(person.name);
                        setIsEditDialogOpen(true);
                      }}
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
