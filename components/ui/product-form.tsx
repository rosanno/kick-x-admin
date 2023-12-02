"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import {
  Brand,
  Category,
  Color,
  Image,
  Product,
  Size,
} from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Textarea } from "./textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { ImageUpload } from "../image-upload";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./card";
import useRemoveImage from "@/hooks/use-remove-image";

interface ProductFormProps {
  initialData?:
    | (Product & {
        images: Image[];
        sizes: Size[];
        color: Color;
      })
    | null;
  categories: Category[];
  brands: Brand[];
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Product name is required." }),
  brandId: z
    .string()
    .min(1, { message: "Please select brand." }),
  categoryId: z
    .string()
    .min(1, { message: "Please select category" }),
  description: z
    .string()
    .min(20, {
      message: "Product description is required.",
    })
    .max(300, {
      message:
        "Description must not be longer thant 100 characters",
    }),
  gender: z
    .string()
    .min(1, { message: "Please select gender" }),
  sizes: z
    .object({
      size: z.coerce.number(),
      quantity: z.coerce.number(),
    })
    .array()
    .min(1, { message: "Please provide valid size." }),
  images: z.object({ image_path: z.string() }).array(),
  price: z.coerce
    .number()
    .min(2, { message: "Price is required." }),
  discount: z.coerce.number().optional(),
  isFeatured: z.boolean().default(false).optional(),
  color_name: z.string().min(4, {
    message: "Please provide a valid color name.",
  }),
  color_value: z.string().min(6, {
    message: "Please provide a valid color value.",
  }),
});

