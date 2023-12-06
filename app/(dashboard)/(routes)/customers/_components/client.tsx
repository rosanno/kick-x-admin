"use client";

import { DataTable } from "@/components/ui/data-table";
import { CategoryModal } from "@/components/modals/category-modal";
import { CustomerColumn, columns } from "./column";

interface ClientProps {
  customers: CustomerColumn[];
}

export const Client = ({ customers }: ClientProps) => {
  return (
    <>
      <CategoryModal />
      <div className="border-b border-dashed flex items-center justify-between p-4">
        <h1 className="font-medium">Customer List</h1>
      </div>
      <DataTable
        data={customers}
        columns={columns}
        searchKey="customer"
        placeholder="Search customers..."
      />
    </>
  );
};
