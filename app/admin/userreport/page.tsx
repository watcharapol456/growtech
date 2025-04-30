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
import { Button } from "@/components/ui/button";
import Loading from "@/components/uicustom/loading";

interface Userreport {
  description: string;
  id: number;
  name: string;
  topic: string;
}

export default function UserReportData() {
  const [report, setReport] = useState<Userreport[]>([]);
  const user = useCurrentUser();

  // Function to fetch user report data
  async function fetchUserreport() {
    try {
      const res = await fetch("/api/userreport");
      if (!res.ok) {
        throw new Error("Failed to fetch user report");
      }
      const data: Userreport[] = await res.json();
      console.log("DEBUG DATA USERREPORT", data);
      setReport(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch user report data on component mount
  useEffect(() => {
    fetchUserreport();
  }, []);

  // Loading state
  if (report.length === 0) {
    return (
      <div className="w-full ">
        <Loading />
      </div>
    );
  }

  // Redirect if user is not authorized
  if (user?.role === "user") {
    return redirect("/dashboard");
  }

  return (
    <div className="w-full min-h-full bg-gray-50 flex justify-center items-center py-10">
      <div className="relative w-full max-w-5xl">
        {/* Add Report button */}
        <div className="absolute top-0 right-0">
          <Link href="/adduserreport">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-xl shadow-md transition">
              Add Report
            </Button>
          </Link>
        </div>
  
        {/* Scrollable Table */}
        <div className="mt-20 rounded-2xl shadow-lg bg-white">
          <ScrollArea className="h-[400px] w-full p-6">
            <Table className="text-lg w-full table-auto border-separate border-spacing-y-2">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center text-gray-700">Name</TableHead>
                  <TableHead className="text-center text-gray-700">Topic</TableHead>
                  <TableHead className="text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.map((reports) => (
                  <TableRow
                    key={reports.id}
                    className="hover:bg-gray-50 transition-all"
                  >
                    <TableCell className="text-center">{reports.name}</TableCell>
                    <TableCell className="text-center">{reports.topic}</TableCell>
                    <TableCell className="text-center">
                      <Link href={`/admin/userreport/${reports.id}`}>
                        <Button className="bg-amber-400 hover:bg-amber-500 text-white px-5 py-2 rounded-md transition">
                          Read More
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
  
  
}
