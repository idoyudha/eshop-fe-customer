import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isCartPath = path.match(/\/cart($|\/)/)
    const isOrderPath = path.match(/\/order($|\/)/)

    const authHeader = req.headers.get('Authorization');
    const isAuthenticated = !!authHeader && authHeader.startsWith('Bearer ');

    if ((isCartPath || isOrderPath) && !isAuthenticated) {
        const response = NextResponse.redirect(new URL('/auth/login', req.url))
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