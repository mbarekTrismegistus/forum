import prisma from "@/libs/prismaClient";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcryptjs";

let userAccount = null

export const authOptions = {
    
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
      secret: process.env.NEXTAUTH_SECRET
    },
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label : "username", type: "text"},
                password: {label : "Password", type: "password"}
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const userAccount = await prisma.users.findUnique({
                  where: {
                    id: credentials.username
                  }
                })
          
                if (userAccount) {
                  console.log(userAccount)
                  let pass = await prisma.users.findUnique({
                    select:{
                      password: true
                    },
                    where:{
                      id: credentials.username
                    }
                  })
                  
                 
                  
                  if(compareSync(credentials.password, pass.password)){
                    return userAccount
                  }
              
                } else {
                  // If you return null then an error will be displayed advising the user to check their details.
                  return null
          
                  // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
              }


        })
        
    ],
    callbacks: {
      async jwt({session,token,user}) {
        
        if(user){
          // console.log(user)
          return {
            ...token,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            dateJoined: user.dateJoined
          }
        }
        return token;
      },
      async session({ session, token, user }) {
        
        return {
          ...session.user,
          id: token.id,
          firstName: token.firstName,
          lastName: token.lastName,
          role: token.role,
          dateJoined: token.dateJoined

        }
      },
      async redirect({ url, baseUrl }) {
        return url
      }
    }
}

export const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}