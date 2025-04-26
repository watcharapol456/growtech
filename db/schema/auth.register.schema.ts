import * as z from "zod"

export const RegisterSchema = z.object({
    username : z.string().min(1,{
        message : "Username is required",
    }),
    password: z.string().min(6,{
        message: "Minimum 6 characters required"
    }),
    name:z.string().min(1,{
        message:"name is required",
    }),
})