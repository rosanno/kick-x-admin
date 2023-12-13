"use client";

import { Plus } from "lucide-react";

import { Brand, Category } from "@prisma/client";
import { useCategoryModal } from "@/hooks/use-category-modal";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { CategoryModal } from "@/components/modals/category-modal";
import { columns } from "./column";

interface ClientProps {
  brands: Brand[];
}

export const Client = ({ brands }: ClientProps) => {
  const categoryModal = useCategoryModal();

  return (
    <>
      <CategoryModal />
      <section className="border-b border-dashed flex items-center justify-between p-4">
        <h1 className="font-medium">Brand List</h1>
        <Button
          className="bg-[#313131] hover:bg-[#444444] transition duration-300"
          onClick={() => categoryModal.onOpen()}
        >
          <Plus className="h-3 w-3 mr-2" />
          <span className="text-[13px] font-normal">
            Create Brand
          </span>
        </Button>
      </section>
      <section>
        <DataTable
          data={brands}
          columns={columns}
          searchKey="category_name"
          placeholder="Search for category..."
        />
      </section>
    </>
  );
};
