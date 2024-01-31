import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    let body = await request.json()

    let data = await prisma.posts.findMany({
        where: {
            userId: body.data.id,
            dateCreated: {
                gte: body.data.period
            }
        },
        orderBy:{
            id: "desc"
        } 
    })
    return NextResponse.json({ data })
    
}