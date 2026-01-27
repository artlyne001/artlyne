"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/constants";

export default function LoginPage() {
    const { user, googleSignIn, emailSignIn } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        try {
            await emailSignIn(email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    if (user) return null;

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden bg-background">
            
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="w-full max-w-md relative z-10 px-6">
                
                {/* Main Card */}
                <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl shadow-brand-primary/5">
                    
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-linear-to-tr from-brand-primary to-brand-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-brand-primary/20 transform rotate-3">
                            <span className="text-3xl font-bold text-white">A</span>
                        </div>
                        <h1 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
                            Welcome Back
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Enter your credentials to access {SITE_CONFIG.name}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl mb-6 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                           {error}
                        </div>
                    )}

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-foreground border border-gray-200 dark:border-white/10 h-14 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-200 group relative overflow-hidden"
                    >   
                        <div className="relative z-10 flex items-center gap-3">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span>Continue with Google</span>
                        </div>
                    </button>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold">
                            <span className="px-4 bg-background text-muted-foreground">Or with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleEmailSignIn} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Email</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-14 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all duration-300 placeholder:text-muted-foreground/50"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
                                <a href="#" className="text-xs font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-14 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all duration-300 placeholder:text-muted-foreground/50"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full h-14 bg-linear-to-r from-brand-primary to-brand-primary-hover text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-brand-primary/30 transform hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] active:translate-y-0"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-brand-primary hover:text-brand-primary-hover font-bold hover:underline underline-offset-4 transition-all">
                            Create Account
                        </Link>
                    </p>
                </div>
                
                {/* Footer Links */}
                <div className="mt-8 flex justify-center gap-6 text-xs text-muted-foreground/60">
                    <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
                </div>
            </div>
        </div>
    );
}
