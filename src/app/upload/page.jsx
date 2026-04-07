"use client";

import FileUpload from "@/components/FileUpload";
import { Upload, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();

  return (
    <div className="py-12 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
          <Upload size={16} />
          <span>Upload Center</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight mb-4">
          Ready to present? <br/> Upload your slides here
        </h1>
        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
          Whether it's for class or a client pitch, PPT Hub makes it easy for you to manage and run your presentations.
        </p>
      </motion.div>

      <FileUpload onUploadComplete={() => {
        setTimeout(() => {
          router.push("/gallery");
        }, 1500);
      }} />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-8 shadow-xl shadow-zinc-200/50 dark:shadow-none flex items-start gap-4"
      >
        <div className="bg-indigo-600 p-2 rounded-lg shrink-0">
          <Info className="text-white" size={20} />
        </div>
        <div className="text-left">
          <h4 className="font-bold text-zinc-900 dark:text-white text-lg">Pro Tip for Abhinav</h4>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
            Your uploaded files are saved to the <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono text-zinc-600 dark:text-zinc-300">public/uploads</code> folder. 
            Once uploaded, they will appear in your private library where you can run them anytime.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
