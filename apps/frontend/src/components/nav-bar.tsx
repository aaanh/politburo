import { cn } from "@/lib/utils";
import { HomeIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import LocaleDropdown from "./locale-dropdown";
import AdminDropdown from "./admin-dropdown";
import { useI18n } from "@/contexts/i18n-context";

const navTargets = [
  {
    href: "/",
    label: "Home",
    icon: <HomeIcon />,
  },
  {
    href: "/about",
    label: "About",
    icon: <InfoIcon />,
  },
];

export default function NavBar() {
  const { t } = useI18n();

  return (
    <div className="p-8">
      <nav className="top-0 md:top-8 right-0 left-0 z-50 fixed flex justify-between items-center gap-4 bg-accent/50 shadow backdrop-blur mx-auto p-2 border md:rounded-xl container">
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
              <span className="hidden lg:block">
                {t(target.label.toLowerCase().replaceAll(" ", "-"))}
              </span>
            </Link>
          ))}
          {process.env.NODE_ENV !== "production" && <AdminDropdown />}
          <LocaleDropdown />
        </div>
      </nav>
    </div>
  );
}
