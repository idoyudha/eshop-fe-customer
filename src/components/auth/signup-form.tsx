"use client"

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { FactoryIcon, Loader2 } from "lucide-react";
import { handleSignUp } from "@/actions/cognito-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { EshopLink } from "../eshop-link";
import { toast } from "sonner";

const CreateAccountButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button 
            type="submit" 
            className="w-full" 
            disabled={pending}
            aria-disabled={pending}
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                </>
            ) : (
                'Create an account'
            )}
        </Button>
    )
}

export function SignupForm() {
    const [errorMessage, dispatch] = useFormState(handleSignUp, undefined)
    return  (
        <form action={dispatch}>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first_name">First name</Label>
                                <Input id="first_name" name="first_name" placeholder="Max" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last_name">Last name</Label>
                                <Input id="last_name" name="last_name" placeholder="Robinson" required />
                            </div>
                        </div>
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
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" name="password" autoComplete="on"/>
                        </div>
                        <CreateAccountButton/>
                        <Button variant="outline" className="w-full">
                            <FactoryIcon className="mr-2 h-4 w-4" />
                            Sign up with Google
                        </Button>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <EshopLink href="/auth/login" className="underline">
                                Login
                            </EshopLink>
                        </div>
                    </div>
                    {errorMessage && (
                        toast.error(errorMessage, { duration: 5000 })
                    )}
                </CardContent>
            </Card>
        </form>
    )
}