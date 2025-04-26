"use client";

import { CardSensor } from "@/components/uicustom";
import { useCurrentUser } from "@/hook/useCurrentUser";
import { redirect } from "next/navigation";



// import Image from "next/image";
// import GaugeChart from "@/components/chart/gaugechart";

export default function BashboardPage() {
  const user = useCurrentUser();

  if(user?.role === "ADMIN"){
    return(
      redirect("/admin/dashboard")
    )
  }
  return (
    <div className="m-5 w-full h-full ">
      <CardSensor></CardSensor>
      <div>
    </div>
    </div>
  );
}
