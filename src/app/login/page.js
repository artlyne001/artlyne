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
        <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-background px-4">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to continue to {SITE_CONFIG.name}</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleGoogleSignIn}
                    className="w-full bg-white text-black h-12 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors mb-6"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                    Sign in with Google
                </button>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-background text-gray-400">Or continue with</span>
                    </div>
                </div>

                <form onSubmit={handleEmailSignIn} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 focus:outline-none focus:border-brand-pink transition-colors"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 focus:outline-none focus:border-brand-pink transition-colors"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full h-11 bg-brand-pink text-white font-bold rounded-xl hover:bg-brand-pink-hover transition-colors shadow-lg shadow-brand-pink/20"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-brand-pink hover:text-brand-pink-hover font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
