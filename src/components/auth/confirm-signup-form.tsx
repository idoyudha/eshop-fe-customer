"use client"

import { handleSignUp } from "@/actions/cognito-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FactoryIcon, Icon, Loader2 } from "lucide-react"
import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import { toast } from "sonner"
import AccountSendVerificationCode from "./account-send-verification-code"

const ConfirmButton = () => {
    const { pending } = useFormStatus()

    return (
        <Button 
            type="submit" 
            className="mt-4 w-full" 
            disabled={pending}
            aria-disabled={pending}
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Confirm...
                </>
            ) : (
                'Confirm'
            )}
        </Button>
    )
}

export function ConfirmSignupForm() {
    const [errorMessage, dispatch] = useFormState(handleSignUp, undefined)
    return  (
        <form action={dispatch} className="flex justify-center items-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle>Code Verification</CardTitle>
                    <CardDescription>
                        Please confirm to confirm your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="code">Code</Label>
                            <Input id="code" type="code" name="code"/>
                        </div>
                        <ConfirmButton/>
                        {errorMessage && (
                            toast.error(errorMessage, { duration: 5000 })
                        )}
                        <AccountSendVerificationCode/>
                    </div>
                </CardContent>
            </Card>
        </form>
    )

}