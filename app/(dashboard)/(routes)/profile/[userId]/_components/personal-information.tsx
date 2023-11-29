"use client";

import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  firstName: z.string().min(2).max(25),
  lastName: z.string().min(2).max(25),
  email: z.string().email().min(1),
  phoneNumber: z.string().min(10),
  address: z.string(),
  role: z.enum(["USER", "ADMIN"]),
});

interface PersonalInformationProps {
  userId: string;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  role: any;
}

export const PersonalInformation = ({
  userId,
  firstName,
  lastName,
  email,
  phone,
  address,
  role,
}: PersonalInformationProps) => {
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName,
      lastName,
      email,
      phoneNumber: phone,
      address,
      role,
    },
  });

  const onSubmit = async (
    formValues: z.infer<typeof formSchema>
  ) => {
    try {
      setLoading(true);
      await axios.patch(`/api/user/${userId}`, formValues);
      toast.success("Updated.");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsEdit(false);
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 rounded-md shadow-sm mt-4">
      <CardHeader className="relative">
        <CardTitle className="text-sm">
          Personal Information
        </CardTitle>
        <CardDescription className="text-[13px]">
          Update your personal information.
        </CardDescription>
        <div className="absolute top-3 right-4">
          {!isEdit && (
            <Button
              variant={"ghost"}
              size={"icon"}
              className="bg-gray-100/80"
              onClick={() => setIsEdit(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="border-b border-b-gray-100/90 py-1" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div className="grid grid-cols-8 gap-x-6 gap-y-3">
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEdit}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEdit}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEdit}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEdit}
                          type="number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        Select Role
                      </FormLabel>
                      <Select
                        disabled={!isEdit}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="USER">
                              User
                            </SelectItem>
                            <SelectItem value="ADMIN">
                              Admin
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-x-2.5">
              {isEdit && (
                <Button
                  type="submit"
                  className="w-28"
                  variant={"outline"}
                  disabled={loading}
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </Button>
              )}
              {isEdit && (
                <Button
                  type="submit"
                  className="w-28 bg-[#313131] hover:bg-[#404040] transition duration-300"
                  disabled={loading}
                >
                  Save
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
