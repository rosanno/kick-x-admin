"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

import { useCategoryModal } from "@/hooks/use-category-modal";

import { Modal } from "../ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const formSchema = z.object({
  category_name: z
    .string()
    .min(1, { message: "Field is required." })
    .max(20),
});

export const CategoryModal = () => {
  const router = useRouter();
  const categoryModal = useCategoryModal();

  const [loading, setLoading] = useState(false);

  const toastMsg = categoryModal.editId
    ? "Updated"
    : "Created";
  const description = categoryModal.editId
    ? "Update product categories"
    : "Add your product categories";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_name: "",
    },
  });

  useEffect(() => {
    let ignore = false;
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/categories/${categoryModal.editId}`
        );
        if (!ignore) {
          form.setValue(
            "category_name",
            response?.data?.category_name
          );
        }
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    categoryModal.editId && fetchCategory();

    return () => {
      ignore = true;
    };
  }, [categoryModal.editId]);

  const onClose = () => {
    categoryModal.onClose();
    form.reset();
  };

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    try {
      setLoading(true);
      if (categoryModal.editId) {
        await axios.patch(
          `/api/categories/${categoryModal.editId}`,
          values
        );
      } else {
        await axios.post("/api/categories", values);
      }

      toast.success(`Category ${toastMsg}`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      form.reset();
      categoryModal.onClose();
    }
  };

  return (
    <Modal
      isOpen={categoryModal.isOpen}
      onClose={onClose}
      title="Category"
      description={description}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="category_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} disabled={loading} />
                    {loading && (
                      <div className="absolute top-2.5 right-2.5">
                        <Spinner size={"default"} />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="float-right mt-3">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#313131] hover:bg-[#444444] transition duration-300"
            >
              {categoryModal.editId ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
