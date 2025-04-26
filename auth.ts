
import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import {db} from "@/db/index"
import { getUserbyId } from "./actions"
 
export const{
    handlers : {GET , POST},
    auth,signIn,signOut
} = NextAuth({
    callbacks:{
        async session({token,session}){
        
            if(token.sub && session.user){
                session.user.id = token.sub;
                session.user.name = token.name;
                session.user.role = token.role;
            }
            
            return session
        },
        async jwt ({token}){
            
            if(!token.sub) return token;

            const existingUser =  await getUserbyId(token.sub);

            if(!existingUser) return token;

            token.role = existingUser.role;
            

            return token;
        },
    },
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})
