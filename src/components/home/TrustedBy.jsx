"use client";

import { SITE_CONFIG } from "@/config/constants";

const CompanyLogo = ({ name }) => (
    <div className="flex items-center justify-center grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
        <span className="text-xl md:text-2xl font-bold font-sans">{name}</span>
    </div>
);

export default function TrustedBy() {
    return (
        <section className="pt-4 pb-12 px-6 md:px-[90px] bg-white">
            <div className="max-w-7xl mx-auto text-center space-y-8">
                <p className="text-muted-foreground font-medium">
                    Trusted by 12 Million+ Designers & Developers <br />
                    from over 150,000 companies worldwide
                </p>

                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
                    {SITE_CONFIG.trustedBy.map((company) => (
                        <CompanyLogo key={company.name} name={company.name} />
                    ))}
                </div>
            </div>
        </section>
    );
}
