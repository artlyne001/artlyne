"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Upload, FileText, Plus } from "lucide-react";

// Firebase Imports
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const fileInputRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState("Premium");
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // Manual Upload State
    const [manualUrlMode, setManualUrlMode] = useState(false);
    const [manualUrl, setManualUrl] = useState("");

    // Form states matching the visual
    const [enableAe, setEnableAe] = useState(true);
    const [enableAi, setEnableAi] = useState(true);

    const [categories, setCategories] = useState(["Premium", "Free", "Exclusive", "New"]);
    const [newCategory, setNewCategory] = useState("");
    const [isAddingCategory, setIsAddingCategory] = useState(false);

    // Manage Animations State
    const [uploadedAnimations, setUploadedAnimations] = useState([]);
    const [loadingAnimations, setLoadingAnimations] = useState(true); 

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    // Fetch existing animations
    const fetchAnimations = async () => {
        try {
            const q = query(collection(db, "animations"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const animations = [];
            querySnapshot.forEach((doc) => {
                animations.push({ id: doc.id, ...doc.data() });
            });
            setUploadedAnimations(animations);
        } catch (error) {
            console.error("Error fetching animations:", error);
        } finally {
            setLoadingAnimations(false);
        }
    };

    useEffect(() => {
        fetchAnimations();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this animation?")) return;
        
        try {
            await deleteDoc(doc(db, "animations", id));
            // Update UI
            setUploadedAnimations(prev => prev.filter(anim => anim.id !== id));
        } catch (error) {
            console.error("Error deleting animation:", error);
            alert("Failed to delete animation.");
        }
    };

    const handleAddCategory = () => {
        if (newCategory.trim()) {
             if (!categories.includes(newCategory.trim())) {
                setCategories([...categories, newCategory.trim()]);
             }
            setNewCategory("");
            setIsAddingCategory(false);
        }
    };

    const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
    const ALLOWED_EXTENSIONS = /\.(json|lottie)$/i;

    const sanitizeFileName = (name) => {
        const base = name.replace(/^.*[\\/]/, "").replace(/[^a-zA-Z0-9._-]/g, "_");
        return base || "animation";
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
                setStatus("error");
                setErrorMessage(`File too large. Max size is ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB.`);
                setFile(null);
                e.target.value = "";
                return;
            }
            if (!ALLOWED_EXTENSIONS.test(selectedFile.name)) {
                setStatus("error");
                setErrorMessage("Only .json and .lottie files are allowed.");
                setFile(null);
                e.target.value = "";
                return;
            }
            setStatus(null);
            setErrorMessage("");
            setFile(selectedFile);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (manualUrlMode) return; // Disable drop in manual mode

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.size > MAX_FILE_SIZE_BYTES) {
                setStatus("error");
                setErrorMessage(`File too large. Max size is ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB.`);
                setFile(null);
                return;
            }
            if (!ALLOWED_EXTENSIONS.test(droppedFile.name)) {
                setStatus("error");
                setErrorMessage("Only .json and .lottie files are allowed.");
                setFile(null);
                return;
            }
            setStatus(null);
            setErrorMessage("");
            setFile(droppedFile);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleAreaClick = (e) => {
        // Don't trigger file input if clicking on interactive elements or in manual mode
        if (manualUrlMode) return;
        
        // Prevent triggering if clicking the toggle buttons inside the container
        if (e.target.closest('button') || e.target.closest('input')) return;

        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation for manual mode vs file upload mode
        if (manualUrlMode) {
             if (!manualUrl) {
                setStatus('error');
                setErrorMessage("Please enter a valid URL.");
                return;
            }
        } else if (!file) {
            setStatus('error');
            setErrorMessage("Please select a file.");
            return;
        }

        if (!title) {
            setStatus('error');
            setErrorMessage("Please enter an animation name.");
            return;
        }

        setIsUploading(true);
        setStatus(null);
        setErrorMessage("");

        try {
            let downloadURL = manualUrl;

            // Only upload if NOT in manual mode
            if (!manualUrlMode && file) {
                if (file.size > MAX_FILE_SIZE_BYTES) {
                    setStatus("error");
                    setErrorMessage(`File too large. Max size is ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB.`);
                    return;
                }
                const safeName = sanitizeFileName(file.name);
                const storageRef = ref(storage, `animations/${Date.now()}-${safeName}`);
                const snapshot = await uploadBytes(storageRef, file);
                downloadURL = await getDownloadURL(snapshot.ref);
            }

            // 2. Save Metadata to Firestore
            await addDoc(collection(db, "animations"), {
                title: title,
                category: selectedCategory,
                lottieSrc: downloadURL,
                color: 'text-brand-pink',
                createdAt: new Date(),
                enableAe: enableAe,
                enableAi: enableAi
            });

            setStatus('success');
            setTimeout(() => {
                router.push('/');
            }, 1000);

        } catch (err) {
            console.error("Upload failed: ", err);
            setStatus('error');
            setErrorMessage(err.message || "Upload failed. Check console.");

            // Check for missing config error
            if (err.code === 'storage/invalid-argument') {
                 setErrorMessage("Firebase Config missing. Please update src/lib/firebase.js");
            } else if (err.message && (err.message.toLowerCase().includes('billing') || err.message.toLowerCase().includes('plan'))) {
                setErrorMessage("Firebase Error: Your project may require the Blaze plan (likely due to an installed Extension/Function). Check Firebase Console.");
            }
        } finally {
            setIsUploading(false);
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-pink"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#FAFAFA] text-zinc-800 flex flex-col font-sans">
            <Navbar />

            <div className="grow pt-36 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto w-full">

                <div className="flex flex-col lg:flex-row gap-8 items-start mb-12">
                    {/* Main Upload Area */}
                    <div   className="relative bg-[#F9F9F9] border-2 border-dashed border-gray-200 rounded-[40px] h-[350px] md:h-[500px] flex flex-col items-center justify-center transition-colors hover:bg-gray-50 w-full lg:w-[70%] cursor-pointer"
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

                        <div className="flex flex-col items-center gap-6 pointer-events-none">
                            <div className="w-24 h-24 text-gray-300">
                               <Upload size={96} strokeWidth={1.5} />
                            </div>
                            <p className="text-gray-400 text-lg font-medium">
                                {file ? file.name : "Upload aftereffects animation files here"}
                            </p>
                        </div>



                        <div className="absolute top-10 right-10 bg-white p-5 rounded-2xl shadow-sm border border-pink-100 w-60 z-20 pointer-events-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-brand-pink font-bold text-sm">Add source file</h3>
                                <FileText size={16} className="text-brand-pink" />
                            </div>
                            <div className="flex flex-col gap-3">
                                {/* Manual Upload Toggle */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-600">Manual URL</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (!manualUrlMode) {
                                                setFile(null); // Clear file if switching to manual
                                                setErrorMessage("");
                                            }
                                            setManualUrlMode(!manualUrlMode);
                                        }}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${manualUrlMode ? 'bg-brand-pink' : 'bg-gray-200'}`}
                                    >
                                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${manualUrlMode ? 'translate-x-6' : ''}`} />
                                    </button>
                                </div>

                                <div className="flex gap-3 mt-2">
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
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2">Enable file options</p>
                        </div>

                        {manualUrlMode ? (
                            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center scroll-mt-25">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                                    <Upload size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Manual URL Entry</h3>
                                <p className="text-gray-400 mb-6 max-w-sm">
                                    Enter the direct URL to your Lottie JSON file (e.g., from public folder or external host).
                                </p>
                                <input
                                    type="text"
                                    value={manualUrl}
                                    onChange={(e) => {
                                        setManualUrl(e.target.value);
                                        setStatus(null);
                                        // Clear error if they fix it
                                        if (errorMessage.includes('must end')) setErrorMessage("");
                                    }}
                                    placeholder="https://.../animation.json"
                                    className="w-full max-w-md px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-pink focus:outline-none transition-all"
                                />
                                {manualUrl && (
                                    <div className={`mt-4 text-sm font-medium ${
                                        manualUrl.match(/\.(json|lottie)(\?.*)?$/i) ? "text-green-600" : "text-amber-500"
                                    }`}>
                                        {manualUrl.match(/\.(json|lottie)(\?.*)?$/i) 
                                            ? "Format looks correct!" 
                                            : "Warning: URL should end in .json or .lottie to work correctly."}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".json,.lottie"
                                />

                                <div className="flex flex-col items-center gap-6 pointer-events-none">
                                    <div className="w-24 h-24 text-gray-300">
                                       <Upload size={96} strokeWidth={1.5} />
                                    </div>
                                    <p className="text-gray-400 text-lg font-medium">
                                        {file ? file.name : "Upload aftereffects animation files here"}
                                    </p>
                                </div>

                             
                            </>
                        )}
                    </div>

                    {/* Right Side: Metadata & Keywords */}
                    <div className="w-full lg:w-[30%] flex flex-col gap-8">
                        {/* Animation Name Input */}
                         <div>
                            <h2 className="text-xl font-bold mb-2">Animation Name</h2>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Happy Customer"
                                className="w-full px-5 py-3 rounded-2xl border-2 border-dashed border-gray-200 bg-[#F9F9F9] focus:outline-none focus:border-brand-pink focus:bg-white transition-all text-lg font-medium"
                            />
                        </div>

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
                                        placeholder="Enter category..." className="px-4 py-2 border rounded-full focus:outline-none focus:border-brand-pink min-w-[150px]"
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

                        {/* Launch Button */}
                        <div className="mt-10">
                            <button
                                onClick={handleSubmit}
                                disabled={isUploading}
                                className={`w-full bg-brand-pink hover:bg-brand-pink-hover text-white text-lg font-bold py-4 px-6 rounded-full shadow-xl shadow-brand-pink/30 hover:shadow-2xl hover:shadow-brand-pink/40 transition-all active:scale-95 ${isUploading ? 'opacity-70 cursor-wait' : ''}`}
                            >
                                {isUploading ? "Launching..." : "Launch animation"}
                            </button>
                            {status === 'error' && (
                                <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
                            )}
                        </div>
                    </div>
                </div>

                {status === 'success' && (
                     <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-4">
                        Animation Launched Successfully!
                     </div>
                )}
            </div>

            {/* Manage Animations Section */}
            <div className="bg-white py-24 border-t border-gray-100">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
                    <h2 className="text-3xl font-bold mb-8 text-center">Manage Uploaded Animations</h2>
                    
                    {loadingAnimations ? (
                         <div className="flex justify-center p-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-pink"></div>
                        </div>
                    ) : uploadedAnimations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {uploadedAnimations.map((anim) => (
                                <div key={anim.id} className="bg-[#F9F9F9] p-4 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-brand-pink/30 hover:shadow-lg transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-white rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden">
                                            {/* We use a generic icon because loading the full player for list is heavy */}
                                            <div className="text-xs font-bold text-brand-pink bg-brand-pink/10 px-2 py-1 rounded">JSON</div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 line-clamp-1">{anim.title}</h3>
                                            <p className="text-xs text-gray-400">{anim.category} • {new Date(anim.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(anim.id)}
                                        className="p-2 bg-white text-red-500 rounded-full border border-gray-100 hover:bg-red-50 hover:border-red-100 transition-colors shadow-sm"
                                        title="Delete Animation"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400">No animations uploaded yet.</p>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
