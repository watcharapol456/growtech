"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/actions";
import { Button } from "../ui/button";

interface DeleteButtonProps {
  userId: string;
  onDeleted: () => void; // <<< เพิ่ม
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ userId, onDeleted }) => {
  const handleDelete = async () => {
    try {
      const deletedPost = await deleteUser(userId);

      if (deletedPost) {
        console.log("Post deleted successfully");
        onDeleted(); 
      } else {
        return null
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return <Button onClick={handleDelete} className="bg-red-400">Delete</Button>;
};

export default DeleteButton;
