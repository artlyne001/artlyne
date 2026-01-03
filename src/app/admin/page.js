"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Upload, FileText, Plus } from "lucide-react";

export default function AdminPage() {
    const [title, setTitle] = useState("New Animation");
    const fileInputRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState("Premium");
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState(null);
    
    // Form states matching the visual
    const [enableAe, setEnableAe] = useState(true);
    const [enableAi, setEnableAi] = useState(true);
    
    // Sample categories for the left side tags
    // Sample categories for the left side tags
    const [categories, setCategories] = useState(["Free", "Premium", "Illustration", "Saas", "Icons", "App animations", "Lottie", "Json"]);
    const [newCategory, setNewCategory] = useState("");
    const [isAddingCategory, setIsAddingCategory] = useState(false);

    const handleAddCategory = () => {
        if (newCategory.trim()) {
             if (!categories.includes(newCategory.trim())) {
                setCategories([...categories, newCategory.trim()]);
             }
            setNewCategory("");
            setIsAddingCategory(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            // Create a fake preview for non-image files if needed, or read it if it's an image/json
            if (selectedFile.type.includes('image') || selectedFile.type.includes('json')) {
                 setPreviewUrl(URL.createObjectURL(selectedFile));
            }
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Stop propagation
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            setFile(droppedFile);
             if (droppedFile.type.includes('image')) {
                 setPreviewUrl(URL.createObjectURL(droppedFile));
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleAreaClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setStatus('error');
            return;
        }

        setIsUploading(true);
        setStatus(null);

        // Simulate upload
        setTimeout(() => {
            setIsUploading(false);
            setStatus('success');
            // Reset after success
            setTimeout(() => setStatus(null), 3000);
        }, 2000);
    };

    return (
        <main className="min-h-screen bg-[#FAFAFA] text-zinc-800 flex flex-col font-sans">
            <Navbar />
            
            <div className="grow pt-[150px] pb-20 px-6 max-w-[1400px] mx-auto w-full">
                
                <div className="flex flex-col lg:flex-row gap-8 items-start mb-12">
                    {/* Main Upload Area */}
                    <div 
                        className="relative bg-[#F9F9F9] border-2 border-dashed border-gray-200 rounded-[40px] h-[500px] flex flex-col items-center justify-center transition-colors hover:bg-gray-50 w-full lg:w-[70%] cursor-pointer"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={handleAreaClick}
                    >
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".json,.lottie"
                        />

                        {/* Center Content */}
                        <div className="flex flex-col items-center gap-6 pointer-events-none">
                            <div className="w-24 h-24 text-gray-300">
                               <Upload size={96} strokeWidth={1.5} />
                            </div>
                            <p className="text-gray-400 text-lg font-medium">
                                {file ? file.name : "Upload aftereffects animation files here"}
                            </p>
                        </div>

                        {/* Bottom Pill - File Types */}
                        <div className="absolute bottom-16 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100 flex items-center gap-4 pointer-events-none">
                            <span className="font-bold text-lg flex items-center gap-1">Json <sup className="text-[10px] text-gray-400">®</sup></span>
                            <div className="w-8 h-8 rounded bg-[#00005B] text-[#9999FF] flex items-center justify-center font-bold text-xs">Ae</div>
                            <div className="w-8 h-8 rounded bg-[#330000] text-[#FF9A00] flex items-center justify-center font-bold text-xs">Ai</div>
                        </div>

                        {/* Top Right - Add Source File Card */}
                        <div className="absolute top-10 right-10 bg-white p-5 rounded-2xl shadow-sm border border-pink-100 w-[240px] z-20 pointer-events-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-brand-pink font-bold text-sm">Add source file</h3>
                                <FileText size={16} className="text-brand-pink" />
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setEnableAe(!enableAe)}
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all border-2 ${enableAe ? 'border-brand-pink bg-brand-pink/5' : 'border-gray-100'}`}
                                >
                                    <div className="w-8 h-8 rounded bg-[#00005B] text-[#9999FF] flex items-center justify-center font-bold text-xs">Ae</div>
                                </button>
                                 <button 
                                    type="button"
                                    onClick={() => setEnableAi(!enableAi)}
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all border-2 ${enableAi ? 'border-brand-pink bg-brand-pink/5' : 'border-gray-100'}`}
                                >
                                    <div className="w-8 h-8 rounded bg-[#330000] text-[#FF9A00] flex items-center justify-center font-bold text-xs">Ai</div>
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2">Enable file options</p>
                        </div>
                    </div>

                    {/* Right Side: Keywords */}
                    <div className="w-full lg:w-[30%] flex flex-col gap-6">
                        <h2 className="text-xl font-bold mb-2">Keywords</h2>
                        <div className="flex flex-wrap gap-3 content-start">
                            {categories.map((cat) => (
                                <button 
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                                    ${selectedCategory === cat 
                                        ? 'bg-brand-pink text-white shadow-lg shadow-brand-pink/20' 
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        
                        <div>
                            {isAddingCategory ? (
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="text"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                                        placeholder="Enter category..."
                                        className="px-4 py-2 border rounded-full focus:outline-none focus:border-brand-pink min-w-[150px]"
                                        autoFocus
                                    />
                                    <button 
                                        onClick={handleAddCategory}
                                        className="bg-brand-pink text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-brand-pink-hover"
                                    >
                                        <Plus size={16} />
                                    </button>
                                     <button 
                                        onClick={() => setIsAddingCategory(false)}
                                        className="bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setIsAddingCategory(true)}
                                    className="bg-[#64D760] hover:bg-[#55C953] text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-green-500/20 flex items-center gap-2 transition-transform active:scale-95"
                                >
                                    <Plus size={20} /> Add new category
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Center Launch Button */}
                <div className="flex justify-center mt-8">
                     <button 
                        onClick={handleSubmit}
                        disabled={isUploading}
                        className={`bg-brand-pink hover:bg-brand-pink-hover text-white text-xl font-bold py-4 px-12 rounded-full shadow-xl shadow-brand-pink/30 hover:shadow-2xl hover:shadow-brand-pink/40 transition-all active:scale-95 ${isUploading ? 'opacity-70 cursor-wait' : ''}`}
                     >
                        {isUploading ? "Launching..." : "Launch animation"}
                     </button>
                </div>

                {status === 'success' && (
                     <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-4">
                        Animation Launched Successfully!
                     </div>
                )}
            </div>
            
            <Footer />
        </main>
    );
}
