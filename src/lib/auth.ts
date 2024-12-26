import NextAuth from "next-auth"
import CognitoProvicer from "next-auth/providers/cognito"

export const authConfig = {
    providers: [
        CognitoProvicer({
            clientId: process.env.COGNITO_CLIENT_ID || '',
            clientSecret: process.env.COGNITO_CLIENT_SECRET || '',
            issuer: process.env.COGNITO_ISSUER,
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user } : { token: any, user: any }) {
          return { ...token, ...user };
        },
        async session({ session, token }: { session: any, token: any }) {
          session.user = token as any;
          return session;
        },
    },
}

export const { handlers: { GET, POST }, auth } = NextAuth(authConfig);