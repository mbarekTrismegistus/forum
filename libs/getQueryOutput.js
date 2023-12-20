import prisma from "./prismaClient"


export async function getuser(id){
    console.log(id)
    let data = await prisma.users.findMany({
        where: {
            id: id
        },
        include: {
            posts: true
        }
    })
    return data
}

export async function getPosts(takeValue){
    
    let data = await prisma.posts.findMany({
        take : takeValue
    })
    return data
}

export async function getPost(id){
    
    let data = await prisma.posts.findMany({
        where:{
            id: id
        }
    })
    return data
}