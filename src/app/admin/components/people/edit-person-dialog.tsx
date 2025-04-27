import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCallback } from "react";

interface Person {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface EditPersonDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newName: string;
  onNameChange: (name: string) => void;
  selectedPerson: Person | null;
  onSave: () => void;
}

export function EditPersonDialog({
  isOpen,
  onOpenChange,
  newName,
  onNameChange,
  selectedPerson,
  onSave,
}: EditPersonDialogProps) {
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onNameChange(e.target.value);
    },
    [onNameChange]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Person</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Person Name"
            value={newName}
            onChange={handleNameChange}
          />
          <Button onClick={onSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
