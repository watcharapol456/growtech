"use client";

import { LoginForm } from "@/components/Login";
import React from "react";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#96E7DF] bg-[url('/assets/bg-img.png')] bg-cover bg-center ">
      <LoginForm />
    </div>
  );
}
