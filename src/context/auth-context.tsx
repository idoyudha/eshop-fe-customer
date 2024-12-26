"use client"

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { getCurrentUser, signOut, signIn, AuthUser, fetchAuthSession } from 'aws-amplify/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    user: any | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
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
            const session = await fetchAuthSession();
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
    
    const logout = async () => {
        try {
            await signOut();
            setUser(null);
            setIsAuthenticated(false);
            // window.localStorage.removeItem('authToken');
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Logout failed. Please try again.');
        }
    };
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => useContext(AuthContext);