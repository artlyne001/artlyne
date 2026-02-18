"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import posts from "@/data/posts.json";
import { notFound } from "next/navigation";
import { use } from "react";

export default function BlogPost({ params }) {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const post = posts.find((p) => p.slug === resolvedParams.slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-brand-pink/30 selection:text-brand-pink">
            <Navbar />

            <article className="pt-32 pb-24 px-6 md:px-12 w-full max-w-4xl mx-auto">
                <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-pink transition-colors mb-8 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
                </Link>

                <div className="space-y-6 text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-sm font-bold uppercase tracking-wider">
                        {post.category}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-6 text-gray-500 text-sm md:text-base">
                        <div className="flex items-center gap-2">
                            <User size={18} />
                            <span className="font-medium text-gray-900 dark:text-white">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>{post.date}</span>
                        </div>
                    </div>
                </div>

                <div className="w-full aspect-video bg-gray-100 dark:bg-zinc-800 rounded-3xl overflow-hidden mb-16 relative shadow-sm">
                     <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                        <span className="text-9xl font-black opacity-10">IMG</span>
                    </div>
                    {/* <img src={post.image} alt={post.title} className="w-full h-full object-cover" /> */}
                </div>

                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                    <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 font-medium">
                        {post.excerpt}
                    </p>
                    <div className="bg-gray-50 dark:bg-zinc-800/50 p-8 rounded-2xl border-l-4 border-brand-pink my-8">
                         <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Quick Summary</h3>
                         <p className="m-0 text-gray-600 dark:text-gray-400">
                            This article explores the key techniques behind high-performance Lottie animations, focusing on vector complexity and proper layer management in After Effects.
                         </p>
                    </div>
                    
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    
                    <h2>Why Lottie Matters</h2>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>

                    <blockquote>
                        "Animation is not just about making things move, it's about making things feel alive."
                    </blockquote>

                    <p>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </p>
                </div>

                <hr className="my-12 border-gray-100 dark:border-zinc-800" />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xl">
                            {post.author.charAt(0)}
                        </div>
                        <div>
                             <div className="text-gray-400 text-xs uppercase tracking-wider font-bold">Written by</div>
                            <div className="font-bold text-lg text-gray-900 dark:text-white">{post.author}</div>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-brand-pink hover:text-brand-pink transition-colors font-medium">
                        <Share2 size={18} /> Share Article
                    </button>
                </div>

            </article>

            <Footer />
        </main>
    );
}
