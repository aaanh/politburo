import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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
            onChange={(e) => onNameChange(e.target.value)}
          />
          <Button onClick={onSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 