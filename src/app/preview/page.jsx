import AnimationDropzone from '@/components/preview/AnimationDropzone';
import { SITE_CONFIG } from '@/config/constants';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Preview Lottie Animations - ' + SITE_CONFIG.name,
  description: 'Instantly preview your Lottie JSON and .lottie animation files in the browser.',
};

export default function PreviewPage() {
    return (
        <main className="min-h-screen pt-10 pb-20 px-6 bg-background overflow-hidden relative">
            {/* Back Button */}
            <Link 
                href="/" 
                className="absolute top-6 left-6 md:top-10 md:left-10 z-50 p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 transition-all shadow-sm group"
                aria-label="Back to Home"
            >
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </Link>

            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="max-w-7xl mx-auto space-y-8 relative z-10">
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium border border-indigo-100 dark:border-indigo-800">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        Free Lottie Previewer
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                        Preview your <br className="hidden md:block" />
                        <span className={`text-transparent bg-clip-text ${SITE_CONFIG.theme.gradient}`}>
                            Animations
                        </span> Instantly
                    </h1>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Simply drag and drop your Lottie JSON or .lottie files below to see them in action. 
                        Debug, test, and view your motion graphics in a real-time environment.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-indigo-500/5 rounded-[40px] blur-3xl -z-10" />
                    <AnimationDropzone />
                </div>

            </div>
        </main>
    )
}
