import prisma from "@/libs/prismaClient"
import { getServerSession } from "next-auth/next"

export async function POST(request) {
    
    const session = await getServerSession(request)
    
    if(session){
        
        let Data = await request.json()
        console.log(Data)
        await prisma.posts.create({
            data: Data.data
        })
        
    }
    else{
        console.log("error")
    }
    return Response.json({  })
    
    
}