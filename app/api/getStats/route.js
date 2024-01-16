import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {

    let data = await request.json()

    let posts = await prisma.posts.count()

    let categories = await prisma.categorie.count({
        where: {
            dateCreated: {
                gte: data.period
            }
        }
    })

    let users = await prisma.users.count()


    let likes = await prisma.likes.count()


    let comments = await prisma.comments.count()
    
    return NextResponse.json({ data:{
        users: users,
        posts: posts,
        categories: categories,
        likes: likes,
        comments: comments
    } })
    
}