"use client"

import { Amplify, type ResourcesConfig } from "aws-amplify";
import { CookieStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

export const authConfig: ResourcesConfig["Auth"] = {
    Cognito: {
        userPoolId: String(process.env.userPoolId),
        userPoolClientId: String(process.env.userPoolClientId),
        loginWith: {
            // username: true,
            email: true,
            oauth: {
                domain: String(process.env.userPoolDomain),
                scopes: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
                redirectSignIn: ['https://localhost:3000'],
                redirectSignOut: ['https://localhost:3000'],
                responseType: 'token',
            },
        }
    },
}

Amplify.configure(
    {Auth: authConfig},
    {ssr: true}
)

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());

export default function ConfigureAmplifyClientSide() {
    return null;
}