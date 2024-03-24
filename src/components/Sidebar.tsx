"use client";
import React from "react";
import { sidebarItems } from "@/data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="grid items-start gap-2">
      {sidebarItems.map((item, id) => (
        <Link key={id} href={item.href}>
          <span
            className={cn(
              "group flex gap-2 items-center rounded-md px-3 py-2 text-sm font-lg hover:bg-accent",
              pathname === item.href ? "bg-accent" : "bg-transparent"
            )}
          >
            <div className="text-primary ">{item.icon}</div>
            <span>{item.name}</span>
          </span>
        </Link>
      ))}
    </section>
  );
};

export default Sidebar;
