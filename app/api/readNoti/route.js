import prisma from "@/libs/prismaClient"
import { getServerSession } from "next-auth/next"

export async function POST(request) {
    
    const session = await getServerSession(request)
    
    if(session){
        
        let Data = await request.json()
        
        
        await prisma.notifications.update({
            where: {
                id: Data.id
            },
            data: {
                read: true
            }
        })
        
    }
    else{
        console.log("error")
    }
    return Response.json({  })
    
    
}