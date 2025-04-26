import { User } from "next-auth"

declare module 'next-auth/jwt'{
    interface JWT{
        id : Userid
        role : RoleEnum
    }
}


declare module 'next-auth' {
    interface Session {
        user : User &{
            id:Userid
            role : RoleEnum
        }
    }
}