import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    
    let body = await request.json()
   
    let data = await prisma.comments.findMany({
        orderBy:{
            dateCommented: "desc"
        },
        where: {
            postId: body.id
        }
        
    })
    return NextResponse.json({ data })
    
}