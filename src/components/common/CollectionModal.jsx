"use client";

import { X, Heart, Copy, Code, Download, Check, FileJson, FileType } from "lucide-react";
import { useState, useEffect } from "react";
import { DotLottiePlayer } from '@dotlottie/react-player';

// Helper to map tailwind text colors to hex for initialization (simplified)
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
};

export default function CollectionModal({ isOpen, onClose, item }) {
    const [selectedColor, setSelectedColor] = useState("#FF2D88");
    const [isLiked, setIsLiked] = useState(false);
    const [copiedJson, setCopiedJson] = useState(false);
    const [copiedEmbed, setCopiedEmbed] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // Reset state when modal opens or item changes
    useEffect(() => {
        if (isOpen && item) {
            // Try to set initial color from item.color class, or default to brand pink
            const initialColor = colorMap[item.color] || "#FF2D88";
            setSelectedColor(initialColor);
            setIsLiked(false);
            setCopiedJson(false);
            setCopiedEmbed(false);
            setIsDownloading(false);
        }
    }, [isOpen, item]);

    if (!isOpen) return null;

    const handleCopy = (type) => {
        // Mock copy content
        const content = type === 'json'
            ? JSON.stringify({ animation: item.title, color: selectedColor }, null, 2)
            : `<div class="animetrix-player" data-src="${item.title}" data-color="${selectedColor}"></div>`;

        navigator.clipboard.writeText(content);

        if (type === 'json') {
            setCopiedJson(true);
            setTimeout(() => setCopiedJson(false), 2000);
        } else {
            setCopiedEmbed(true);
            setTimeout(() => setCopiedEmbed(false), 2000);
        }
    };

    const handleDownload = () => {
        setIsDownloading(true);
        // Simulate download delay
        setTimeout(() => {
            setIsDownloading(false);
            // In a real app, this would trigger a file download
            alert(`Downloaded ${item.title} assets in ${selectedColor}`);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-zinc-900 w-full max-w-225 h-auto max-h-[90vh] lg:h-[600px] rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-secondary/80 hover:bg-secondary flex items-center justify-center transition-colors"
                >
                    <X size={18} className="text-foreground" />
                </button>

                <div className="flex-1 flex flex-col p-6 lg:p-8 h-full overflow-y-auto lg:overflow-visible">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row items-start justify-between mb-6 gap-4 lg:gap-0">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold text-foreground">
                                {item?.title || "Jolly Animated Loader Animation"}
                            </h2>
                             <button
                                onClick={() => setIsLiked(!isLiked)}
                                className={`mt-2 transition-colors flex items-center gap-2 text-sm font-medium ${isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"}`}
                            >
                                <Heart size={20} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "text-red-500" : ""} />
                                {isLiked ? "Saved to Favorites" : "Add to Favorites"}
                            </button>
                        </div>

                        <div className="flex gap-3 w-full lg:w-auto">
                            <button
                                onClick={() => handleCopy('json')}
                                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs font-bold hover:bg-green-100 transition-colors"
                            >
                                {copiedJson ? <Check size={14} /> : <Copy size={14} />}
                                {copiedJson ? "Copied!" : "Copy Json"}
                            </button>
                            <button
                                onClick={() => handleCopy('embed')}
                                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-border bg-background text-foreground text-xs font-bold hover:bg-secondary transition-colors"
                            >
                                {copiedEmbed ? <Check size={14} /> : <Code size={14} />}
                                {copiedEmbed ? "Copied!" : "Embed code"}
                            </button>
                        </div>
                    </div>

                    {/* Main Body */}
                    <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
                        {/* Left: Preview */}
                        <div className="flex-1 bg-[#F5F9FF] dark:bg-zinc-800/50 rounded-2xl flex items-center justify-center p-8 relative group min-h-[300px] lg:min-h-0">
                            <div className="w-full h-full flex items-center justify-center transition-all duration-300">
                                {item?.lottieSrc ? (
                                    <div className="w-[80%] h-[80%]">
                                        <DotLottiePlayer
                                            src={item.lottieSrc}
                                            loop
                                            autoplay
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                ) : item?.icon ? (
                                    <item.icon
                                        size={140}
                                        style={{ color: selectedColor }}
                                        className="drop-shadow-2xl transition-all duration-500"
                                    />
                                ) : (
                                    <div className="w-40 h-40 bg-brand-pink rounded-full opacity-20" />
                                )}
                            </div>
                        </div>

                        {/* Right: Controls */}
                        <div className="w-full lg:w-[300px] flex flex-col gap-8 justify-center">
                             {/* Files Include */}
                             <div>
                                <h4 className="font-bold text-sm mb-2">Files include</h4>
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#00005B] text-white flex items-center justify-center font-bold text-xs shadow-md cursor-help" title="Adobe After Effects">Ae</div>
                                    <div className="w-10 h-10 rounded-lg bg-[#330000] text-[#FF9A00] flex items-center justify-center font-bold text-xs shadow-md border border-[#FF9A00]/20 cursor-help" title="Adobe Illustrator">Ai</div>
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-zinc-800 text-foreground flex items-center justify-center font-bold text-xs shadow-md border border-border" title="JSON Lottie">
                                        <FileJson size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer / Downloads */}
                    <div className="mt-8 flex items-center justify-end gap-4 border-t border-border pt-6">
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className={`px-8 py-3 bg-brand-pink text-white font-bold rounded-xl shadow-lg shadow-brand-pink/25 transition-all flex items-center gap-2
                            ${isDownloading ? 'opacity-70 cursor-wait' : 'hover:bg-brand-pink-hover active:scale-95'}`}
                        >
                            {isDownloading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Downloading...
                                </>
                            ) : (
                                <>
                                    Download
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
