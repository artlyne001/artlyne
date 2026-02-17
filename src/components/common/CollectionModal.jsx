"use client";

import { X, Heart, Copy, Code, Download, Check, FileJson, Layers, Monitor, Search, Smartphone, Zap, Gift, Briefcase, Video, ShoppingBag, Activity, Globe, CreditCard, Box, Database, Terminal, FlaskConical } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { DotLottiePlayer } from '@dotlottie/react-player';
import confetti from "canvas-confetti";

// Helper to map tailwind text colors to hex for initialization
const colorMap = {
    "text-blue-500": "#3B82F6",
    "text-purple-500": "#A855F7",
    "text-indigo-500": "#6366F1",
    "text-emerald-500": "#10B981",
    "text-orange-500": "#F97316",
    "text-pink-500": "#EC4899",
    "text-cyan-500": "#06B6D4",
    "text-teal-500": "#14B8A6",
    "text-yellow-500": "#EAB308",
    "text-slate-500": "#64748B",
    "text-blue-600": "#2563EB",
    "text-red-500": "#EF4444",
    "text-brand-pink": "#FF2D88"
};

// Map icon names to components (matching AnimationGrid)
const iconMap = {
    Monitor, Search, Smartphone, Zap, Heart, Gift, Briefcase, Video, ShoppingBag, Activity,
    Globe, CreditCard, Box, Database, Terminal, Layers, FlaskConical, ShoppingCart: ShoppingBag
};

