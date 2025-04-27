"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigation = [
    { name: "Positions", href: "/admin/positions" },
    { name: "People", href: "/admin/people" },
  ];

  return (
    <div>
      <div className="z-50 fixed mt-10 w-full">
        <nav className="flex bg-background/50 backdrop-blur mx-auto border-b container">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium",
                pathname === item.href
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <section className="pt-18">{children}</section>
    </div>
  );
}
