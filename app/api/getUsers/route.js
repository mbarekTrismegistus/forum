import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    
    let body = await request.json()

    let data = await prisma.users.findMany({
        take: body.take || undefined,
        where: {
            dateJoined: {
                gte: body?.period
            }
        },
        orderBy: [
            {
                dateJoined: "desc"
            }
        ]
    })
    return NextResponse.json({ data })
    
}