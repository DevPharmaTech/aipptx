"use client";

import { useState, useRef } from "react";
import { Upload, File, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function FileUpload({ onUploadComplete }) {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, uploading, success, error
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.name.endsWith(".pptx") && !file.name.endsWith(".ppt")) {
      setStatus("error");
      setFileName("Only .pptx or .ppt files are allowed");
      return;
    }

    setFileName(file.name);
    setStatus("uploading");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setStatus("success");
        
        // Redirect to viewer with the blob URL
        const viewerUrl = `/viewer/${encodeURIComponent(file.name)}?url=${encodeURIComponent(data.fileUrl)}`;
        window.location.href = viewerUrl;
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          handleFile(file);
        }}
        onClick={() => fileInputRef.current.click()}
        className={cn(
          "relative border-2 border-dashed rounded-[2.5rem] p-12 transition-all duration-300 cursor-pointer overflow-hidden",
          "flex flex-col items-center justify-center text-center gap-6",
          isDragging 
            ? "border-indigo-500 bg-indigo-500/5 scale-[1.02] shadow-2xl shadow-indigo-500/10" 
            : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900",
          status === "uploading" && "pointer-events-none opacity-80"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".ppt,.pptx"
          onChange={(e) => handleFile(e.target.files[0])}
        />

        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="bg-indigo-600/10 p-5 rounded-full ring-8 ring-indigo-500/5">
                <Upload className="text-indigo-600" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Drop your PPT here
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                  or click to browse from your computer
                </p>
              </div>
              <div className="text-xs font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full uppercase tracking-wider mt-2">
                Supported: .pptx, .ppt
              </div>
            </motion.div>
          )}

          {status === "uploading" && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <Loader2 className="animate-spin text-indigo-600" size={48} />
              <div className="text-lg font-semibold">Uploading {fileName}...</div>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <CheckCircle className="text-emerald-500" size={48} />
              <div className="text-xl font-bold text-emerald-600">Great! Upload Successful</div>
              <p className="text-zinc-500">{fileName}</p>
              <button 
                onClick={(e) => { e.stopPropagation(); setStatus("idle"); }}
                className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
              >
                Upload another one
              </button>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <XCircle className="text-rose-500" size={48} />
              <div className="text-xl font-bold text-rose-600">Oops! Something went wrong</div>
              <p className="text-zinc-500">{fileName || "Error during upload"}</p>
              <button 
                onClick={(e) => { e.stopPropagation(); setStatus("idle"); }}
                className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
              >
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
