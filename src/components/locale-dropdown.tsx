"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Globe2Icon } from "lucide-react";
import { Button } from "./ui/button";

export default function LocaleDropdown() {
  const router = useRouter();

  function handleChooseLocale(locale: string) {
    router.push(`/${locale}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="hover:cursor-pointer" size={"icon"}>
          <Globe2Icon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleChooseLocale("vi")}>
          Tiếng Việt
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChooseLocale("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChooseLocale("fr")}>
          Français
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
