import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    
    let body = await request.json()
    let id = body.params.replace(/%20/, " ")
    console.log(id)
    let data = await prisma.categorie.findUnique({
        include:{
            posts: true
        },
        where: {
            id: id
        }
    })
    return NextResponse.json({ data })
    
}