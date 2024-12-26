import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isCartPath = path.match(/\/cart($|\/)/)
    const isOrderPath = path.match(/\/order($|\/)/)
    

    const token = req.cookies.get('CognitoIdentityServiceProvider')?.value

    if ((isCartPath || isOrderPath) && !token) {
        const response = NextResponse.redirect(new URL('/login', req.url))
        return response
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/cart/:path*',
        '/order/:path*',
    ]
}