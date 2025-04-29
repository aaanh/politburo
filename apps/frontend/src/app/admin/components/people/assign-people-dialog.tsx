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
import { useState, useEffect, useCallback, useMemo } from "react";
import { getAllPeople, createPerson, getAllPositions } from "../../actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreatePeople } from "@/types";
import { CreatePeopleSchema } from "@/types/zod-schema";
import { Preahvihear } from "next/font/google";

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
  const [allPositions, setAllPositions] = useState<Position[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPerson, setNewPerson] = useState<CreatePeople | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadPeople = useCallback(async () => {
    setIsLoading(true);
    try {
      const [peopleResult, positionsResult] = await Promise.all([
        getAllPeople(),
        getAllPositions(),
      ]);
      if (peopleResult.success && peopleResult.data) {
        setPeople(peopleResult.data);
      }
      if (positionsResult.success && positionsResult.data) {
        setAllPositions(positionsResult.data);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadPeople();
    }
  }, [isOpen, loadPeople]);

  const getPersonPositions = useCallback(
    (personId: number) => {
      const checkPosition = (pos: Position): boolean => {
        if (pos.assignedPeople?.some((p) => p.id === personId)) {
          return true;
        }
        return pos.children?.some(checkPosition) || false;
      };
      return allPositions.filter(checkPosition);
    },
    [allPositions]
  );

  // Memoize person positions to avoid recalculation on every render
  const personPositionsMap = useMemo(() => {
    const map = new Map<number, boolean>();
    people.forEach((person) => {
      map.set(person.id, getPersonPositions(person.id).length > 0);
    });
    return map;
  }, [people, getPersonPositions]);

  const handleCreatePerson = useCallback(async () => {
    const person = CreatePeopleSchema.safeParse(newPerson).data;

    if (person) {
      const result = await createPerson({
        name: person.name.trim(),
        profile: person.profile,
      });
      if (result.success) {
        toast(`Added ${person.name}`, {
          description: `Executed at ${new Date().toLocaleTimeString()}`,
        });
        await loadPeople();
        setNewPerson(null);
      }
    }
  }, [newPerson, loadPeople]);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPerson((prev) => ({
        name: e.target.value,
        profile: prev?.profile ?? null,
      }));
    },
    []
  );

  const handleSelectChange = useCallback((value: string) => {
    setSelectedPersonId(value);
  }, []);

  const handleAssignClick = useCallback(() => {
    if (selectedPersonId) {
      onAssign(parseInt(selectedPersonId));
      setSelectedPersonId("");
    }
  }, [selectedPersonId, onAssign]);

  // Filter people who are not assigned and those who are assigned
  const unassignedPeople = useMemo(
    () => people.filter((person) => !personPositionsMap.get(person.id)),
    [people, personPositionsMap]
  );

  const assignedPeople = useMemo(
    () => people.filter((person) => personPositionsMap.get(person.id)),
    [people, personPositionsMap]
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign People to {position.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-medium text-sm">Select Person</label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  Create New
                </Button>
              </div>
              <Select
                value={selectedPersonId}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a person" />
                </SelectTrigger>
                <SelectContent>
                  {unassignedPeople.map((person) => (
                    <SelectItem key={person.id} value={person.id.toString()}>
                      {person.name}
                    </SelectItem>
                  ))}
                  {assignedPeople.length > 0 && (
                    <>
                      <SelectItem
                        value="divider"
                        disabled
                        className="opacity-50"
                      >
                        ───────Assigned────────
                      </SelectItem>
                      {assignedPeople.map((person) => (
                        <SelectItem
                          key={person.id}
                          value={person.id.toString()}
                        >
                          {person.name}
                        </SelectItem>
                      ))}
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Assigned People</h3>
              <div className="space-y-2">
                {position.assignedPeople?.map((person) => (
                  <div
                    key={person.id}
                    className="flex justify-between items-center"
                  >
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
            <Button onClick={handleAssignClick}>Assign</Button>
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
                value={newPerson?.name || ""}
                onChange={handleNameChange}
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