export const ProductForm = ({
  initialData,
  categories,
  brands,
}: ProductFormProps) => {
  const router = useRouter();
  const { onRemove } = useRemoveImage();

  const [isLoading, setIsLoading] = useState(false);

  const label = initialData ? "Update" : "Save";
  const toastMsg = initialData
    ? "Product updated"
    : "Product created";

  const defaultValues = initialData
    ? {
        ...initialData,
        price: parseFloat(String(initialData?.price)),
        discount:
          parseFloat(String(initialData?.discount)) !== null
            ? parseFloat(String(initialData?.discount))
            : undefined,
        isFeatured:
          initialData?.isFeatured !== null
            ? initialData?.isFeatured
            : undefined,
        color_name: initialData?.color.color_name,
        color_value: initialData?.color.color_value,
      }
    : {
        name: "",
        brandId: "",
        categoryId: "",
        description: "",
        gender: "",
        sizes: [
          {
            size: undefined,
            quantity: undefined,
          },
        ],
        images: [],
        price: 0,
        discount: 0,
        isFeatured: false,
        color_name: "",
        color_value: "",
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (
    formValues: z.infer<typeof formSchema>
  ) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/product/${initialData.id}`,
          formValues
        );
      } else {
        await axios.post("/api/product", formValues);
        form.reset();
      }
      router.push("/products");
      router.refresh();
      toast.success(toastMsg);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="space-y-5 col-span-2">
              <Card className="shadow-sm border-none rounded-sm">
                <CardContent className="py-5 space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[13px]">
                          Product Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter product title"
                            {...field}
                            className="text-[13px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[13px]">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Do not exceed 100 characters when entering the product description..."
                            className="text-[13px] p-3"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card className="shadow-sm border-none rounded-sm">
                <CardHeader className="px-5 py-4 border-b">
                  <CardTitle className="text-sm font-medium">
                    Product Images
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-5">
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[13px]">
                          Add Images
                        </FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value.map(
                              (image) => image.image_path
                            )}
                            onChange={(imagePaths) => {
                              const updatedImages = [
                                ...field.value,
                                ...imagePaths.map(
                                  (image_path) => ({
                                    image_path,
                                  })
                                ),
                              ];
                              field.onChange(updatedImages);
                            }}
                            onRemove={(url) =>
                              onRemove(url, field)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card className="shadow-sm border-none rounded-sm">
                <CardHeader className="px-5 py-4 border-b">
                  <CardTitle className="text-sm font-medium">
                    Product Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 py-3">
                  <div className="grid grid-cols-4 gap-3">
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[13px] text-muted-foreground">
                              Price
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="₱0.00"
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="discount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[13px] text-muted-foreground">
                              Discount
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="%0.00"
                                type="number"
                                step="any"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="color_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[13px] text-muted-foreground">
                              Color Name
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="color_value"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[13px] text-muted-foreground">
                              Color Value
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-4">
                      <FormField
                        control={form.control}
                        name="sizes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[13px] text-muted-foreground">
                              Sizes
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center flex-wrap gap-2">
                                {field.value.map(
                                  (item, index) => (
                                    <div
                                      key={index}
                                      className="w-[706px] flex items-center gap-2"
                                    >
                                      <Input
                                        type="number"
                                        value={item.size}
                                        onChange={(event) =>
                                          field.onChange(
                                            field.value.map(
                                              (el, i) => {
                                                const parsedValue =
                                                  parseFloat(
                                                    event
                                                      .target
                                                      .value
                                                  );
                                                return i ===
                                                  index
                                                  ? {
                                                      ...el,
                                                      size: isNaN(
                                                        parsedValue
                                                      )
                                                        ? ""
                                                        : parsedValue,
                                                    }
                                                  : el;
                                              }
                                            )
                                          )
                                        }
                                        step="any"
                                        className="w-9 p-0 text-center"
                                      />
                                      <Input
                                        type="number"
                                        value={
                                          item.quantity
                                        }
                                        onChange={(event) =>
                                          field.onChange(
                                            field.value.map(
                                              (el, i) => {
                                                const parsedValue =
                                                  parseFloat(
                                                    event
                                                      .target
                                                      .value
                                                  );
                                                return i ===
                                                  index
                                                  ? {
                                                      ...el,
                                                      quantity:
                                                        isNaN(
                                                          parsedValue
                                                        )
                                                          ? ""
                                                          : parsedValue,
                                                    }
                                                  : el;
                                              }
                                            )
                                          )
                                        }
                                        step="any"
                                        placeholder="quantity"
                                        className="w-full"
                                      />
                                    </div>
                                  )
                                )}
                                <div
                                  role="button"
                                  onClick={() =>
                                    field.onChange([
                                      ...field.value,
                                      {
                                        size: undefined,
                                        quantity: undefined,
                                      },
                                    ])
                                  }
                                  className="border hover:bg-gray-100/70 transition duration-300 rounded-md p-3 w-fit"
                                >
                                  <Plus className="h-3 w-3" />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-5 mt-2.5">
                      <FormField
                        control={form.control}
                        name="isFeatured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={
                                  field.onChange
                                }
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-[13px]">
                                Featured
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-2 lg:col-span-1 space-y-4 h-fit">
              <Card className="shadow-sm border-none rounded-sm">
                <CardHeader className="px-5 py-4 border-b">
                  <CardTitle className="text-sm font-medium">
                    Product Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 py-3 space-y-3">
                  <FormField
                    control={form.control}
                    name="brandId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[13px] text-muted-foreground">
                          Brands
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {brands.map((brand) => (
                                  <SelectItem
                                    key={brand.id}
                                    value={brand.id}
                                  >
                                    {brand.brand_name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[13px] text-muted-foreground">
                          Gender
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {[
                                  "Both",
                                  "Male",
                                  "Female",
                                ].map((item) => (
                                  <SelectItem
                                    key={item}
                                    value={item}
                                  >
                                    {item}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card className="shadow-sm border-none rounded-sm">
                <CardHeader className="px-5 py-4 border-b">
                  <CardTitle className="text-sm font-medium">
                    Product Category
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 py-3">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[13px] text-muted-foreground">
                          Categories
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {categories.map(
                                  (category) => (
                                    <SelectItem
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {
                                        category.category_name
                                      }
                                    </SelectItem>
                                  )
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="pb-5 flex justify-end col-span-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-[120px]"
              >
                {label}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};
