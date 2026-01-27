"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    Search,
    Image as ImageIcon, Filter, X, ChevronLeft, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import CollectionModal from "@/components/common/CollectionModal";
import { DotLottiePlayer } from '@dotlottie/react-player';
import { getIcon } from "@/lib/iconMap";

// Firebase Imports
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import animationsData from "@/data/animations.json"; // Keep as fallback or seed

// Mock Data for Sidebar
const filters = ["All", "Free", "Premium", "Exclusive", "New"];

const SidebarContent = ({ activeFilter, setActiveFilter }) => (
    <div className="space-y-8 p-4 border border-emerald-200 rounded-lg bg-linear-to-br from-emerald-50 to-green-50 shadow-sm">
        {/* Filters */}
        <div>
            <h3 className="text-emerald-600 font-bold text-base mb-4">Filters</h3>
            <div className="flex flex-wrap gap-2">
                {filters.map((f, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveFilter(f)}
                        className={`px-3 py-1.5 rounded-full border text-xs transition-all hover:scale-105 active:scale-95
                        ${activeFilter === f
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                            : 'bg-white border-emerald-200 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50'}`}
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
    const [activeFilter, setActiveFilter] = useState("All");
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [gridCols, setGridCols] = useState(4); // 2, 3, or 4 columns
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnimations = async () => {
            setIsLoading(true);
            
            // Local data is the baseline
            let allItems = [...animationsData];

            try {
                // Create a timeout promise (e.g., 2000ms) to fail fast if Firebase hangs
                const timeout = new Promise((_, reject) => 
                    setTimeout(() => reject(new Error("Timeout")), 2000)
                );

                // Check if we actually have a valid DB connection attempt (rudimentary check involving catch)
                const firestorePromise = async () => {
                    if (!db) return [];
                    const q = query(collection(db, "animations"), orderBy("createdAt", "desc"));
                    const querySnapshot = await getDocs(q);
                    const items = [];
                    querySnapshot.forEach((doc) => {
                        items.push({ id: doc.id, ...doc.data() });
                    });
                    return items;
                };

                // Race the fetch against the timeout
                const firestoreItems = await Promise.race([firestorePromise(), timeout]);
                
                // If successful, merge
                if (firestoreItems && firestoreItems.length > 0) {
                     allItems = [...firestoreItems, ...allItems];
                }

            } catch (err) {
                 // SIlently fail on timeout or config error and just show local data
                 console.warn("Firestore fetch deferred/failed (using local data):", err.message);
            } finally {
                setItems(allItems);
                setIsLoading(false);
            }
        };

        fetchAnimations();
    }, []);

    const handleItemClick = (item) => {
        const modalItem = {
            ...item,
            icon: item.lottieSrc ? null : getIcon(item.iconName)
        };
        setSelectedItem(modalItem);
        setIsModalOpen(true);
    };

    // Enhanced filtering logic for tab-based filtering
    const getFilteredItems = () => {
        if (!items || items.length === 0) return [];
        let filtered = items;

        // Filter by active tab
        if (activeTab === "Premium") {
            filtered = items.filter(i => i.category === "Premium");
        } else if (activeTab === "New") {
            filtered = items.filter(i => i.category === "New");
        } else if (activeTab === "Popular animations") {
            filtered = items.slice(0, 8); // Show first 8 popular items
        }
        // "All animations" shows everything

        // Then apply sidebar filter only if not filtering by specific tab category
        if (activeFilter && activeFilter !== "All" && activeTab === "All animations") {
            filtered = filtered.filter(item => {
                if (activeFilter === "Free" && (!item.category || item.category === "Free")) return true;
                if (activeFilter === "Premium" && item.category === "Premium") return true;
                if (activeFilter === "Exclusive" && item.category === "Exclusive") return true;
                if (activeFilter === "New" && item.category === "New") return true;
                return false;
            });
        }

        return filtered;
    };

    // Handle tab change and reset sidebar filter if needed
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // Reset sidebar filter when switching to specific category tabs
        if (tab !== "All animations") {
            setActiveFilter("All");
        }
    };

    const displayedItems = getFilteredItems();

    // Get grid classes based on column count
    const getGridClasses = () => {
        const baseClasses = "grid gap-4 lg:gap-5";
        switch(gridCols) {
            case 2:
                return `${baseClasses} grid-cols-1 sm:grid-cols-2`;
            case 3:
                return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`;
            case 4:
            default:
                return `${baseClasses} grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`;
        }
    };

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

                {/* Sidebar Toggle Button */}
                <div className="hidden lg:flex flex-col items-start gap-4">
                    <button
                        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                        className="p-2 rounded-lg bg-secondary hover:bg-brand-pink hover:text-white transition-all duration-200 shadow-sm border border-gray-200 hover:border-brand-pink"
                        title={isSidebarVisible ? "Hide Filters" : "Show Filters"}
                    >
                        {isSidebarVisible ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                    </button>

                    {/* Sidebar (Desktop) */}
                    <aside className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isSidebarVisible ? 'w-[200px] opacity-100' : 'w-0 opacity-0'
                    } shrink-0`}>
                        {isSidebarVisible && (
                            <div className="w-[200px]">
                                <SidebarContent activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                            </div>
                        )}
                    </aside>
                </div>

                {/* Main Content */}
                <div className={`flex-1 w-full transition-all duration-300 ${
                    isSidebarVisible ? 'lg:ml-4' : 'lg:ml-0'
                }`}>

                    {/* Mobile Filter Toggle & Tabs / Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-border pb-4 gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            {/* Mobile Filter Button */}
                            <button
                                onClick={() => setIsMobileFiltersOpen(true)}
                                className="lg:hidden flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-brand-pink hover:text-white transition-colors rounded-lg border border-gray-200 hover:border-brand-pink"
                            >
                                <Filter size={16} />
                                <span className="text-sm font-medium">Filters</span>
                            </button>

                            <div className="flex-1 flex items-center gap-8 overflow-x-auto pb-2 md:pb-0 hide-scrollbar mask-linear-fade">
                            {["All animations", "New", "Premium", "Popular animations"].map((tab, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleTabChange(tab)}
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
                    </div>

                    {/* Content Grid */}
                    <div className="space-y-12">
                        {isLoading ? (
                             <div className="flex justify-center py-20 text-muted-foreground">Loading animations...</div>
                        ) : (
                        <>
                        {/* Section 1 */}
                        <div>
                            <div className="mb-4">
                                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground">
                                    {activeTab === "All animations" ? "Popular" : activeTab}
                                </span>
                            </div>
                            <div className={getGridClasses()}>
                                {displayedItems.slice(0, 8).map((item, i) => {
                                    const IconComponent = item.iconName ? getIcon(item.iconName) : null;
                                    return (
                                        <div key={item.id} onClick={() => handleItemClick(item)} className="group cursor-pointer bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 w-full">
                                            <div className="w-full aspect-square bg-secondary rounded-2xl overflow-hidden relative flex items-center justify-center group-hover:shadow-xl transition-all duration-300 border border-transparent group-hover:border-brand-pink/20">
                                                {/* If Lottie, render player. If Icon, render Icon. */}
                                                {item.lottieSrc ? (
                                                    <div className="w-[85%] h-[85%]">
                                                        <DotLottiePlayer
                                                            src={item.lottieSrc}
                                                            loop
                                                            autoplay
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                ) : (
                                                    <IconComponent size={40} className={`transform group-hover:scale-110 transition-transform duration-300 ${item.color}`} />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Section 2 - Show more filtered items */}
                        {displayedItems.length > 8 && (
                        <div>
                            <div className={getGridClasses()}>
                                {displayedItems.slice(8, 16).map((item, i) => {
                                    const IconComponent = item.iconName ? getIcon(item.iconName) : null;
                                    return (
                                        <div key={`section2-${item.id}`} onClick={() => handleItemClick(item)} className="group cursor-pointer bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 w-full">
                                            <div className="w-full aspect-square bg-secondary rounded-2xl overflow-hidden relative flex items-center justify-center group-hover:shadow-xl transition-all duration-300 border border-transparent group-hover:border-brand-pink/20">
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

                                        </div>
                                    );
                                })}
                                {/* Show "View More" only if there are more items */}
                                {displayedItems.length > 16 && (
                                <div className="group cursor-pointer bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 w-full">
                                    <div className="w-full aspect-square border-2 border-dashed border-muted-foreground/20 rounded-2xl flex flex-col items-center justify-center hover:border-brand-pink/50 hover:bg-brand-pink/5 transition-all">
                                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2 group-hover:bg-white transition-colors">
                                            <span className="text-xl font-light text-muted-foreground">+</span>
                                        </div>
                                        <span className="text-xs font-medium text-muted-foreground">View More</span>
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                        )}
                        </>
                        )}
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
