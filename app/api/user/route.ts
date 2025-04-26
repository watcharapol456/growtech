"use server"

import db from "@/db"
import {  NextResponse } from "next/server";

export async function GET(){
    try{
        const result = await db.query.users.findMany();
        return NextResponse.json(result);
    }catch (error){
        console.log(error)
    }
}