"use client";

import { Twitter } from "lucide-react";
import { Instagram } from "lucide-react";
import { Github } from "lucide-react";
import { Linkedin } from "lucide-react";
import { SITE_CONFIG } from "@/config/constants";

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-24 pb-12 px-6 md:px-[90px]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
                    <div className="col-span-2 lg:col-span-2 space-y-4">
                        <img src="/assets/logo.png" alt={SITE_CONFIG.name} className="h-10 w-auto" />
                        <p className="text-gray-400 max-w-xs">
                            {SITE_CONFIG.description}
                        </p>
                    </div>

                    {/* <div className="space-y-4">
                        <h4 className="font-bold text-lg">Product</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Discover</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Editor</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Plugins</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
                        </ul>
                    </div> */}

                    <div className="space-y-4">
                        <h4 className="font-bold text-lg">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-lg">Support</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-lg">Social</h4>
                        <div className="flex gap-4">
                            {/* <a href="#" className="hover:text-brand-pink transition-colors"><Twitter className="w-5 h-5" /></a> */}
                            <a href="#" className="hover:text-brand-pink transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-brand-pink transition-colors"><Github className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-brand-pink transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>{SITE_CONFIG.footer.copyright}</p>
                    <div className="flex gap-8">
                        {SITE_CONFIG.footer.bottomLinks.map((link) => (
                            <a key={link.label} href={link.href} className="hover:text-white transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
