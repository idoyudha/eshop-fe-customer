"use client"

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, signOut, signIn, AuthUser, fetchAuthSession, signUp, confirmSignUp, resendSignUpCode, signInWithRedirect } from 'aws-amplify/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    user: AuthUser | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    signup: (email: string, username: string, name: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    confirmSignupCode: (email: string, code: string) => Promise<void>;
    resendVerificationCode: (username: string) => Promise<void>;
    getAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // check current user
                const currentUser = await getCurrentUser();
                setUser(currentUser);
                setIsAuthenticated(true);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const getAccessToken = async () => {
        try {
            const session = await fetchAuthSession();
            return session.tokens?.accessToken.toString() || null;
        } catch (error) {
            console.error('Error getting access token:', error);
            return null;
        }
    };  

    const login = async (username: string, password: string) => {
        try {
            const { isSignedIn } = await signIn({ username, password });
            if (isSignedIn) {
                const currentUser = await getCurrentUser();

                setUser(currentUser);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('login error:', error);
            throw error;
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithRedirect({
                provider: 'Google'
            });
        } catch (error) {
            console.error('Google sign-in error:', error);
            throw error;
        }
    };

    const signup = async (email: string, username: string, name: string, password: string) => {
        try {
            await signUp({
                username: username,
                password,
                options: {
                    userAttributes: {
                        email, 
                        name
                    },
                    autoSignIn: { 
                        enabled: true
                    }
                }
            });
        } catch (error) {
            console.error('signup error:', error);
            throw error;
        }
    };

    const confirmSignupCode = async (email: string, code: string) => {
        try {
            await confirmSignUp({
                username: email,
                confirmationCode: code
            });
        } catch (error) {
            console.error('confirmation error:', error);
            throw error;
        }
    };

    const resendVerificationCode = async (username: string) => {
        try {
            await resendSignUpCode({ username });
        } catch (error) {
            console.error('resend confirmation code error:', error);
            throw error;
        }
    };
    
    const logout = async () => {
        try {
            await signOut();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('logout error:', error);
        }
    };
    
    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            user, 
            login, 
            signInWithGoogle,
            logout, 
            signup,
            confirmSignupCode,
            resendVerificationCode,
            loading,
            getAccessToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => useContext(AuthContext);