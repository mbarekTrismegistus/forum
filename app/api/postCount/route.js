import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    let body = await request.json()
    let data = await prisma.posts.count({
        where: {
            categorieId: body.id
        }
    })
    return NextResponse.json({ data })
    
}