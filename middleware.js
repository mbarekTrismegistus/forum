import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'



export default withAuth(function middleware(req){
        secret: process.env.NEXTAUTH_SECRET
        if(req.nextUrl.pathname === "/admin" && req.nextauth.token.role === "user"){
            
            return NextResponse.redirect(req.nextUrl.origin)
        }
        },
        {
            callbacks:{
                authorized: ({token}) => !!token
            }
        }
)
export const config = {
    matcher: ['/admin']
}