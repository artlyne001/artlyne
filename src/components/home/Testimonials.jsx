"use client";

import { SITE_CONFIG } from "@/config/constants";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Image had specific colored backgrounds for cards: Blueish, Purpleish, greenish/mint
const TestimonialCard = ({ name, role, text, bgClass, avatarColor, imageUrl }) => (
    <div className={`p-8 rounded-[2rem] ${bgClass} relative flex flex-col h-full hover:-translate-y-1 transition-transform duration-300`}>
        <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                <AvatarImage src={imageUrl} alt={name} />
                <AvatarFallback className={`${avatarColor} text-white font-bold`}>
                    {name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
            </Avatar>
            <div>
                <h4 className="font-bold text-foreground text-lg">{name}</h4>
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">{role}</p>
            </div>
        </div>
        <p className="text-foreground/80 leading-relaxed font-medium">
            "{text}"
        </p>
    </div>
);

export default function Testimonials() {
    return (
        <section className="py-12 px-12 md:px-[90px] bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-center text-3xl font-extrabold mb-4 font-serif">Teams loves {SITE_CONFIG.name}</h2>
                <div className="h-1 w-20 bg-brand-pink mx-auto rounded-full mb-16" />

                <div className="grid md:grid-cols-3 gap-6">
                    <TestimonialCard
                        name="Mufi's team"
                        role="Product Design"
                        text="Calculate is a social brainstorming app that performance can be save and share their inspiration through broadcasting, facilitating constructive idea generation."
                        bgClass="bg-[#EBF5FF]" // Light Blue
                        avatarColor="bg-blue-400"
                       imageUrl="/assets/ajmal-avatar.png"
                    />
                    <TestimonialCard
                        name="Mufi"
                        role="Design Lead"
                        text="While Luke and I square more off brainstorming. A great 'Open Study' attachment social and this celebrity mistaken NextGen."
                        bgClass="bg-[#F5F3FF]" // Light Purple
                        avatarColor="bg-purple-400"
                       imageUrl="/assets/ajmal-avatar.png"
                    />
                    <TestimonialCard
                        name="Ajmal"
                        role="Developer"
                        text="The best way to animate your website. Highly recommended for everyone who wants to make their website look cool and professional."
                        bgClass="bg-[#ECFDF5]" // Mint Green
                        avatarColor="bg-emerald-400"
                        imageUrl="/assets/ajmal-avatar.png"
                    />
                </div>
            </div>
        </section>
    );
}
