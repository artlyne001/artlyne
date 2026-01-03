"use client";

import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/constants";

export default function FeatureShowcase() {
    return (
        <section className="py-12 px-12 md:px-[90px] bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
                        The world's largest free, ready-to-use, <br />
                        customizable animation library
                    </h2>
                </div>

                {/* Library Grid Mini-Preview (The icons section in the image) */}
                <div className="grid grid-cols-4 gap-8 max-w-4xl mx-auto mb-32 opacity-80">
                    {/* Simple placeholders for the icon grid above the duolingo section */}
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="aspect-square bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center">
                            <div className={`w-12 h-12 rounded-lg ${SITE_CONFIG.theme.gradient} opacity-20`} />
                        </div>
                    ))}
                    <div className="col-span-4 text-center mt-8">
                        <button className="px-6 py-2 rounded-full bg-gray-100 text-sm font-bold hover:bg-gray-200 transition-colors">
                            See All Collections
                        </button>
                    </div>
                </div>


                <div className="text-center mb-16">
                    <h3 className="text-2xl text-gray-500">World's most loved products are built with Lottie</h3>
                </div>

                {/* Duolingo Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image Side - Green Border Box */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative z-10">
                             <img 
                                src="/assets/duolingo.png" 
                                alt="Duolingo Interface" 
                                className="w-full h-[450px] rounded-[2.5rem] shadow-xl border-[6px] border-[#58CC02]"
                            />
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="space-y-8 order-1 lg:order-2 pl-0 lg:pl-12">
                        <div className="text-8xl font-serif text-black leading-none">“</div>
                        <h3 className="text-2xl md:text-3xl font-medium leading-relaxed text-gray-800 -mt-8">
                            Lottie animations help us keep users engaged, delighted, and always learning.
                        </h3>

                        <div className="pt-4">
                            <span className="text-4xl font-bold text-[#58CC02] tracking-tighter">duolingo</span>
                        </div>

                        <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#58CC02] transition-colors border border-gray-200 px-6 py-3 rounded-full hover:border-[#58CC02]">
                            View case study
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
