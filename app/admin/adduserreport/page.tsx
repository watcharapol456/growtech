"use client";

import ReportFrom from "@/components/from/insertreportdata-from";
import { useCurrentUser } from "@/hook/useCurrentUser";
import { redirect } from "next/navigation";

export default function UserReportPage() {
  const user = useCurrentUser();
  if (user?.role === "user") {
    return redirect("/dashboard");
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* ส่วนหัว */}
      <div className="border-b-4 p-5 m-5 w-full">
        <h1 className="text-4xl font-bold">Report</h1>
      </div>

      {/* ส่วนกลาง */}
      <div className="flex justify-center items-center">
        <ReportFrom />
      </div>
    </div>
  );
}
