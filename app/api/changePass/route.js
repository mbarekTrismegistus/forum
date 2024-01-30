import prisma from "@/libs/prismaClient"
import { getServerSession } from "next-auth/next"
import { hash } from "bcryptjs";


export async function POST(request) {
    
    const session = await getServerSession(request)


    if(session){
        
        let Data = await request.json()

        let hashedpass = await hash(Data.data.password,10)
        await prisma.users.update({
            where: {
                id: Data.data.id
            },
            data: {
                password: hashedpass
            }
        })
        
    }
    else{
        console.log("error")
    }
    return Response.json({  })
    
    
}