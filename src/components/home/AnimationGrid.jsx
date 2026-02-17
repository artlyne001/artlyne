"use client";

import { useState, useMemo, useEffect } from "react";
import { Monitor, Search, Smartphone, Zap, Heart, Gift, Briefcase, Video, ShoppingBag, Activity, Globe, CreditCard, Box, Database, Terminal, Layers, FlaskConical } from "lucide-react";
import { DotLottiePlayer } from '@dotlottie/react-player';
import animationsData from "@/data/animations.json"; // Import data
import CollectionModal from "@/components/common/CollectionModal"; // Import Modal
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// Map icon names to components
const iconMap = {
    Monitor, Search, Smartphone, Zap, Heart, Gift, Briefcase, Video, ShoppingBag, Activity,
    Globe, CreditCard, Box, Database, Terminal, Layers, FlaskConical, ShoppingCart: ShoppingBag
};

const AnimationCard = ({ animation, onAction }) => {
    // Check if animation has lottieSrc (dynamic) or needs to be constructed (static) 
    // Actually the static ones might have different structure, let's normalize in the parent or handle here.
    // The current static data seems to use 'lottieSrc' as well based on the filter code below.
    
    // Safety check for animation object
    if (!animation) return null;

    const { title, lottieSrc, iconName, color, category } = animation;
    
    // Icon fallback
    const Icon = iconName ? (iconMap[iconName] || Monitor) : Monitor;
    
    // Extract base color name (e.g. "text-blue-500" -> "blue")
    const colorBase = color ? color.replace('text-', '').split('-')[0] : 'gray';

    return (
        <div className="bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group h-auto w-full">
            {/* Preview Area */}
            <div className={`bg-${colorBase}-50/60 rounded-[1.5rem] aspect-square mb-4 relative overflow-hidden flex items-center justify-center`}>
                <div className={`absolute inset-0 bg-${colorBase}-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                     {lottieSrc ? (
                        <DotLottiePlayer
                            src={lottieSrc}
                            loop
                            autoplay
                            className="w-full h-full max-w-[85%] max-h-[85%] object-contain"
                        />
                    ) : (
                        <div className="p-4 bg-white rounded-2xl shadow-sm transform group-hover:scale-105 transition-transform duration-300">
                             <Icon className={`w-10 h-10 ${color}`} />
                        </div>
                    )}
                </div>

                {/* Badge */}
                <div className="absolute top-2 right-2 z-20">
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm ${
                        category === 'Premium' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                        category === 'New' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                        'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}>
                        {category || 'New'}
                    </span>
                </div>
            </div>

            <div className="px-2 pb-2 text-center flex-1 flex flex-col justify-end">
                 <h3 className="text-sm font-bold text-gray-800 mb-1 line-clamp-1">{title}</h3>
                <div className="mt-auto space-y-2">
                     {/* Attributes/Format (Static for now as mostly generic) */}
                    <div className="flex justify-center gap-2 text-xs text-muted-foreground">
                        <span>JSON</span> • <span>Lottie</span> • <span>MP4</span>
                    </div>

                    <button
                        onClick={() => onAction(animation)}
                        className="w-full py-2.5 rounded-full bg-brand-pink text-white font-bold text-sm hover:bg-brand-pink-hover transition-all shadow-lg shadow-brand-pink/20 hover:shadow-brand-pink/40 hover:-translate-y-0.5 active:translate-y-0"
                    >
                        {category === 'Free' ? 'Download Now' : 'Buy Now'}
                    </button>
                </div>
            </div>
        </div>
    );
};


export default function AnimationGrid() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAnimation, setSelectedAnimation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [firestoreAnimations, setFirestoreAnimations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnimations = async () => {
            try {
                const q = query(collection(db, "animations"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const animations = [];
                querySnapshot.forEach((doc) => {
                    animations.push({ id: doc.id, ...doc.data() });
                });
                setFirestoreAnimations(animations);
            } catch (error) {
                console.error("Error fetching animations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimations();
    }, []);

    // Memoize the filtered and processed animations
    const filteredAnimations = useMemo(() => {
        // Merge static and dynamic animations
        const allAnimations = [...firestoreAnimations, ...animationsData];

        return allAnimations.filter(a =>
            (a.title && a.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (a.category && a.category.toLowerCase().includes(searchTerm.toLowerCase()))
        ).map(anim => ({
            ...anim,
            // Clean paths if needed, though Firestore URLs handled by manual upload might not need it
            // ensuring we handle both /api/uploads and direct /uploads or http URLs
             lottieSrc: anim.lottieSrc ? (anim.lottieSrc.startsWith('http') || anim.lottieSrc.startsWith('/') ? anim.lottieSrc : anim.lottieSrc.replace('/api/uploads', '/uploads')) : null
        }));
    }, [searchTerm, firestoreAnimations]);

    const handleAction = (animation) => {
        setSelectedAnimation(animation);
        setIsModalOpen(true);
    };

    return (
        <section className="pb-6 px-6 md:px-22.5 bg-white">
            <div className="max-w-7xl mx-auto">
                <CollectionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    item={selectedAnimation}
                />

                {/* Search Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                        Discover & Download <br className="hidden md:block" />
                        Premium Lottie Animations
                    </h2>

                    <div className="max-w-xl mx-auto mt-8 relative pt-6">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-25 blur transition duration-1000 group-hover:opacity-50" />
                            <div className="relative bg-white rounded-full p-2 flex items-center shadow-lg border border-gray-100">
                                <input
                                    type="text"
                                    placeholder="Search animations..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-6 py-3 bg-transparent outline-none text-base text-foreground placeholder:text-muted-foreground"
                                />
                                <button className="p-3 bg-brand-pink text-white rounded-full hover:bg-brand-pink-hover transition-colors shadow-md">
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Animations Grid */}
                {filteredAnimations.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-16">
                        {filteredAnimations.map((anim) => (
                            <AnimationCard key={anim.id} animation={anim} onAction={handleAction} />
                        ))}
                    </div>
                ) : (
                     <div className="text-center py-20">
                        <p className="text-xl text-gray-400">No animations found matching your search.</p>
                     </div>
                )}

                <div className="text-center mb-12 mt-4">
                     <div className="inline-flex items-center justify-center p-px rounded-full bg-linear-to-r from-purple-500 via-brand-pink to-orange-500 shadow-lg shadow-purple-500/20">
                        <div className="px-8 py-3 bg-white rounded-full">
                            <p className="text-base font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-brand-pink flex items-center gap-2">
                                <span className="text-xl">✨</span>
                                More Premium Animations Dropping soon!
                                <span className="text-xl">✨</span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
