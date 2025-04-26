"use client";

import { action } from "@/actions/Datepicker.actions";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/DatePicker";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentUser } from "@/hook/useCurrentUser";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReportPage() {
  const [data, setData] = useState<
    { timestamp: string; temp1: number; humi1: number; avgSoil: number }[]
  >([]);

  async function fetchData() {
    try {
      const res = await fetch("/api/datareport");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const user = useCurrentUser();
  if (user?.role === "ADMIN") {
    return redirect("/admin/dashboard");
  }

  return (
    <div className="w-full h-full">
      <div className="border-b-4 p-5 m-5">
        <h1 className="text-4xl font-bold">Report</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-1 h-full items-end">
            <h1 className="text-4xl font-bold">Dataset</h1>
          </div>

          <div className="flex justify-center items-center justify-items-center mt-5">
            <form action={action}>
              <DatePicker name="date" />
              <div className="flex justify-center mt-5">
                <Button className="cursor-pointer">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      <div className="flex">
        <div className="flex flex-col items-center w-full">
          <p>Area Show Data</p>
          <Table>
            <TableCaption>
              Dataset of time, temperature, humidity, and average soil
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>Humidity</TableHead>
                <TableHead>Average Soil</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.timestamp}</TableCell>
                  <TableCell>{item.temp1}</TableCell>
                  <TableCell>{item.humi1}</TableCell>
                  <TableCell>{item.avgSoil}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter></TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