export default function CollectionModal({ isOpen, onClose, item }) {
    const [selectedColor, setSelectedColor] = useState("#FF2D88");
    const [isLiked, setIsLiked] = useState(false);
    const [copiedJson, setCopiedJson] = useState(false);
    const [copiedEmbed, setCopiedEmbed] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // Refs to track timeouts for cleanup
    const copyTimeoutRef = useRef(null);
    const downloadTimeoutRef = useRef(null);

    // Reset state when modal opens or item changes
    useEffect(() => {
        if (isOpen && item) {
            // Try to set initial color from item.color class, or default to brand pink
            const initialColor = (item.color && colorMap[item.color]) ? colorMap[item.color] : "#FF2D88";
            setSelectedColor(initialColor);
            setIsLiked(false);
            setCopiedJson(false);
            setCopiedEmbed(false);
            setIsDownloading(false);
        }
    }, [isOpen, item]);

    if (!isOpen || !item) return null;

    const escapeEmbed = (s) => {
        if (typeof s !== "string") return "";
        return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    const handleCopy = (type) => {
        if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);

        const safeTitle = escapeEmbed(item?.title ?? "");
        const safeColor = /^#[0-9A-Fa-f]{6}$/.test(selectedColor) ? selectedColor : "#FF2D88";
        const content = type === 'json'
            ? JSON.stringify({ animation: item?.title ?? "", color: selectedColor }, null, 2)
            : `<div class="animetrix-player" data-src="${safeTitle}" data-color="${safeColor}"></div>`;

        navigator.clipboard.writeText(content).catch(err => console.error('Failed to copy:', err));

        if (type === 'json') {
            setCopiedJson(true);
            copyTimeoutRef.current = setTimeout(() => setCopiedJson(false), 2000);
        } else {
            setCopiedEmbed(true);
            copyTimeoutRef.current = setTimeout(() => setCopiedEmbed(false), 2000);
        }
    };

const handleDownload = () => {
        if (downloadTimeoutRef.current) clearTimeout(downloadTimeoutRef.current);

        setIsDownloading(true);
        
        // Cinematic "Paper Shower" Confetti
        const colors = ['#FF2D88', '#A855F7', '#3B82F6', '#F97316', '#FFFFFF']; // Brand colors + White
        
        const fireWave = () => {
            // Left Cannon
            confetti({
                particleCount: 40,
                angle: 60,
                spread: 80,
                origin: { x: 0, y: 0.8 }, // Slightly above bottom to see the arc
                colors: colors,
                gravity: 0.4,  // Gravity defying
                scalar: 1.4,   // Large paper sheets
                drift: 0,
                ticks: 400,    // Float longer
                shapes: ['square'] // Paper-like
            });

            // Right Cannon
            confetti({
                particleCount: 40,
                angle: 120,
                spread: 80,
                origin: { x: 1, y: 0.8 },
                colors: colors,
                gravity: 0.4,
                scalar: 1.4,
                drift: 0,
                ticks: 400,
                shapes: ['square']
            });
        };

        // Staggered Launch: 3 Waves
        fireWave();
        setTimeout(fireWave, 200);
        setTimeout(fireWave, 400);

        // Simulate download delay
        downloadTimeoutRef.current = setTimeout(() => {
            setIsDownloading(false);
            
             const link = document.createElement("a");
             link.href = item.lottieSrc || "#";
             link.download = `${item.title || "animation"}.json`;
             document.body.appendChild(link);
             // link.click(); 
             document.body.removeChild(link);

            // alert(`Download ready!`); // Removed alert for smoother experience
        }, 1500);
    };

    // Resolve Icon
    // const IconComponent = item.iconName ? (iconMap[item.iconName] || Monitor) : Monitor;
    const IconComponent = item.iconName ? (iconMap[item.iconName] || Monitor) : Monitor;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-zinc-900 w-full max-w-5xl h-auto max-h-[90vh] lg:h-[650px] rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-white/10">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors shadow-sm"
                >
                    <X size={20} className="text-gray-600 dark:text-gray-300" />
                </button>

                <div className="flex-1 flex flex-col p-8 lg:p-10 h-full overflow-y-auto lg:overflow-visible custom-scrollbar">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row items-start justify-between mb-8 gap-6 lg:gap-0">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                                {item.title || "Untitled Animation"}
                            </h2>
                            <div className="flex justify-between items-end gap-3">
                                {/* <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                                    item.category === 'Premium' ? 'bg-amber-100 text-amber-700' :
                                    item.category === 'New' ? 'bg-emerald-100 text-emerald-700' :
                                    'bg-gray-100 text-gray-600'
                                }`}>
                                    {item.category || 'Standard'}
                                </span> */}
                            </div>
                        </div>
                    </div>

                    {/* Main Body */}
                    <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
                        {/* Left: Preview */}
                        <div className="flex-1 bg-[#F5F5F7] dark:bg-zinc-800/50 rounded-3xl flex items-center justify-center p-8 relative group min-h-[300px] lg:min-h-0 border border-gray-100 dark:border-zinc-800 overflow-hidden">
                             {/* Grid pattern background */}
                            {/* <div className="absolute inset-0 opacity-[0.03]" 
                                style={{ 
                                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, 
                                    backgroundSize: '20px 20px' 
                                }} 
                            />
                             */}
                            <div className="w-full h-full flex items-center justify-center transition-all duration-300 relative z-10">
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
                                    <IconComponent
                                        size={120}
                                        style={{ color: selectedColor }}
                                        className="drop-shadow-2xl transition-all duration-500"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Right: Controls & Info */}
                        <div className="w-full lg:w-[320px] flex flex-col gap-8">
                            
                             {/* Save Icon - Top Right */}
                             <div className="flex justify-end">
                                <button
                                    onClick={() => setIsLiked(!isLiked)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all shadow-sm ${
                                        isLiked 
                                        ? " border-red-200 text-red-500" 
                                        : "border-gray-100 text-gray-400hover:border-red-100 dark:border-zinc-700"
                                    }`}
                                >
                                    <Heart size={25} fill={isLiked ? "currentColor" : "none"} />
                                </button>
                             </div>

                        

                             {/* Download Action */}
                             <div className="mt-auto">
                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className={`w-full py-4 bg-brand-pink text-white font-bold text-lg rounded-2xl shadow-xl shadow-brand-pink/20 flex items-center justify-center gap-3 transition-all
                                    ${isDownloading ? 'opacity-80 cursor-wait' : 'hover:bg-brand-pink-hover hover:shadow-brand-pink/30 hover:-translate-y-1 active:translate-y-0 active:scale-95'}`}
                                >
                                    {isDownloading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Download size={20} strokeWidth={2.5} />
                                            <span>Download</span>
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-3">
                                    Secure .zip download via Animetrix Servers
                                </p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
