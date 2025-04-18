import Link from "next/link";
import { BotIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function AdminDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="hover:cursor-pointer"
          variant={"ghost"}
          size={"icon"}
        >
          <BotIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/admin/positions">Positions</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/admin/people">People</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
