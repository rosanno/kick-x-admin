"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { Trash } from "lucide-react";

import { useBrandModal } from "@/hooks/use-brand-modal";
import { UploadButton } from "@/lib/uploadthing";

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
  brand_logo: z.string().optional(),
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
    ? "Update product brand"
    : "Add product brand";

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
          form.setValue(
            "brand_logo",
            response?.data?.brand_logo
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
        await axios.post("/api/brands", values);
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
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      form.reset();
      brandModal.onClose();
    }
  };

  const removeLogo = async (url: string | undefined) => {
    try {
      const logo_url = url?.substring(
        url.lastIndexOf("/") + 1
      );
      await axios.delete("/api/uploadthing", {
        data: {
          url: logo_url,
        },
      });

      toast({
        description: "Logo remove",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description:
          "There was a problem with your request.",
        variant: "destructive",
      });
    }
  };

  return (
    <Modal
      isOpen={brandModal.isOpen}
      onClose={onClose}
      title="Brand"
      description={description}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="brand_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
          <FormField
            control={form.control}
            name="brand_logo"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="pb-1.5">
                  Logo
                </FormLabel>
                <FormControl>
                  {!field.value ? (
                    <UploadButton
                      appearance={{
                        button: "text-[13px] h-8",
                        container: "rounded-md",
                        allowedContent: "hidden",
                      }}
                      endpoint="imageUploader"
                      onClientUploadComplete={async (
                        res
                      ) => {
                        field.onChange(res && res[0].url);
                      }}
                      onUploadError={(error: Error) => {
                        console.log(error);
                      }}
                    />
                  ) : (
                    <div className="flex items-end gap-2">
                      <div className="h-20 w-20 p-4 bg-gray-100 rounded-md">
                        <Image
                          src={field.value}
                          alt="logo"
                          height={200}
                          width={200}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        disabled={loading}
                        className="border border-gray-200"
                        onClick={() =>
                          removeLogo(field.value)
                        }
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  )}
                </FormControl>
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
