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
    <div className=" h-screen flex justify-center items-center w-[600px]">
    <CardWrapper
      headerLabel="Create an account"
    
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          <div className="space-y-4 m-5">
            <div className="w-full  flex items-center justify-center justify-items-center text-4xl">
              Register
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Username</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="john" className="p-5 text-xl placeholder:text-xl" />
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
                  <FormLabel className="text-xl">Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Jack" className="p-5 text-xl placeholder:text-xl"/>
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
                  <FormLabel className="text-xl">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                      className="p-5 text-xl placeholder:text-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSucces message={success} />
          <div className="space-y-4 w-full ">
            <Button className="w-full text-xl p-6" type="submit" disabled={isPending} onClick={onClickrefresh}>
              Create an account
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
    </div>
  );
};
