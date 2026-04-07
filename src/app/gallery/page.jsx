"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Presentation, LayoutGrid, Plus, Loader2, FileText, ChevronRight, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function GalleryPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/files")
      .then(res => res.json())
      .then(data => {
        setFiles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-12">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
            <LayoutGrid size={16} />
            <span>Library</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
            Your Presentations
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
            Browse through your uploaded slides.
          </p>
        </div>

        <Link
          href="/upload"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-3xl font-bold shadow-xl shadow-indigo-200 dark:shadow-none flex items-center gap-2 transition-all duration-300"
        >
          <Plus size={20} />
          New Presentation
        </Link>
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
          <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
          <p className="text-zinc-500 font-medium">Fetching your library...</p>
        </div>
      ) : files.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-24 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-full mb-6">
            <Presentation size={64} className="text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Your library is currently empty</h3>
          <p className="text-zinc-500 max-w-sm mt-2 mb-8">
            Start by uploading your first PowerPoint presentation to see it here.
          </p>
          <Link
            href="/upload"
            className="text-indigo-600 font-bold hover:underline underline-offset-4 flex items-center gap-1 group"
          >
            Upload now 
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {files.map((file, idx) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="bg-indigo-600/10 p-4 rounded-2xl">
                  <FileText className="text-indigo-600" size={32} />
                </div>
                <Link
                  href={`/viewer/${encodeURIComponent(file.name)}?url=${encodeURIComponent(file.url)}`}
                  className="bg-indigo-600 text-white p-3 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl shadow-indigo-300"
                >
                  <Play size={20} fill="currentColor" />
                </Link>
              </div>

              <h4 className="text-xl font-bold text-zinc-900 dark:text-white truncate">
                {file.name}
              </h4>
              <p className="text-sm text-zinc-400 mt-1 font-medium">
                Uploaded • {new Date(file.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <Link
                  href={`/viewer/${encodeURIComponent(file.name)}?url=${encodeURIComponent(file.url)}`}
                  className="flex-1 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white py-3.5 rounded-2xl font-bold text-center hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                  Run Slides
                </Link>
              </div>

              {/* Decorative side accent */}
              <div className="absolute top-0 right-0 w-1 h-full bg-indigo-600 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
