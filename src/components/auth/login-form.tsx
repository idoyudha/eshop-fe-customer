"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EshopLink } from "../eshop-link"
import { useFormState, useFormStatus } from "react-dom"
import { FactoryIcon, Loader2 } from "lucide-react"
import { handleSignIn } from "@/actions/cognito-auth"
import { useRouter } from "next/navigation"
import { signInWithRedirect } from "aws-amplify/auth"
import { toast } from "sonner"

interface LoginFormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const LoginButton = () => {
  const { pending } = useFormStatus()

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
                  Login...
              </>
          ) : (
              'Login'
          )}
      </Button>
  )
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [errorMessage, dispatch] = useFormState(handleSignIn, undefined)
  const router = useRouter()

  const signInWithGoogle = async () => {
      try {
          await signInWithRedirect({ provider: "Google" })
      } catch (error) {
          console.error(error)
      }
      router.push("/")
  }

  return (
    <div>
        <form action={dispatch}>
            <div className="mx-auto grid w-[350px] gap-6">
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
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <EshopLink
                            href="/forgot-password"
                            className="ml-auto inline-block text-sm underline"
                        >
                            Forgot your password?
                        </EshopLink>
                    </div>
                    <Input 
                        id="password" 
                        type="password" 
                        name="password" 
                        autoComplete="on" 
                        required 
                    />
                    </div>
                    <LoginButton/>
                    <Button variant="outline" className="w-full" onClick={signInWithGoogle}>
                        <FactoryIcon className="mr-2 h-4 w-4" />
                        Login with Google
                    </Button>
                </div>
                {errorMessage && (
                    toast.error(errorMessage, { duration: 5000 })
                )}
            </div>
        </form>
    </div>
  )
}
