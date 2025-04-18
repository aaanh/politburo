import { cn } from "@/lib/utils";
import { BoltIcon, HomeIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import LocaleDropdown from "./locale-dropdown";

const navTargets = [
  {
    href: "/",
    label: "Home",
    icon: <HomeIcon />,
  },
  {
    href: "/admin",
    label: "Admin",
    icon: <BoltIcon />,
  },
  {
    href: "/about",
    label: "About",
    icon: <InfoIcon />,
  },
];

export default function NavBar() {
  return (
    <div className="mx-auto my-4 p-4 container">
      <nav className="flex justify-between items-center bg-accent/25 p-2 border rounded-xl">
        <div>
          <h1 className="text-2xl">
            <Link
              className={cn(buttonVariants({ variant: "default" }))}
              href="/"
            >
              PolitBuro
            </Link>
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {navTargets.map((target) => (
            <Link
              key={target.href}
              className={cn(buttonVariants({ variant: "ghost" }))}
              id={`nav-${target.label}`}
              href={target.href}
            >
              {target.icon}
              {target.label}
            </Link>
          ))}
          <LocaleDropdown />
        </div>
      </nav>
    </div>
  );
}
