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
  role: string;
}

const DEFAULT_FORM_DATA: UserData = {
  name: "",
  username: "",
  role: "",
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
        role: user?.role || "",
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
          role: formData.role,
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Role</Label>
          <Input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="bg-emerald-400 text-xl">Submit</Button>
        <Button onClick={cancel} className="bg-red-400 text-xl">Cancel</Button>
      </form>
    </div>
  );
};

export default Page;
