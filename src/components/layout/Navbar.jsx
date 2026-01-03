"use client";

import Link from "next/link";
import { Menu, X, ChevronDown, User, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config/constants";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsLoginOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 shadow-[0px_4px_4px_0px_#A4A4A440]">
            <div className="max-w-[1280px] mx-auto px-6 md:px-[90px] h-[86px] flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className={`text-xl font-bold bg-clip-text text-transparent ${SITE_CONFIG.theme.gradient}`}>
                        {SITE_CONFIG.name}
                    </span>
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

                {/* Auth Dropdown (Desktop) */}
                <div className="hidden md:block relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsLoginOpen(!isLoginOpen)}
                        className="w-[120px] h-[36px] rounded-[18px] border-[0.47px] border-brand-pink bg-brand-pink text-white text-sm font-bold hover:bg-brand-pink-hover transition-colors shadow-lg shadow-brand-pink/20 flex items-center justify-center gap-2 group"
                    >
                        {SITE_CONFIG.auth.login}
                        <ChevronDown size={16} className={`transition-transform duration-200 ${isLoginOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isLoginOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-border/50 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col p-1">
                            <Link 
                                href="#" 
                                onClick={() => setIsLoginOpen(false)}
                                className="px-4 py-3 hover:bg-brand-pink/5 hover:text-brand-pink text-sm font-medium flex items-center gap-3 rounded-xl transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full border border-border/50 overflow-hidden">
                                     <img src="./assets/ajmal-avatar.png" alt="User" className="w-full h-full object-cover" />
                                </div>
                                User
                            </Link>
                            <Link 
                                href="/admin" 
                                onClick={() => setIsLoginOpen(false)}
                                className="px-4 py-3 hover:bg-brand-pink/5 hover:text-brand-pink text-sm font-medium flex items-center gap-3 rounded-xl transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink">
                                    <ShieldCheck size={16} />
                                </div>
                                Admin
                            </Link>
                        </div>
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
                <div className="md:hidden absolute top-[86px] left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-5">
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
                    
                    {/* Mobile Auth Options */}
                    <div className="flex flex-col gap-3">
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Login as</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="h-[44px] rounded-xl border border-border bg-background hover:bg-secondary transition-colors font-medium flex items-center justify-center gap-2 p-1">
                                <div className="w-6 h-6 rounded-full overflow-hidden border border-border/50">
                                    <img src="./assets/ajmal-avatar.png" alt="User" className="w-full h-full object-cover" />
                                </div>
                                User
                            </button>
                            <Link 
                                href="/admin" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="h-[44px] rounded-xl bg-brand-pink text-white hover:bg-brand-pink-hover transition-colors font-bold shadow-lg shadow-brand-pink/20 flex items-center justify-center gap-2"
                            >
                                <ShieldCheck size={18} /> Admin
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
