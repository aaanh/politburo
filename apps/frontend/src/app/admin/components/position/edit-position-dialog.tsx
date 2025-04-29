import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Position } from "@/components/position-node";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useCallback } from "react";

interface EditPositionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newTitle: string;
  onTitleChange: (title: string) => void;
  selectedPosition: Position | null;
  selectedParentId: string;
  onParentIdChange: (id: string) => void;
  positions: Position[];
  onSave: () => void;
}

export function EditPositionDialog({
  isOpen,
  onOpenChange,
  newTitle,
  onTitleChange,
  selectedPosition,
  selectedParentId,
  onParentIdChange,
  positions,
  onSave,
}: EditPositionDialogProps) {
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onTitleChange(e.target.value);
    },
    [onTitleChange]
  );

  const renderPositionOptions = (
    positions: Position[],
    level: number = 0
  ): React.ReactNode[] => {
    return positions.flatMap((position) => [
      <SelectItem key={position.id} value={position.id.toString()}>
        {"\u00A0".repeat(level * 2)} {position.title}
      </SelectItem>,
      ...(position.children
        ? renderPositionOptions(position.children, level + 1)
        : []),
    ]);
  };

  // Memoize position options to prevent recreating on every render
  const positionOptions = useMemo(
    () => renderPositionOptions(positions),
    [positions]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Position</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Position Title"
            value={newTitle}
            onChange={handleTitleChange}
          />
          <div className="space-y-2">
            <label className="font-medium text-sm">
              Parent Position (Optional)
            </label>
            <Select value={selectedParentId} onValueChange={onParentIdChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select parent position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="root">None (Top Level)</SelectItem>
                {positionOptions}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={onSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
