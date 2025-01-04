"use client"

import { AuthProvider } from "@/context/auth-context";
import { authConfig } from "@/lib/auth-config";
import { Amplify } from "aws-amplify"

// https://docs.amplify.aws/nextjs/build-a-backend/server-side-rendering/
// client side configuration
Amplify.configure(authConfig, {
    ssr: true
});

export function Providers({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>
}