"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Image, Clock, Bell } from "lucide-react";

export default function PngPage() {
    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <div className="flex-1 pt-[120px] pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    {/* Icon */}
                    <div className="flex justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center">
                            <Image className="w-12 h-12 text-blue-600" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            PNG Collection
                        </h1>
                        <p className="text-xl md:text-2xl font-semibold text-muted-foreground">
                            Coming Soon
                        </p>
                    </div>

                    {/* Description */}
                    <div className="space-y-8">
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            We're working hard to bring you an amazing collection of high-quality PNG images.
                            From illustrations to icons, our PNG library will have everything you need for your projects.
                        </p>

                        {/* Features Preview */}
                        <div className="grid md:grid-cols-3 gap-8 mt-16">
                            <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                    <Image className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">High Quality</h3>
                                <p className="text-sm text-muted-foreground">Crystal clear PNG images with transparent backgrounds</p>
                            </div>

                            <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <Clock className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Multiple Sizes</h3>
                                <p className="text-sm text-muted-foreground">Available in various resolutions for all your needs</p>
                            </div>

                            <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                    <Bell className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Easy Download</h3>
                                <p className="text-sm text-muted-foreground">One-click download with organized categories</p>
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