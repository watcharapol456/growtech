"use client";
import React, { useState } from "react";
import { Sidebar_Menu_Admin } from "@/constants/const-sidebar";
import { ISidebarItem } from "@/types/share";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Chakra_Petch } from "next/font/google";

import { SessionProvider } from "next-auth/react";
import { signOut } from "next-auth/react";
import UserBar from "@/components/Bar/userbar";
import { NavBarHome } from "@/components/Bar/navbar";

const chakraPetch = Chakra_Petch({
  weight: ["400", "700"],
  subsets: ["thai"],
});

function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  return (
    <SessionProvider>
      <div
        className={`${chakraPetch.className} h-screen w-full overflow-hidden bg-[url('/assets/bg-img.png')] bg-cover bg-center`}
      >
        <div className="flex h-[150px] w-full flex-row bg-[#9ae2cf]">
          <Image
            src="/assets/logo-home.jpg"
            alt="Logo"
            width={300}
            height={150}
          />
          <NavBarHome items={selectedMenu} />
        </div>

        <section className="flex h-[calc(100%-150px)] overflow-hidden">
          <section>
            <div className="sticky left-0 top-0 flex h-full w-[300px] flex-col gap-6 bg-[#9ae2cf]">
              <div></div>
              {Sidebar_Menu_Admin.map((item: ISidebarItem) => {
                const isActive = pathName === item.route;
                return (
                  <Link
                    key={item.route}
                    href={item.route}
                    onClick={() => setSelectedMenu(item.label)}
                  >
                    <div
                      className={`bg-[#7dd4c6] flex p-3 rounded-bl-[100px] mx-5 ${
                        isActive
                          ? " bg-[#0594db]"
                          : "bg-inherit hover:bg-[#0594db]"
                      }`}
                    >
                      <Image
                        src={item.imgURL}
                        alt={item.label}
                        width={30}
                        height={20}
                        className="mx-5"
                      />
                      <span
                        className={`mx-auto p-2 text-2xl ${
                          isActive ? "font-bold" : ""
                        } text-white`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
              <div className="flex items-center justify-center space-x-2 border-b-2 mt-12 py-2 w-[200px] mx-auto ">
                <Image
                  src="/assets/user.svg"
                  width={50}
                  height={30}
                  alt="user"
                  className="rounded-full"
                />
                <span className="text-lg font-semibold">
                  <UserBar />
                </span>
              </div>

              <div className="mt-auto flex flex-col gap-4 mb-5">
                <div className="mx-5">
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 w-full px-6 py-3 p-3 bg-[#9ae2cf] text-white text-2xl  rounded-bl-[100px]  hover:bg-[#0594db] transition duration-300"
                  >
                    <Image
                      src="/assets/log-out.svg"
                      alt="logout"
                      width={30}
                      height={30}
                      className="ml-2"
                    />
                    <div className="ml-10">
                      <span>Sign Out</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {children}
        </section>
      </div>
    </SessionProvider>
  );
}

export default HomeLayout;
