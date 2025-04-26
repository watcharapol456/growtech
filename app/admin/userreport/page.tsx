"use client";

import { useCurrentUser } from "@/hook/useCurrentUser";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface Userreport {
  description: string;
  id: number;
  name:string;
  topic:string;
}

export default function UserReportData() {
  const [report, setReport] = useState<Userreport[]>([]);
  const user = useCurrentUser();
  async function fetchUserreport() {
    try {
      const res = await fetch("/api/userreport");
      if (!res.ok) {
        throw new Error("Failed to fetch userreport");
      }
      const data: Userreport[] = await res.json();
      console.log("DEBUG DATA USERREPORT", data);
      setReport(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserreport();
  }, []);
  if (user?.role === "user") {
    return redirect("/dashboard");
  }
  return (
    <div className="flex justify-center h-full">
      <div>
        <Link href={"/admin/adduserreport"}>
          report
        </Link>
      </div>
         <ScrollArea className="h-72 w-full rounded-md border">
     
        <Table className="text-2xl">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">Name</TableHead>
              <TableHead className="text-center w-[500px]">Topic</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {report.map((reports) => (
              <TableRow key={reports.id}>
                <TableCell className="font-medium text-center">
                  {reports.name}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {reports.topic}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </ScrollArea>
      </div>
  );
}
