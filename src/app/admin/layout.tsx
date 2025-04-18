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
    { name: "Positions", href: "/admin" },
    { name: "People", href: "/admin/people" },
  ];

  return (
    <div>
      <div className="border-b container mx-auto">
        <nav className="flex">
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
      {children}
    </div>
  );
} 