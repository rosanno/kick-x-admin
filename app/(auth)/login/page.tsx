"use client";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Please provide an email address",
    })
    .max(20, {
      message: "Email must not exceeded in 20 characters",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(10, {
      message:
        "Password must not exceeded in 10 characters",
    }),
});

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const callbackUrl =
    searchParams.get("callbackUrl") || "/";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      setLoading(false);

      if (!res?.error) {
        router.push(callbackUrl);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center w-full h-full overflow-auto px-5">
      <div className="mb-7">
        <h1
          className="
             text-4xl 
             text-[#313131] 
             md:text-5xl 
             font-merriweather 
             font-bold
            "
        >
          KickX
        </h1>
      </div>
      <Card className="w-[390px] sm:w-[410px] shadow-sm border-0 rounded-sm">
        <CardHeader className="text-center">
          <CardTitle className="md:text-2xl font-bold">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-[13px]">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email"
                        {...field}
                        className="py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="password"
                          {...field}
                          className="py-5"
                        />
                        {showPassword ? (
                          <div
                            role="button"
                            className="absolute top-3 right-3"
                            onClick={() =>
                              setShowPassword(false)
                            }
                          >
                            <Eye className="w-5 h-5 text-gray-400/95" />
                          </div>
                        ) : (
                          <div
                            role="button"
                            className="absolute top-3 right-3"
                            onClick={() =>
                              setShowPassword(true)
                            }
                          >
                            <EyeOff className="w-5 h-5 text-gray-400/95" />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="
                     w-full 
                     bg-[#313131] 
                     hover:bg-[#454545] 
                     transition 
                     duration-200
                    "
                  variant={"default"}
                  size="lg"
                >
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default LoginPage;
