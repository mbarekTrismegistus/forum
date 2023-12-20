import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    const body = await request.json()
    let data = await prisma.posts.findMany({
        orderBy:{
            id: "desc"
        },
        where: {
            id: body.id
        }
        
    })
    return NextResponse.json({ data })
    
}