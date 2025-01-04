"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/auth-context';

export function ResendVerificationButton({ username }: { username: string }) {
    const { resendVerificationCode } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    const handleResend = async () => {
        if (cooldown > 0 || isLoading) return;

        setIsLoading(true);
        try {
            await resendVerificationCode(username);
            setCooldown(30);
            const timer = setInterval(() => {
                setCooldown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (error) {
            console.error('Failed to resend code:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="link"
            className="px-0"
            disabled={cooldown > 0 || isLoading}
            onClick={handleResend}
        >
            {cooldown > 0 
                ? `Resend code in ${cooldown}s` 
                : isLoading 
                    ? 'Sending...' 
                    : "Didn't receive a code? Click to resend"
            }
        </Button>
    );
}