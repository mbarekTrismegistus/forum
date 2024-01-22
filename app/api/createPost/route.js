import prisma from "@/libs/prismaClient"
import { getServerSession } from "next-auth/next"

export async function POST(request) {
    
    const session = await getServerSession(request)
    
    if(session){
        
        let Data = await request.json()

        await prisma.posts.create({
            data: {
                title: Data.data.title,
                content: Data.data.content,
                user: {
                    connect: { id: 'hermes' },
                },
                categorie: {
                    connect: { id: 'frontend'}
                }
            }
        })
        
    }
    else{
        console.log("error")
    }
    return Response.json({  })
    
    
}
