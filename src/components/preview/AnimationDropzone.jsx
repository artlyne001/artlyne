"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileJson, AlertCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/config/constants';

export default function AnimationDropzone() {
  const [animationSrc, setAnimationSrc] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Cleanup object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (animationSrc && animationSrc.startsWith('blob:')) {
        URL.revokeObjectURL(animationSrc);
      }
    };
  }, [animationSrc]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set dragging to false if we're leaving the dropzone entirely
    // (not just entering a child element)
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    validateAndLoadFile(file);
  }, []);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    validateAndLoadFile(file);
  }, []);

  const validateAndLoadFile = (file) => {
    if (!file) return;

    if (!file.name.endsWith('.json') && !file.name.endsWith('.lottie')) {
        setError('Please upload a valid .json or .lottie file');
        return;
    }

    try {
        const url = URL.createObjectURL(file);
        setAnimationSrc(url);
        setFileName(file.name);
    } catch (err) {
        setError('Failed to load file');
        console.error(err);
    }
  };

  const clearAnimation = () => {
    if (animationSrc) {
        URL.revokeObjectURL(animationSrc);
    }
    setAnimationSrc(null);
    setFileName('');
    setError(null);
    // Reset file input value so same file can be selected again if needed
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
            {!animationSrc ? (
                <motion.div
                    key="dropzone"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`
                        relative border-2 border-dashed rounded-3xl p-12
                        flex flex-col items-center justify-center text-center
                        transition-all duration-300 ease-in-out
                        min-h-[400px] cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                        ${isDragging 
                            ? 'border-indigo-500 bg-indigo-500/5 scale-[1.02]' 
                            : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                        }
                    `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={handleKeyDown}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload animation area"
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".json,.lottie"
                        onChange={handleFileSelect}
                    />
                    
                    <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={`
                            w-20 h-20 rounded-full flex items-center justify-center mb-6
                            ${isDragging ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}
                        `}
                    >
                        <Upload size={32} />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-3 text-foreground">
                        Drag & Drop your animation
                    </h3>
                    <p className="text-muted-foreground text-lg mb-8 max-w-sm">
                        Support for Lottie JSON and .lottie files. 
                        Instant preview in the browser.
                    </p>

                    <button className={`
                        px-8 py-3 rounded-full font-medium text-white shadow-lg shadow-indigo-500/25
                        transition-all duration-300 hover:shadow-indigo-500/40 hover:-translate-y-0.5
                        ${SITE_CONFIG.theme.gradient}
                    `}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent double click event since parent handles it
                        fileInputRef.current?.click();
                    }}
                    tabIndex={-1} // Parent is already focusable
                    >
                        Browse Files
                    </button>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 flex items-center gap-2 text-red-500 bg-red-50 px-4 py-2 rounded-full"
                        >
                            <AlertCircle size={18} />
                            <span className="text-sm font-medium">{error}</span>
                        </motion.div>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative bg-white dark:bg-slate-950 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/20 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <FileJson size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">{fileName}</h3>
                                <p className="text-xs text-muted-foreground">Lottie Animation</p>
                            </div>
                        </div>
                        <button 
                            onClick={clearAnimation}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-muted-foreground hover:text-red-500 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Preview Area */}
                    <div className="p-4 md:p-12 min-h-[300px] flex items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]  dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]">
                        <div className="w-full max-w-[500px] md:max-w-[600px] h-[300px] md:h-[400px] flex items-center justify-center">
                           <DotLottiePlayer
                                src={animationSrc}
                                autoplay
                                loop
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Footer Controls (Optional - could add speed/bg color controls later) */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-900 flex justify-end gap-2">
                        <button 
                            onClick={clearAnimation}
                            className={`
                                group px-6 py-2.5 rounded-full font-semibold text-white text-sm
                                shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30
                                transition-all duration-300 hover:-translate-y-0.5 active:scale-95
                                flex items-center gap-2
                                ${SITE_CONFIG.theme.gradient}
                            `}
                        >
                            <Upload size={16} className="text-white/90 group-hover:rotate-12 transition-transform duration-300" />
                            Upload Another
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}
