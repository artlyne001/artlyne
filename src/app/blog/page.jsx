"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import posts from "@/data/posts.json";

export default function BlogPage() {
    const featuredPost = posts[0];
    const recentPosts = posts.slice(1);

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-brand-pink/30 selection:text-brand-pink">
            <Navbar />

            {/* Header / Hero */}
            <section className="pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[400px] bg-linear-to-b from-purple-50 via-white to-transparent dark:from-purple-900/10 dark:via-zinc-950 dark:to-zinc-950 -z-10" />
                
                <div className="max-w-7xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        Insights & <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-pink to-purple-600">Inspiration</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore the latest trends in motion design, technical deep dives, and tutorials on getting the most out of Lottie animations.
                    </p>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 pb-24 w-full grow">
                
                {/* Featured Post */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        <span className="w-8 h-1 bg-brand-pink rounded-full" />
                        Featured Article
                    </h2>
                    
                    <Link href={`/blog/${featuredPost.slug}`} className="group relative block bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:border-brand-pink/20 transition-all duration-500 overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-0">
                            {/* Image Placeholder */}
                            <div className="h-64 md:h-full bg-gray-100 dark:bg-zinc-800 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                    <span className="text-8xl font-black opacity-10">IMG</span>
                                </div>
                                {/* <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /> */}
                            </div>

                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-3 text-sm font-medium mb-4">
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full dark:bg-purple-900/30 dark:text-purple-300">
                                        {featuredPost.category}
                                    </span>
                                    <span className="text-gray-400 flex items-center gap-1">
                                        <Calendar size={14} /> {featuredPost.date}
                                    </span>
                                </div>
                                
                                <h3 className="text-3xl font-bold mb-4 group-hover:text-brand-pink transition-colors">
                                    {featuredPost.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-3 text-lg leading-relaxed">
                                    {featuredPost.excerpt}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                            {featuredPost.author.charAt(0)}
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-bold text-gray-900 dark:text-gray-200">{featuredPost.author}</div>
                                            <div className="text-gray-400">Author</div>
                                        </div>
                                    </div>
                                    <span className="flex items-center gap-2 font-bold text-brand-pink">
                                        Read Article <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Recent Grid */}
                <div>
                    <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentPosts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
                                <div className="h-48 bg-gray-100 dark:bg-zinc-800 relative overflow-hidden">
                                     <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                        <span className="text-6xl font-black opacity-10">IMG</span>
                                    </div>
                                    {/* <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" /> */}
                                </div>
                                <div className="p-6 grow flex flex-col">
                                    <div className="flex items-center gap-2 text-xs font-bold text-brand-pink mb-3 uppercase tracking-wider">
                                        {post.category}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-brand-pink transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50 dark:border-zinc-800">
                                        <span className="text-xs text-gray-400 font-medium">
                                            {post.date}
                                        </span>
                                        <span className="text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

            <Footer />
        </main>
    );
}
