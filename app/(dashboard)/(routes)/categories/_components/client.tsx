"use client";

import { Plus } from "lucide-react";

import { Category } from "@prisma/client";
import { useCategoryModal } from "@/hooks/use-category-modal";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { CategoryModal } from "@/components/modals/category-modal";
import { columns } from "./column";

interface ClientProps {
  categories: Category[];
}

export const Client = ({ categories }: ClientProps) => {
  const categoryModal = useCategoryModal();

  return (
    <>
      <CategoryModal />
      <div className="border-b border-dashed flex items-center justify-between p-4">
        <h1 className="font-medium">Categories</h1>
        <Button
          className="bg-[#313131] hover:bg-[#444444] transition duration-300"
          onClick={() => categoryModal.onOpen()}
        >
          <Plus className="h-3 w-3 mr-2" />
          <span className="text-[13px] font-normal">
            Create Category
          </span>
        </Button>
      </div>
      <DataTable
        data={categories}
        columns={columns}
        searchKey="category_name"
      />
    </>
  );
};
