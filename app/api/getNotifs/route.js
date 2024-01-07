import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    
    const body = await request.json()
    console.log(body.data)  
    let data = await prisma.notifications.findMany({
        where: {
            notifiedId: body.data,
        },
        include: {
            notifier: true
        },
        orderBy:{
            date: "desc"
        }
        
    })
    return NextResponse.json({ data })
    
}