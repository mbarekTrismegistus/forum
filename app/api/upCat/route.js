import prisma from "@/libs/prismaClient"
import { getServerSession } from "next-auth/next"

export async function POST(request) {
    
    const session = await getServerSession(request)
    
    if(session){
        
        let Data = await request.json()
        let categorie = Data.data.currentId.replace(/%20/, " ")


        await prisma.categorie.update({
            where: {
                id: categorie
            },
            data: {
                id: Data.data.id,
                content: Data.data.content,
                image: Data.data.image
            }
        })
        
    }
    else{
        console.log("error")
    }
    return Response.json({  })
    
    
}