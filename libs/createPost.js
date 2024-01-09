import prisma from "./prismaClient"

export async function createPost(postData) {
    prisma.users.create({
        data: postData
    })
    return (
        <div>createPost</div>
    )
}
