"use client";

import { editUser, getUserbyId } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/hook/useCurrentUser";
import { redirect, useParams, useRouter } from "next/navigation";  // ใช้ useRouter สำหรับ redirect
import { useEffect, useState } from "react";

interface UserData {
  name: string;
  username: string;
  password: string;
}

const DEFAULT_FORM_DATA: UserData = {
  name: "",
  username: "",
  password: "",
};

const Page = () => {
  const params = useParams(); 
  const router = useRouter(); 
  const [formData, setFormData] = useState<UserData>(DEFAULT_FORM_DATA);
  const id = params.id as string;

  const queryUser = async (id: string) => {
    try {
      const user = await getUserbyId(id);
   
      setFormData({
        name: user?.name || "",
        username: user?.username || "",
        password: user?.password || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      queryUser(id);
    } else {
      router.push("/admin/member");  
    }
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        await editUser({
          name: formData.name,
          username: formData.username,
          password: formData.password,
        }, id);
        router.push("/admin/member");  
      }
    } catch (error) {
      console.error("Error updating user", error);
    }
  };
  const user = useCurrentUser();
    if(user?.role === "user"){
      return(
        redirect("/dashboard")
      )
    }

    const cancel = () => {
      router.push("/admin/member");  
    }

    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Edit User</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-gray-700">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="username" className="text-gray-700">Username</Label>
              <Input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-2"
              />
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                onClick={cancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
    
    
};

export default Page;
