"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
    Search, 
    Image as ImageIcon, Filter, X
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import CollectionModal from "@/components/common/CollectionModal";
import { DotLottiePlayer } from '@dotlottie/react-player';
import { getIcon } from "@/lib/iconMap";

// Mock Data for Sidebar
const filters = ["Free", "Premium", "Exclusive", "New"];

const SidebarContent = ({ activeFilter, setActiveFilter }) => (
    <div className="space-y-12">
        {/* Filters */}
        <div>
            <h3 className="text-brand-pink font-bold text-lg mb-6">Filters</h3>
            <div className="flex flex-wrap gap-3">
                {filters.map((f, i) => (
                    <button 
                        key={i} 
                        onClick={() => setActiveFilter(f)}
                        className={`px-4 py-1.5 rounded-full border text-sm transition-all hover:scale-105 active:scale-95
                        ${activeFilter === f 
                            ? 'bg-brand-pink text-white border-brand-pink shadow-md shadow-brand-pink/20' 
                            : 'bg-background border-border hover:border-brand-pink/50 hover:text-brand-pink'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

export default function CollectionsPage() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("All animations");
    const [activeFilter, setActiveFilter] = useState("Free");
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    useEffect(() => {
        fetch('/api/animations')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.error(err));
    }, []);

    const handleItemClick = (item) => {
        // Create a renderable icon property for the modal to use easily if it expects 'icon' component
        // But for consistency, we pass the raw object and let the modal handle it, OR we attach the component.
        // Let's attach the Icon component class to the item for the modal to use immediately if it's a legacy item
        const modalItem = { 
            ...item, 
            icon: item.lottieSrc ? null : getIcon(item.iconName) 
        };
        setSelectedItem(modalItem);
        setIsModalOpen(true);
    };

    // Simple filtering simulation
    const getFilteredItems = () => {
        if (!items || items.length === 0) return [];
        let filtered = items;

        if (activeTab === "Popular animations") filtered = items.slice(0, 6);
        else if (activeTab === "Premium") filtered = items.filter(i => i.category === "Premium");
        else if (activeTab === "News") filtered = items.filter(i => i.category === "New");
        // "All animations" returns everything (handled by default init)
        
        return filtered;
    };

    const displayedItems = getFilteredItems();

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <CollectionModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                item={selectedItem} 
            />
            
            {/* Mobile Filters Overlay */}
            {isMobileFiltersOpen && (
                <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm lg:hidden overflow-y-auto">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">Filters</h2>
                            <button 
                                onClick={() => setIsMobileFiltersOpen(false)}
                                className="p-2 rounded-full bg-secondary hover:bg-brand-pink hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <SidebarContent activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                    </div>
                </div>
            )}

            <div className="flex-1 w-full max-w-[1600px] mx-auto pt-[100px] lg:pt-[130px] pb-20 px-6 md:px-12 flex flex-col lg:flex-row gap-12">
                
                {/* Sidebar (Desktop) */}
                <aside className="hidden lg:block w-[280px] shrink-0">
                    <SidebarContent activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                </aside>

                {/* Main Content */}
                <div className="flex-1 w-full">
                    
                    {/* Tabs / Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-border pb-4 gap-4">
                        <div className="flex items-center gap-8">
                            {["All animations", "News", "Premium", "Popular animations"].map((tab, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap font-medium text-sm transition-colors relative
                                    ${activeTab === tab ? 'text-brand-pink' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <span className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-brand-pink rounded-t-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="space-y-12">
                        {/* Section 1 */}
                        <div>
                            <div className="mb-4">
                                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground">
                                    {activeTab === "All animations" ? "Popular" : activeTab}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {displayedItems.map((item, i) => {
                                    const IconComponent = item.iconName ? getIcon(item.iconName) : null;
                                    return (
                                        <div key={item.id} onClick={() => handleItemClick(item)} className="group cursor-pointer">
                                            <div className="w-full aspect-4/3 bg-secondary rounded-2xl mb-4 overflow-hidden relative flex items-center justify-center group-hover:shadow-xl transition-all duration-300 border border-transparent group-hover:border-brand-pink/20">
                                                {/* If Lottie, render player. If Icon, render Icon. */}
                                                {item.lottieSrc ? (
                                                    <div className="w-[80%] h-[80%]">
                                                        <DotLottiePlayer
                                                            src={item.lottieSrc}
                                                            loop
                                                            autoplay
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                ) : (
                                                    <IconComponent size={48} className={`transform group-hover:scale-110 transition-transform duration-300 ${item.color}`} />
                                                )}
                                                
                                                {/* Hover Overlay Buttons */}
                                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                                                     <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-muted-foreground hover:text-brand-pink">
                                                        <Search size={14} />
                                                     </div>
                                                </div>
                                            </div>
                                            <h4 className="font-semibold text-sm text-foreground group-hover:text-brand-pink transition-colors truncate">{item.title}</h4>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Section 2 (Just to fill space like image) */}
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {items.slice(0, 8).map((item, i) => {
                                    const IconComponent = item.iconName ? getIcon(item.iconName) : null;
                                    return (
                                        <div key={`dup-${item.id}`} onClick={() => handleItemClick(item)} className="group cursor-pointer">
                                            <div className="w-full aspect-4/3 bg-secondary rounded-2xl mb-4 overflow-hidden relative flex items-center justify-center group-hover:shadow-xl transition-all duration-300 border border-transparent group-hover:border-brand-pink/20">
                                                {item.lottieSrc ? (
                                                     <div className="w-[80%] h-[80%]">
                                                        <DotLottiePlayer
                                                            src={item.lottieSrc}
                                                            loop
                                                            autoplay
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                ) : (
                                                    <IconComponent size={48} className={`transform group-hover:scale-110 transition-transform duration-300 ${item.color}`} />
                                                )}
                                            </div>
                                            <h4 className="font-semibold text-sm text-foreground group-hover:text-brand-pink transition-colors truncate">{item.title}</h4>
                                        </div>
                                    );
                                })}
                                {/* Empty/Add New Placeholder */}
                                <div className="group cursor-pointer border-2 border-dashed border-muted-foreground/20 rounded-2xl aspect-4/3 flex flex-col items-center justify-center hover:border-brand-pink/50 hover:bg-brand-pink/5 transition-all">
                                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2 group-hover:bg-white transition-colors">
                                        <span className="text-xl font-light text-muted-foreground">+</span>
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground">View More</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-16 flex items-center justify-center w-full">
                        <button className="flex items-center gap-2 px-8 py-3 bg-secondary hover:bg-secondary/80 text-foreground font-semibold rounded-lg transition-colors group">
                            See All Collection
                            <span className="group-hover:translate-x-1 transition-transform">&gt;</span>
                        </button>
                    </div>

                </div>
            </div>
            
            <Footer />
        </main>
    );
}
