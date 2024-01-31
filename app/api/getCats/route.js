import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    
    let body = await request.json()
    
    let data = await prisma.categorie.findMany({
        where: {
            dateCreated: {
                gte: body.data.period
            }
        }
    })
    return NextResponse.json({ data })
    
}