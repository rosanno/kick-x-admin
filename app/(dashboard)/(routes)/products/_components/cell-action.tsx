"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";
import { useToast } from "@/components/ui/use-toast";
import { ProductColumn } from "./column";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/product/${data.id}`);
      router.refresh();
      toast({
        description: "Product deleted.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description:
          "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${data.slug}/${data.id}`)
            }
          >
            <Eye className="mr-2 h-4 w-4" />
            <span className="text-[13px]">View</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/products/${data.id}`)
            }
          >
            <Pencil className="mr-2 h-4 w-4" />
            <span className="text-[13px]">Update</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            <span className="text-[13px]">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
