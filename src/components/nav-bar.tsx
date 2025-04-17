import { cn } from "@/lib/utils";
import { BoltIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

const navTargets = [
  {
    href: "/",
    label: "Home",
    icon: <HomeIcon />
  },
  {
    href: "/admin",
    label: "Admin",
    icon: <BoltIcon />
  },
]

export default function NavBar() {
  return <div className="container mx-auto my-4">
    <nav className="flex justify-between items-center p-2 border rounded-xl">
      <div>
        <h1 className="text-2xl"><Link className={cn(buttonVariants({ variant: "default" }))} href="/">PolitBuro</Link></h1>
      </div>
      <div className="">
        {
          navTargets.map((target) => <Link key={target.href} className={cn(buttonVariants({ variant: "ghost" }))} id={`nav-${target.label}`} href={target.href}>
            {target.icon}{target.label}
          </Link>)
        }
      </div>
    </nav>
  </div>
}