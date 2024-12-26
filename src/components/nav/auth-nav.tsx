"use client"

import { useAuth } from "@/context/auth-context";
import { EshopLink } from "../eshop-link";
import { Button, buttonVariants } from "../ui/button";
import { useState } from "react";

export const AuthNav = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isAuthenticated) {
        return (
            <Button 
                variant="outline"
                size="sm"
                onClick={handleLogout}
                disabled={isLoading}
            >
                {isLoading ? "Logging out..." : "Logout"}
            </Button>
        );
    }

    return (
        <>
            <EshopLink 
                className={buttonVariants({
                    size: "sm",
                })}
                href="/auth/login"
            >
                Login
            </EshopLink>
        </>
    )
};