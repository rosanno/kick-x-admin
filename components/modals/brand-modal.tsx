"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";

import { useBrandModal } from "@/hooks/use-brand-modal";

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
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  brand_name: z
    .string()
    .min(1, { message: "Field is required." })
    .max(20),
});

export const BrandModal = () => {
  const { toast } = useToast();
  const router = useRouter();
  const brandModal = useBrandModal();

  const [loading, setLoading] = useState(false);

  const toastMsg = brandModal.editId
    ? "Updated"
    : "Created";
  const description = brandModal.editId
    ? "Update product categories"
    : "Add your product categories";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand_name: "",
    },
  });

  useEffect(() => {
    let ignore = false;
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/brands/${brandModal.editId}`
        );
        if (!ignore) {
          form.setValue(
            "brand_name",
            response?.data?.brand_name
          );
        }
      } catch (error) {
        toast({
          title: "Something went wrong.",
          description:
            "There was a problem with your request.",
        });
      } finally {
        setLoading(false);
      }
    };

    brandModal.editId && fetchCategory();

    return () => {
      ignore = true;
    };
  }, [brandModal.editId]);

  const onClose = () => {
    brandModal.onClose();
    form.reset();
  };

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    try {
      setLoading(true);
      if (brandModal.editId) {
        await axios.patch(
          `/api/brands/${brandModal.editId}`,
          values
        );
      } else {
        await axios.post("/api/categories", values);
      }

      toast({
        description: `Brand ${toastMsg}`,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description:
          "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
      form.reset();
      brandModal.onClose();
    }
  };

  return (
    <Modal
      isOpen={brandModal.isOpen}
      onClose={onClose}
      title="Category"
      description={description}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="brand_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
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
              {brandModal.editId ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
