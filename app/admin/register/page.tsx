'use client'

import { RegisterForm } from '@/components/register/register-from'
import { useCurrentUser } from '@/hook/useCurrentUser';
import { redirect } from 'next/navigation';
import React from 'react'


export default function RegisterPage() {

      const user = useCurrentUser();
        if(user?.role === "user"){
          return(
            redirect("/dashboard")
          )
        }
  return (
    <div className="h-full flex justify-center items-center bg-[url('/assets/bg-img.png')] w-full  " >
        <RegisterForm></RegisterForm>
       
    </div>
  )
}
