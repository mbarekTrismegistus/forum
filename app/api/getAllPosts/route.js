import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    let data = await prisma.posts.findMany({
        
        orderBy:{
            id: "desc"
        } 
    })
    return NextResponse.json({ data })
    
}