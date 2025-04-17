import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Position } from "@/components/position-node";
import { useState, useEffect } from "react";
import { getAllPeople, createPerson } from "../actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AssignPeopleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  position: Position;
  onAssign: (personId: number) => void;
  onUnassign: (personId: number) => void;
}

interface Person {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export function AssignPeopleDialog({
  isOpen,
  onOpenChange,
  position,
  onAssign,
  onUnassign,
}: AssignPeopleDialogProps) {
  const [selectedPersonId, setSelectedPersonId] = useState<string>("");
  const [people, setPeople] = useState<Person[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPersonName, setNewPersonName] = useState("");

  const loadPeople = async () => {
    const result = await getAllPeople();
    if (result.success && result.data) {
      setPeople(result.data);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const handleCreatePerson = async () => {
    if (newPersonName.trim()) {
      const result = await createPerson(newPersonName.trim());
      if (result.success) {
        await loadPeople();
        setNewPersonName("");
        setIsCreateDialogOpen(false);
      }
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign People to {position.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Select Person</label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  Create New
                </Button>
              </div>
              <Select value={selectedPersonId} onValueChange={setSelectedPersonId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a person" />
                </SelectTrigger>
                <SelectContent>
                  {people.map((person) => (
                    <SelectItem key={person.id} value={person.id.toString()}>
                      {person.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Assigned People</h3>
              <div className="space-y-2">
                {position.assignedPeople?.map((person) => (
                  <div key={person.id} className="flex items-center justify-between">
                    <span>{person.name}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onUnassign(person.id)}
                    >
                      Unassign
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Button
              onClick={() => {
                if (selectedPersonId) {
                  onAssign(parseInt(selectedPersonId));
                  setSelectedPersonId("");
                }
              }}
            >
              Assign
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Person</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
                placeholder="Enter person's name"
              />
            </div>
            <Button onClick={handleCreatePerson}>Create</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 