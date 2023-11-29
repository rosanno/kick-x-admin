"use client";

import * as z from "zod";

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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  current_password: z.string().min(1),
  password: z
    .string()
    .min(8)
    .max(32)
    .trim()
    .regex(/[a-zA-Z]+/) // Must contain at least one letter
    .regex(/[0-9]+/) // Must contain at least one digit
    .regex(/[\W]+/),
  confirm_password: z
    .string()
    .min(8)
    .max(32)
    .trim()
    .regex(/[a-zA-Z]+/) // Must contain at least one letter
    .regex(/[0-9]+/) // Must contain at least one digit
    .regex(/[\W]+/),
});

export const PasswordInformation = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      current_password: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (
    formValues: z.infer<typeof formSchema>
  ) => {
    console.log(formValues);
  };

  return (
    <Card className="border-0 rounded-md shadow-sm mt-4">
      <CardHeader className="relative">
        <CardTitle className="text-sm">
          Change Password
        </CardTitle>
        <CardDescription className="text-[13px]">
          Your new password must be different from previous
          used password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-8 gap-x-6 gap-y-3">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="current_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        Current Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter current password"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        Confirm New Password
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
