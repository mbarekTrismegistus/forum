import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    
    const body = await request.json()
    let posts = await prisma.posts.findMany({
        where: {
            title: {
                search: "yjffgcccgfcfcfgfxgfxf"
            }
        }
        
    })
    // let categories = await prisma.categorie.findMany({
    //     where: {
    //         id: {
    //             search: body.query
    //         }
    //     }
        
    // })

    // let users = await prisma.users.findMany({
    //     where: {
    //         id: {
    //             search: body.query
    //         },
    //         firstName: {
    //             search: body.query
    //         },
    //         lastName: {
    //             search: body.query
    //         }
    //     }
        
    // })
    
    return NextResponse.json({ data:{
        // users: users,
        posts: posts
        // categories: categories
    } })
    
}
