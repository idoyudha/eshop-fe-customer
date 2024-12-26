"use client"

import { AuthProvider } from '@/context/auth-context';
import { Amplify } from 'aws-amplify';

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
            userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
            signUpVerificationMethod: 'code',
            loginWith: {
                oauth: {
                    domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN!,
                    scopes: ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
                    redirectSignIn: [process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_IN!],
                    redirectSignOut: [process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_OUT!],
                    responseType: 'code'
                }
            }
        }
    }
})

export function Providers({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>
}