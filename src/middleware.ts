import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export default auth((req: any) => {
    const isLoggedIn = !!req.auth;
    const isProtectedRoute = req.nextUrl.pathname.startsWith("/cart") || req.nextUrl.pathname.startsWith("/order");

    if (!isLoggedIn && isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next();
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};