"use client"

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { getCurrentUser, signOut, signIn, AuthUser, fetchAuthSession, signUp, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    user: AuthUser | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    signup: (email: string, username: string, name: string, password: string) => Promise<void>;
    confirmSignupCode: (email: string, code: string) => Promise<void>;
    resendVerificationCode: (username: string) => Promise<void>;
    getAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);
    
    useEffect(() => {
        const attachAuthHeader = async () => {
            try {
                const session = await fetchAuthSession();
                console.log('session:', session);
                if (session?.tokens?.accessToken) {
                    const token = session.tokens.accessToken.toString();
                    // window.localStorage.setItem('authToken', token);
                }
            } catch (error) {
                console.error('Error fetching auth session:', error);
                // window.localStorage.removeItem('authToken');
            }
        };
    
        if (isAuthenticated) {
            attachAuthHeader();
        }
    }, [isAuthenticated]);

    const checkAuth = async () => {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setIsAuthenticated(true);
            // const session = await fetchAuthSession();
            // if (session?.tokens?.accessToken) {
            //     window.localStorage.setItem('authToken', session.tokens.accessToken.toString());
            // }
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            // window.localStorage.removeItem('authToken');
        } finally {
            setLoading(false);
        }
    };

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
                router.push('/');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const signup = async (email: string, username: string, name: string, password: string) => {
        try {
            const { isSignUpComplete } = await signUp({
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

            if (isSignUpComplete) {
                router.push('/auth/verify');
            }
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    };

    const confirmSignupCode = async (email: string, code: string) => {
        try {
            const { isSignUpComplete } = await confirmSignUp({
                username: email,
                confirmationCode: code
            });

            if (isSignUpComplete) {
                router.push('/');
            }
        } catch (error) {
            console.error('Confirmation error:', error);
            throw error;
        }
    };

    const resendVerificationCode = async (username: string) => {
        try {
            await resendSignUpCode({ username });
        } catch (error) {
            console.error('Resend confirmation code error:', error);
            throw error;
        }
    };
    
    const logout = async () => {
        try {
            await signOut();
            setUser(null);
            setIsAuthenticated(false);
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    
    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            user, 
            login, 
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