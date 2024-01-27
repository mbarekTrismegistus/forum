import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    let body = await request.json()
    let id = body.id.replace(/%20/, " ")

    let data = await prisma.posts.count({
        where: {
            categorieId: id
        }
    })

    return NextResponse.json({ data })
    
}