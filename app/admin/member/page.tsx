"use client"
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteButton from "@/components/uicustom/del-user-components";
import Loading from "@/components/uicustom/loading";
import { useCurrentUser } from "@/hook/useCurrentUser";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  username: string;
  role: string;
}

export default function MemberPage() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter(); 
  const user = useCurrentUser(); 

  async function fetchUser() {
    try {
      const res = await fetch("/api/user");

      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data: User[] = await res.json();
      console.log("Fetched Data:", data);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }

  const refresh = () =>{
    router.refresh();
  }


  useEffect(() => {
    if (user?.role === "user") {
      redirect("/dashboard"); 
    }
  }, [user]); 

  useEffect(() => {
    fetchUser();
  }, []); 

  if(users.length === 0){
    return(
      <div className="w-full h-full">
        <Loading/>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-0 right-0 mt-5 mr-5">
        <Link href="/admin/register" className="text-2xl text-blue-500 hover:text-blue-600">Register</Link>
      </div>

      <div className="flex justify-center h-full">
        <div className="m-20">
          <Table className="text-2xl">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center">ID</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Username</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-center">
                    {user.id}
                  </TableCell>
                  <TableCell className="text-center">{user.name}</TableCell>
                  <TableCell className="text-center">{user.username}</TableCell>
                  <TableCell className="text-center">{user.role}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-row gap-5">
                      <div>
                        <Link href={`/admin/member/${user.id}`}>
                          <Button className="bg-amber-400 hover:bg-amber-500 ">Edit</Button>
                        </Link>
                      </div>

                      <div onClick={refresh}>
                        <DeleteButton userId={user.id} onDeleted={fetchUser} />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
