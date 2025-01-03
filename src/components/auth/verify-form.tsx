"use client"

import { useAuth } from "@/context/auth-context"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { cn } from "@/lib/utils"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { ResendVerificationButton } from "./resend-verification-button"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function VerifyForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    const searchParams = useSearchParams()
    const [username, setUsername] = useState(searchParams.get('username') || "")
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)
    const { toast } = useToast();
    const router = useRouter()

    const { confirmSignupCode } = useAuth()
    const handleConfirmSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            await confirmSignupCode(username, code);
            toast({
                title: 'Verification successful',
                description: 'Verification successful. You can now login.',
            })
            router.push('/auth/login');
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Verification failed',
                description: 'Verification failed. Please try again.',
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Code Verification</CardTitle>
                    <CardDescription>
                        Please enter the verification code sent to your email
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleConfirmSignUp}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    readOnly
                                    className="bg-muted"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Code</Label>
                                <Input
                                    id="code"
                                    type="code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                            
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" /> : 'Verify'}
                            </Button>

                            <div className="text-center">
                                <ResendVerificationButton username={username} />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}