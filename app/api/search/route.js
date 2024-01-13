import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    
    const body = await request.json()
    console.log(body.query)
    let posts = await prisma.posts.findMany({
        where: {
            title: {
                search: body.query.split(" ").join(" & ")
            },
            content: {
                search: body.query.split(" ").join(" & ")
            }
        }
        
    })
    let categories = await prisma.categorie.findMany({
        where: {
            id: {
                search: body.query.split(" ").join(" & ")
            }
        }
        
    })

    let users = await prisma.users.findMany({
        where: {
            id: {
                search: body.query.split(" ").join(" & ")
            },
            firstName: {
                search: body.query.split(" ").join(" & ")
            },
            lastName: {
                search: body.query.split(" ").join(" & ")
            }
        }
        
    })
    
    return NextResponse.json({ data:{
        users: users,
        posts: posts,
        categories: categories
    } })
    
}