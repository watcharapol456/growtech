"use client";

import { getUserreportbyId } from "@/actions";
import Loading from "@/components/uicustom/loading";
import { useParams } from "next/navigation";
import router from "next/router";
import { useEffect, useState } from "react";

interface UserReport {
  name: string;
  topic: string;
  description: string;
}

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  
  const [userreport, setUserreport] = useState<UserReport>();

  const queryUserreport = async (id: number) => {
    try {
      const reportuser = await getUserreportbyId(id);
      console.log("DEBUG params",id)
      setUserreport(reportuser);
    } catch (error) {
      console.log("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    if (id) {
        queryUserreport(Number(id));
    } else {
      router.push("/404");  
    }
  }, [id, router]);

  if (!userreport) {
    return(
    <div className="w-full h-full">
      <Loading></Loading>;
      </div>   
    ) 
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Report Detail</h1>
      <div className="mb-2">
        <strong>Name:</strong> {userreport.name}
      </div>
      <div className="mb-2">
        <strong>Topic:</strong> {userreport.topic}
      </div>
      <div className="mb-2">
        <strong>Description:</strong> {userreport.description}
      </div>
    </div>
  );
};

export default Page;
