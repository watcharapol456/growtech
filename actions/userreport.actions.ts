"use server";
import { auth } from "@/auth";
import db from "@/db";
import { userreport } from "@/db/schema";

import { eq } from "drizzle-orm";

interface ReportData {
  description: string;
  name: string;
  topic: string;
}

export async function insertReportdata(postInfo: ReportData) {
  const session = await auth();
  if (!session || !session.user || !session.user.name) {
    throw new Error("User not authenticated");
  }
  try {
    const newPost = await db
      .insert(userreport)
      .values({
        description: postInfo.description,
        topic: postInfo.topic,
        name: session.user.name,
      })
      .returning();

    return newPost[0];
  } catch (error) {
    console.error("Error saving data:", error);
    throw error;
  }
}

export async function getUserreportbyId(id: number) {
  try {
    const report = await db
      .select()
      .from(userreport)
      .where(eq(userreport.id, id))
      .limit(1);
    if (report.length === 0) {
      throw new Error(`UserReport with id ${id} not found`);
    }

    return report[0];
  } catch (error) {
    console.error("Error get by ID :", error);
  }
}
