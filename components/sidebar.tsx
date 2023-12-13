"use client";

import Link from "next/link";
import {
  Box,
  Clipboard,
  CreditCard,
  FolderEdit,
  LayoutGrid,
  List,
  Settings,
  ShoppingBag,
  Users2,
  Wallet,
} from "lucide-react";

import { SidebarItem } from "./sidebar-item";
import { Nav } from "./nav";

const menuItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutGrid,
  },
  {
    label: "Products",
    href: "/products",
    icon: Box,
  },
  {
    label: "Brands",
    href: "/brands",
    icon: FolderEdit,
  },
  {
    label: "Categories",
    href: "/categories",
    icon: List,
  },
  {
    label: "Inventory",
    href: "/inventory",
    icon: Clipboard,
  },
  {
    label: "Payments",
    href: "/payments",
    icon: CreditCard,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: ShoppingBag,
  },
  {
    label: "Customers",
    href: "/customers",
    icon: Users2,
    isSpace: true,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const Sidebar = () => {
  return (
    <>
      <aside className="bg-white border-r border-gray-100 shadow-sm h-screen w-64 p-7 sticky top-0 bottom-0">
        <Link href="/" className="text-2xl font-extrabold">
          Kick X
        </Link>
        <ul className="pt-6">
          {menuItems.map((item) => {
            return (
              <SidebarItem
                key={item.label}
                label={item.label}
                href={item.href}
                icon={item.icon}
                space={item.isSpace || false}
              />
            );
          })}
        </ul>
      </aside>
      <div className="fixed z-20 top-0 left-64 bg-white shadow-sm w-[calc(100%-256px)]">
        <Nav />
      </div>
    </>
  );
};
