import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    
    let body = await request.json()

    let data = await prisma.posts.findMany({
        where: {
            id: body.data.post.id
        },
        include: {
            likes: true
        }
    })
    return NextResponse.json({ data })
    
}