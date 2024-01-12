import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    const body = await request.json()
    let data = await prisma.posts.findUnique({
        where: {
            id: body.id
        },
        include:{
            comments: {
                include: {
                    likes: true,
                    _count: {
                        select: {
                            likes: true
                        }
                    }
                },
                orderBy: {
                    dateCommented: "desc"
                }
            }
        }
        
    })
    return NextResponse.json({ data })
    
}