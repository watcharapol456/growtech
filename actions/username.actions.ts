"use server";
import db from "@/db";
import { users } from "@/db/schema";

import { eq } from "drizzle-orm";

interface editUser {
  name: string;
  username: string;
  password:string;
}

export async function editUser(updateUser: editUser, id: string) {
  try {
    const editResult = await db
      .update(users)
      .set({
        username: updateUser.username,
        name: updateUser.name,
        password:updateUser.password,
      })
      .where(eq(users.id, id)); 

    console.log("Edit User Result:", editResult);
    return editResult;
  } catch (error) {
    console.error("Error Update Data: ", error);
    throw new Error("Failed to update user data.");
  }
}

export async function getUserbyId(id: string) {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .execute();

    return user[0];
  } catch (error) {
    console.error("Error get by ID:", error);
  }
}

export async function deleteUser(userId: string) {
  try {
    const deleteUser = await db
      .delete(users)
      .where(eq(users.id, userId))
      .returning();
      return deleteUser[0];
  } catch (error) {
    console.log(error);
  }
}
