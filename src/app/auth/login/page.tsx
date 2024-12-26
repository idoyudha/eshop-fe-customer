import { LoginForm } from "@/components/auth/login-form"
import { EshopLink } from "@/components/eshop-link"
import Image from "next/image"
import CarImage from "@/images/rav4.jpg";

export default function LoginPage() {
  return (
    <>  
      <div className="flex flex-col items-center justify-center h-screen">
          <div className="grid gap-2 text-center my-4">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
          </div>
          <LoginForm/>
          <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <EshopLink href="/auth/signup" className="underline">
                  Sign up
              </EshopLink>
          </div>
      </div>
    </>
  )
}