import prisma from "@/libs/prismaClient"
import { getServerSession } from "next-auth/next"
import bcrypt from 'bcryptjs'
import { hash } from "bcryptjs";

export async function POST(request) {
    
    
    const session = await getServerSession(request)
    
    if(session){
        
        
        console.log("signout first")
        
    }
    else{
        let Data = await request.json();

        let hashedpass = await hash(Data.data.data.password,10)
        

        
        await prisma.users.create({
            data: {
                ...Data.data.data,
                password: hashedpass
            }
        })
    }
    return Response.json({  })
    
    
}