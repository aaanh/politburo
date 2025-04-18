import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CreatePersonDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newName: string;
  onNameChange: (name: string) => void;
  onCreate: () => void;
}

export function CreatePersonDialog({
  isOpen,
  onOpenChange,
  newName,
  onNameChange,
  onCreate,
}: CreatePersonDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Create Person</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Person</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Person Name"
            value={newName}
            onChange={(e) => onNameChange(e.target.value)}
          />
          <Button onClick={onCreate}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 