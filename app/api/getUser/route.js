import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    const body = await request.json()

    let data = await prisma.users.findUnique({
        where: {
            id: body.id
        },
        include:{
            posts: true,
            _count: {
                select: { posts: true },
              },
        }
        
    })
    return NextResponse.json({ data })
    
}