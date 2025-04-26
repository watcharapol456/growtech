import React from "react";

interface NavBarProps {
  items: string;
}

export const NavBarHome = ({ items }: NavBarProps) => {
  return (
    <div className="mx-8 my-auto">
      <p className=" text-5xl font-bold text-white">{items}</p>
    </div>
  );
};
