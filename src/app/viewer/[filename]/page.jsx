"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Maximize2, Share2, MoreHorizontal, Download, Cpu } from "lucide-react";
import PPTViewer from "@/components/PPTViewer";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

export default function ViewerPage({ params: paramsPromise }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = use(paramsPromise);
  const fileName = decodeURIComponent(params.filename);
  
  // Check if URL is provided as query parameter (for Vercel Blob)
  const fileUrl = searchParams.get('url') || `/uploads/${fileName}`;
  const pdfUrlParam = searchParams.get('pdfUrl');
  const isRemoteUrl = /^https?:\/\//i.test(fileUrl);
  const pdfUrl = pdfUrlParam || (!isRemoteUrl ? `/uploads/${fileName.replace(/\.(pptx|ppt)$/i, ".pdf")}` : null);

  return (
    <div className="py-6 mb-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between gap-6 mb-8"
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push("/gallery")}
            className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white truncate max-w-md">
              {fileName}
            </h1>
            <p className="text-sm text-zinc-400 font-medium">
              Mode: Slideshow Viewer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold ring-1 ring-emerald-500/20">
            <Cpu size={14} />
            Rendering Local Engine
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
            <Maximize2 size={18} />
            Full Screen
          </button>
          <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
          <button className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
            <Download size={20} />
          </button>
          <button className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
            <Share2 size={20} />
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-100 dark:bg-zinc-900/50 p-6 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-inner"
      >
        <PPTViewer url={fileUrl} pdfUrl={pdfUrl} />
      </motion.div>
    </div>
  );
}
