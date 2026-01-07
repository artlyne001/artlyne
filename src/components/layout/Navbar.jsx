"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/config/constants";
import { useState } from "react";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

                {/* Login Button (Desktop) */}
                <div className="hidden md:block">
                    <button className="w-30 h-9 rounded-[18px] border-[0.47px] border-brand-pink bg-brand-pink text-white text-sm font-bold hover:bg-brand-pink-hover transition-colors shadow-lg shadow-brand-pink/20 flex items-center justify-center gap-2">
                        {SITE_CONFIG.auth.login}
                    </button>
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

                    {/* Mobile Login Button */}
                    <div className="pt-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full h-[44px] rounded-xl bg-brand-pink text-white hover:bg-brand-pink-hover transition-colors font-bold shadow-lg shadow-brand-pink/20 flex items-center justify-center gap-2"
                        >
                            {SITE_CONFIG.auth.login}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
