import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "./lib/auth-config";
import { fetchAuthSession } from 'aws-amplify/auth/server';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next()

    const authenticated = await runWithAmplifyServerContext({
        nextServerContext: { request, response },
        operation: async (contextSpec) => {
            try {
                const session = await fetchAuthSession(contextSpec)
                return (
                    session.tokens?.accessToken !== undefined &&
                    session.tokens?.idToken !== undefined
                )
            } catch (error) {
                console.log(error);
                return false
            }
        }
    })

    const isCartPath = request.nextUrl.pathname.match(/\/cart($|\/)/)
    const isOrderPath = request.nextUrl.pathname.match(/\/order($|\/)/)
    if ((isCartPath || isOrderPath) && !authenticated) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return response;
}

export const config = {
    matcher: [
        '/cart/:path*',
        '/order/:path*',
    ]
}