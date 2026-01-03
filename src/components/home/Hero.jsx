"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { DotLottiePlayer } from '@dotlottie/react-player';
import { SITE_CONFIG } from "@/config/constants";

export default function Hero() {
    return (
        <section className="relative pt-[130px] pb-10 px-12 md:px-[90px] overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-8 text-center lg:text-left mb-25 ">
                    <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] max-w-[572px]">
                        {SITE_CONFIG.hero.titleLine1} <br />
                        <span className={`text-transparent bg-clip-text ${SITE_CONFIG.theme.gradient}`}>
                            {SITE_CONFIG.hero.titleLine2}
                        </span>
                        <br />
                        <span className={`text-transparent bg-clip-text ${SITE_CONFIG.theme.gradient}`}>
                            {SITE_CONFIG.hero.titleLine3}
                        </span>
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        {SITE_CONFIG.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <Link 
                            href="/collections"
                            className="w-[344px] h-[62px] rounded-[31.18px] border-[0.85px] border-brand-pink bg-brand-pink text-white font-bold text-lg hover:bg-brand-pink-hover transition-all shadow-xl shadow-brand-pink/20 hover:scale-105 active:scale-95 flex items-center justify-center"
                        >
                            {SITE_CONFIG.hero.cta}
                        </Link>
                    </div>
                </div>

                {/* Right Content - Illustration */}
                <div className="relative w-full max-w-lg mx-auto lg:max-w-none flex justify-center lg:justify-end">
                    <div className="relative z-10 w-full">
                        <DotLottiePlayer
                            src="/assets/flight.json"
                            loop
                            autoplay
                            className="w-full h-auto object-contain transform hover:scale-[1.02] transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
