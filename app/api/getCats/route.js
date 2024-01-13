import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function POST(request) {
    
    
    let data = await prisma.categorie.findMany({
        
    })
    return NextResponse.json({ data })
    
}
