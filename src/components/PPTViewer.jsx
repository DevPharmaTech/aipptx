"use client";

import { useRef, useState } from "react";
import { Loader2, FileWarning, ExternalLink, Maximize2, Download } from "lucide-react";

const buildViewerUrl = (url, fileType) => {
  if (!url) return null;
  if (fileType === "pdf") {
    return url;
  }

  if (fileType === "pptx" || fileType === "ppt") {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
  }

  return url;
};

export default function PPTViewer({ url, pdfUrl }) {
  const [error, setError] = useState(false);
  const viewerRef = useRef(null);

  const finalUrl = pdfUrl || url;
  const fileType = finalUrl?.split(".").pop()?.split("?")[0]?.toLowerCase() || "pdf";
  const viewerUrl = buildViewerUrl(finalUrl, fileType);

  const handleFullScreen = async () => {
    if (!viewerRef.current) return;
    try {
      if (viewerRef.current.requestFullscreen) {
        await viewerRef.current.requestFullscreen();
      } else if (viewerRef.current.webkitRequestFullscreen) {
        await viewerRef.current.webkitRequestFullscreen();
      } else if (viewerRef.current.msRequestFullscreen) {
        await viewerRef.current.msRequestFullscreen();
      }
    } catch (err) {
      console.error("Full-screen failed", err);
      setError(true);
    }
  };

  if (!viewerUrl) {
    return (
      <div className="flex flex-col items-center justify-center p-24 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-xl">
        <FileWarning className="text-rose-500 mb-4" size={48} />
        <p className="text-zinc-500 text-center">
          Unable to preview this file. <br />
          Please download it and open it locally.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[80vh] rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-zinc-900 shadow-2xl bg-black" ref={viewerRef}>
      <div className="absolute top-4 right-4 z-20 flex flex-wrap gap-2 p-2">
        <button
          type="button"
          onClick={handleFullScreen}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-3xl bg-white/90 text-zinc-900 shadow-lg hover:bg-white"
        >
          <Maximize2 size={16} />
          Full Screen
        </button>
        <a
          href={finalUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-3xl bg-zinc-900 text-white shadow-lg hover:bg-zinc-800"
        >
          <Download size={16} />
          Open File
        </a>
      </div>

      <iframe
        src={viewerUrl}
        title="PPT Viewer"
        className="w-full h-full border-0 bg-white"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white p-6 text-center">
          <div>
            <p className="text-xl font-bold mb-3">Viewer error</p>
            <p>Unable to open this file in the viewer. Please reload or download it directly.</p>
          </div>
        </div>
      )}
    </div>
  );
}
