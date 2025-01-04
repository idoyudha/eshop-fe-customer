import { ResourcesConfig } from 'aws-amplify';
import { createServerRunner } from '@aws-amplify/adapter-nextjs';

export const authConfig = {
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
            userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
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
} satisfies ResourcesConfig;

export const { runWithAmplifyServerContext } = createServerRunner({
    config: authConfig
})