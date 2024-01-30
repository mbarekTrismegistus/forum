import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'



export default withAuth(function middleware(req){
        secret: process.env.NEXTAUTH_SECRET
        console.log(req.nextUrl.pathname)
        console.log(req.nextUrl.pathname.startsWith("/admin",))
        if(req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token.role === "user"){
            
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
    matcher: ['/admin','/admin/:path*']
}