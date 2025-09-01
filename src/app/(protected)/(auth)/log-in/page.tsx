"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SigninFormSchema } from "@/lib/Schemas/signinForm.schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useState } from "react";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { API } from "@/lib/constants";
import Link from "next/link";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function SignInForm() {
   // useRedirectIfLoggedIn();
  
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninFormSchema>) {
    setIsPosting(true);
    setError(null);
  
    try {
      const response = await axios.post(API.AUTH.LOGIN, values);
  
      // store accessToken in redux store
      if (response.data.accessToken) {       
        console.log("Sign-in Response:\nAccessToken:",response.data.accessToken);
      }

      setError("Sign-in successful!");
      
      // Redirect to home page or dashboard
      // router.push("/");
    } catch (error) {
      if(error instanceof AxiosError) {
        if(error.response?.status === 404) {
          setError("User not found. Please check your email.");
          form.setError("email", {
            type: "manual",
            message: "User not found. Please check your email."
          });
          return; 
        }
        if(error.response?.status === 401) {
          setError("Invalid email or password. Please try again.");
          form.setError("password", {
            type: "manual",
            message: "Invalid email or password. Please try again."
          });
          return;
        }
      }
      setError(error instanceof Error ? error.message : "Sign-in failed");
      console.log(error);
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <div className="container mx-auto">
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-10 border border-gray-300 shadow-xl rounded-lg">
        <h1 className="text-2xl font-bold">Log In</h1>
        <p className="text-sm text-gray-500 mb-4">
          Welcome back! Please sign in to your account
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email" />
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
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pr-10"
                        autoComplete="off"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={isPosting} className="w-full">
              {isPosting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
                </div>
              ) : (
                "Log In"
              )}
            </Button>
            
            <div className="flex justify-start items-center gap-2">
              <span className="text-sm text-gray-500">
                Don&apos;t have an account?
              </span>
              <Link href="/sign-up" className="text-blue-500 hover:text-blue-700">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  </div>
  );
}
