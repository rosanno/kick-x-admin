"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  space: boolean;
}

export const SidebarItem = ({
  label,
  href,
  icon: Icon,
  space,
}: SidebarItemProps) => {
  const pathname = usePathname();

  return (
    <li className={cn("py-1.5", space && "mt-5")}>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-2.5 px-2.5 py-2.5 text-gray-500/75 hover:text-white hover:bg-[#313131] rounded-md transition duration-300",
          pathname === href && "bg-[#313131] text-white"
        )}
      >
        {<Icon className="w-4 h-4" />}
        <span className="text-sm">{label}</span>
      </Link>
    </li>
  );
};
