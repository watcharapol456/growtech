'use client'

import * as z from "zod";
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


import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { FormSucces } from "../Login/from-success";
import { FormError } from "../Login/from-error";
import { CardWrapper } from "../Login";
import { Button } from "../ui/button";
import { RegisterSchema } from "@/db/schema";
import { register } from "@/actions";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onClickrefresh = () => {
    router.push("/admin/member");
  };

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      password: "",
      username: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create an Account</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-gray-700">Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john"
                      className="p-4 text-lg placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-gray-700">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Jack"
                      className="p-4 text-lg placeholder:text-gray-400"
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
                  <FormLabel className="text-lg text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      disabled={isPending}
                      placeholder="******"
                      className="p-4 text-lg placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormError message={error} />
            <FormSucces message={success} />
  
            <Button
              type="submit"
              disabled={isPending}
              onClick={onClickrefresh}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg py-3 rounded-lg transition"
            >
              Create Account
            </Button>
            <Button
              type="button"
              disabled={isPending}
              onClick={onClickrefresh}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium text-lg py-3 rounded-lg transition"
            >
              Cancel
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
  
};
