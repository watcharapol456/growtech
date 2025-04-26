import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { Loginschema } from "./db/schema";

export default {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
     

        const validatedFields = Loginschema.safeParse(credentials);

  
        if (validatedFields.success) {
      

          const { username, password } = validatedFields.data;

          const values = {
            username: username,
            password: password,
          };

    

          const responseAuth = await fetch("http://localhost:3000/api/login/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

       
          console.log("[DEBUG] responesAuth before", responseAuth);

          if (!responseAuth.ok) {
            console.error("Authentication failed:", responseAuth.statusText);
            return null;
          }

          console.log("[DEBUG] responesAuth after", responseAuth);

          try {
       
            const { success, user, error } = await responseAuth.json();

      
            if (!user || error) return null;

            if (success && user) {
              console.log("[DEBUG] start 5", user);
              return JSON.parse(user);
            } else {
              return null
            }

          } catch (error) {
            console.log("Error in authorize:", error);
            return null; // ในกรณีที่เกิดข้อผิดพลาด, ส่งคืน null
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
