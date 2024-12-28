"use client"

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { getCurrentUser, signOut, signIn, AuthUser, fetchAuthSession, signUp, confirmSignUp } from 'aws-amplify/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    user: AuthUser | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    signup: (email: string, name: string, password: string) => Promise<void>;
    confirmSignupCode: (email: string, code: string) => Promise<void>;
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
                toast.success('Successfully logged in!');
                router.push('/');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed. Please check your credentials and try again.');
            throw error;
        }
    };

    const signup = async (email: string, name: string, password: string) => {
        try {
            const { isSignUpComplete } = await signUp({
                username: name,
                password,
                options: {
                    userAttributes: {
                        email, 
                    },
                    autoSignIn: { 
                        enabled: true
                    }
                }
            });

            if (isSignUpComplete) {
                toast.success('Sign up successful! Please check your email for verification code.');
                router.push('/verify-email');
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast.error('Sign up failed. Please try again.');
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
                toast.success('Email verified successfully! You can now login.');
                router.push('/login');
            }
        } catch (error) {
            console.error('Confirmation error:', error);
            toast.error('Verification failed. Please check the code and try again.');
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
            toast.error('Logout failed. Please try again.');
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
            loading,
            getAccessToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => useContext(AuthContext);