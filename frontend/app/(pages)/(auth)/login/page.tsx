"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Loader2 } from 'lucide-react'
import Navbar from "@/components/navbar-user"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { verifyToken } from "@/common/tokenizer"
import { appInfo, assets } from "@/app/config"

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true)

    // API
    setTimeout(() => {
      setIsLoading(false);

      // API HERE
      // ....

      const dummyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
      Cookies.set("authToken", dummyToken, { expires: 7, secure: false, path: "/" });
      toast.success("Login Successful");
      router.push("/collections");
    }, 2000);
  }

  if (verifyToken()) {
    router.push("/collections")
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mx-auto max-w-sm flex flex-col items-center justify-center mb-10">
            <Link href="/" className="flex flex-col items-center gap-2">
              <img
                src={assets.logoUrl}
                className="w-8"
                alt="logo"
              />
              <span className="text-xl font-bold uppercase">{appInfo.appName}</span>
            </Link>
          </div>
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Log in"
                    )}
                  </Button>
                </form>
              </Form>
              <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="font-medium underline">
                  Register here
                </Link>
              </p>
              <p className="mt-2 text-center text-sm text-gray-600">
                You're admin?{" "}
                <Link href="/login_admin" className="font-medium underline">
                  Login here
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

