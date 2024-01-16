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

    let users = await prisma.users.count({
        where: {
            dateJoined: {
                gte: data.period
            }
        }
    })


    let likes = await prisma.likes.count({
        where: {
            dateLiked: {
                gte: data.period
            }
        }
    })


    let comments = await prisma.comments.count({
        where: {
            dateCommented: {
                gte: data.period
            }
        }
    })
    
    return NextResponse.json({ data:{
        users: users,
        posts: posts,
        categories: categories,
        likes: likes,
        comments: comments
    } })
    
}