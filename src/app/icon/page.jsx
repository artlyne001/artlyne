"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Grid3X3, Star, Zap } from "lucide-react";

export default function IconPage() {
    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <div className="flex-1 pt-[120px] pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    {/* Icon */}
                    <div className="flex justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-teal-100 rounded-3xl flex items-center justify-center">
                            <Grid3X3 className="w-12 h-12 text-green-600" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
                            Icon Library
                        </h1>
                        <p className="text-xl md:text-2xl font-semibold text-muted-foreground">
                            Coming Soon
                        </p>
                    </div>

                    {/* Description */}
                    <div className="space-y-8">
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            A comprehensive icon library is on its way! Thousands of beautifully crafted icons
                            in multiple styles and formats for all your design needs.
                        </p>

                        {/* Features Preview */}
                        <div className="grid md:grid-cols-3 gap-8 mt-16">
                            <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                    <Grid3X3 className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Thousands of Icons</h3>
                                <p className="text-sm text-muted-foreground">Extensive collection covering all categories</p>
                            </div>

                            <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm">
                                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                                    <Star className="w-6 h-6 text-teal-600" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Multiple Styles</h3>
                                <p className="text-sm text-muted-foreground">Outline, filled, duotone, and flat styles</p>
                            </div>

                            <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Multiple Formats</h3>
                                <p className="text-sm text-muted-foreground">SVG, PNG, and web font formats available</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-12 pb-8">
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}