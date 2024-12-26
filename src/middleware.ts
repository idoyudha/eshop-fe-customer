import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./lib/amplify-server-utils";

export async function middleware(request:NextRequest) {
    const response = NextResponse.next();
    const authenticated = await authenticatedUser({ request, response})
    const isOnCart = request.nextUrl.pathname.startsWith("/cart")
    const isOnOrder = request.nextUrl.pathname.startsWith("/order")
    const isOnAuthPage = request.nextUrl.pathname.startsWith("/auth")
    const isInLandingPage = request.nextUrl.pathname.valueOf() === "/"
    if (isOnCart && isOnOrder && !authenticated) {
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl))
    }
    // if ((isOnAuthPage || isInLandingPage) && authenticated) {
    //     return NextResponse.redirect(new URL("/", request.nextUrl))
    // }
    return response
}

export const config = {
    /*
     * Match all request paths except for the ones starting with
     */
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};