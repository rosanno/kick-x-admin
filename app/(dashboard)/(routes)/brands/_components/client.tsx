"use client";

import { Plus } from "lucide-react";

import { Brand } from "@prisma/client";
import { useBrandModal } from "@/hooks/use-brand-modal";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { columns } from "./column";
import { BrandModal } from "@/components/modals/brand-modal";

interface ClientProps {
  brands: Brand[];
}

export const Client = ({ brands }: ClientProps) => {
  const brandModal = useBrandModal();

  return (
    <>
      <BrandModal />
      <section className="border-b border-dashed flex items-center justify-between p-4">
        <h1 className="font-medium">Brand List</h1>
        <Button
          className="bg-[#313131] hover:bg-[#444444] transition duration-300"
          onClick={() => brandModal.onOpen()}
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
