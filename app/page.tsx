"use client";

import React, { useEffect } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";

const HomePage = () => {
  const router = useRouter();
  const [progress, setProgress] = React.useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          clearInterval(interval);
          return 100;
        }
        return value + 20;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      router.push("/dashboard");
    }
  }, [progress, router]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
    <div className="grid justify-items-center gap-y-10">
      <Image src="/assets/logogrowtech.png" alt="logo" width={412} height={412} />
      <Progress value={progress} className="" />
    </div>
  </div>
  
  );
};

export default HomePage;
