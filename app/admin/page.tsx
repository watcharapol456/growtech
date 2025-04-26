"use client"
import { useCurrentUser } from "@/hook/useCurrentUser";
import { redirect } from "next/navigation"

 const AdminPage =() => {
     const user = useCurrentUser();
            if(user?.role === "user"){
              return(
                redirect("/dashboard")
              )
            }
    return(
        redirect("/admin/dashboard")
    )
}

export default AdminPage