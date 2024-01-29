import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    
    let body = await request.json()
    let id = body.params.replaceAll(/%20/, " ")

    let data = await prisma.categorie.findUnique({
        include:{
            posts: {
                include: {
                    user: true,
                    _count: {
                        select: {comments : true}
                    }
                }
                
            }
        },
        where: {
            id: id
        }
    })
    return NextResponse.json({ data })
    
}