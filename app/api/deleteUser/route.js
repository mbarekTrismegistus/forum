import prisma from "@/libs/prismaClient"
import { getServerSession } from "next-auth/next"

export async function POST(request) {
    
    const session = await getServerSession(request)
    
    if(session){
        
        let Data = await request.json()

        await prisma.users.delete({
            where:{
                id: Data.id
            }
        })
        
    }
    else{
        console.log("error")
    }
    return Response.json({  })
    
    
}