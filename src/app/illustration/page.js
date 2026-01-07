"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Palette, Sparkles, Download } from "lucide-react";

export default function IllustrationPage() {
    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <div className="flex-1 pt-[120px] pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    {/* Icon */}
                    <div className="flex justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-orange-100 rounded-3xl flex items-center justify-center">
                            <Palette className="w-12 h-12 text-pink-600" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-600">
                            Illustrations
                        </h1>
                        <p className="text-xl md:text-2xl font-semibold text-muted-foreground">
                            Coming Soon
                        </p>
                    </div>

                    {/* Description */}
                    <div className="space-y-8">
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            Get ready for a stunning collection of vector illustrations! From minimalist designs to
                            detailed artwork, our illustration library will inspire your creative projects.
                        </p>

                        {/* Features Preview */}
                        <div className="grid md:grid-cols-3 gap-8 mt-16">
                            <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm">
                                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                                    <Palette className="w-6 h-6 text-pink-600" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Vector Art</h3>
                                <p className="text-sm text-muted-foreground">Scalable vector illustrations in SVG format</p>
                            </div>

                            <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm">
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                                    <Sparkles className="w-6 h-6 text-orange-600" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Unique Styles</h3>
                                <p className="text-sm text-muted-foreground">Hand-crafted illustrations in various art styles</p>
                            </div>

                            <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <Download className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Ready to Use</h3>
                                <p className="text-sm text-muted-foreground">Organized by categories and themes</p>
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