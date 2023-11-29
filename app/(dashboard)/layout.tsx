import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { Sidebar } from "@/components/sidebar";
import Provider from "@/app/context/client-provider";

export const metadata: Metadata = {
  title: "Kick X | Dashboard",
  description:
    "Kick admin dashboard to manage shoe products",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  return (
    <Provider session={session}>
      <div className="flex bg-gray-100/80 w-full">
        <Sidebar />
        <main className="flex-1 px-7 pt-24 overflow-y-auto">{children}</main>
      </div>
    </Provider>
  );
}
