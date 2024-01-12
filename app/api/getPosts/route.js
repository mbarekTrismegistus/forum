import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    
    const body = await request.json()
    let categorie = body.data.cat.replace(/%20/, " ")
    let data = await prisma.posts.findMany({
        where:{
            categorieId: categorie
        },
        orderBy:{
            id: "desc"
        },
        include: {
            user: true,
            _count: {
                select: {
                    comments : true,
                    likes: true
                },
                
            },
                likes: {
                    where: {
                        userId: body.data.user
                    },
                    select: {
                        userId: true,
                        id: true
                    }
                }

        }

        
    })
    return NextResponse.json({ data })
    
}