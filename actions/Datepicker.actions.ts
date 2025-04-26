"use server"

export async function action(fromData:FormData) {
    console.log("Date :",typeof(fromData.get("date")) )
}