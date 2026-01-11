"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/config/constants";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logOut } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 shadow-[0px_4px_4px_0px_#A4A4A440]">
            <div className="max-w-7xl mx-auto px-6 md:px-22.5 h-21.5 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <img src="/assets/logo.png" alt={SITE_CONFIG.name} className="h-8 w-auto" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {SITE_CONFIG.navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium text-foreground/80 hover:text-brand-pink transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Login/User Button (Desktop) */}
                <div className="hidden md:block">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {user.photoURL ? (
                                    <img 
                                        src={user.photoURL} 
                                        alt={user.displayName || "User"} 
                                        className="w-9 h-9 rounded-full border border-white/10"
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-brand-pink flex items-center justify-center text-white font-bold border border-white/10">
                                        {user.email?.[0]?.toUpperCase() || "U"}
                                    </div>
                                )}
                            </div>
                            <button 
                                onClick={logOut}
                                className="text-sm font-medium text-foreground/80 hover:text-brand-pink transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/login">
                            <button className="w-30 h-9 rounded-[18px] border-[0.47px] border-brand-pink bg-brand-pink text-white text-sm font-bold hover:bg-brand-pink-hover transition-colors shadow-lg shadow-brand-pink/20 flex items-center justify-center gap-2">
                                {SITE_CONFIG.auth.login}
                            </button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-foreground/80"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-21.5 left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-5">
                    <div className="flex flex-col gap-4">
                        {SITE_CONFIG.navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-base font-medium text-foreground/80 hover:text-brand-pink transition-colors py-2 border-b border-border/50"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Login/User Button */}
                    <div className="pt-4">
                        {user ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 py-2">
                                     {user.photoURL ? (
                                        <img 
                                            src={user.photoURL} 
                                            alt={user.displayName || "User"} 
                                            className="w-10 h-10 rounded-full border border-white/10"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center text-white font-bold border border-white/10">
                                            {user.email?.[0]?.toUpperCase() || "U"}
                                        </div>
                                    )}
                                    <span className="font-medium">{user.displayName || user.email}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        logOut();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full h-[44px] rounded-xl border border-white/20 text-foreground hover:bg-white/5 transition-colors font-bold flex items-center justify-center gap-2"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <button
                                    className="w-full h-[44px] rounded-xl bg-brand-pink text-white hover:bg-brand-pink-hover transition-colors font-bold shadow-lg shadow-brand-pink/20 flex items-center justify-center gap-2"
                                >
                                    {SITE_CONFIG.auth.login}
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
