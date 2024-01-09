import prisma from "@/libs/prismaClient"
import { NextResponse } from 'next/server'

export async function GET(request) {
    
    
    let data = await prisma.categorie.findMany({
        
    })
    return NextResponse.json({ data })
    
}