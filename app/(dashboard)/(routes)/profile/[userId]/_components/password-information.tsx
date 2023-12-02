"use client";

import * as z from "zod";

import { User } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PasswordInformationProps {
  user: User | undefined | null;
}

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

export const PasswordInformation = ({
  user,
}: PasswordInformationProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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
    try {
      setLoading(true);
      if (
        formValues.password !== formValues.confirm_password
      ) {
        form.setError("confirm_password", {
          message: "Password did not match",
        });
      } else {
        await axios.patch(`/api/user/${user?.id}`, {
          ...user,
          current_password: formValues.current_password,
          password: formValues.password,
        });
        router.refresh();
        toast({
          description: "Password updated.",
        });
      }
    } catch (error: any) {
      form.setError("current_password", {
        message: error.response.data.message,
      });
    } finally {
      setLoading(false);
      form.reset();
    }
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
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
                          type="password"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
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
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-x-2.5">
              <Button
                type="submit"
                disabled={loading}
                className="w-28 bg-[#313131] hover:bg-[#404040] transition duration-300"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
