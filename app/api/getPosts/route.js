import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    
    const body = await request.json()
    let categorie = body.data.cat?.replace(/%20/, " ")
    let postsCount = await prisma.posts.count()
    let data = await prisma.posts.findMany({
        skip: body.data.skip - 5 || undefined,
        take: body.data.take,
        where:{
            categorieId: categorie,
            userId: body.data.user
        },
        orderBy:{
            dateCreated: "desc"
        },
        include: {
            user: true,
            _count: {
                select: {
                    comments : true,
                    likes: true,
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