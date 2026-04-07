"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2, FileWarning, ExternalLink } from "lucide-react";

// Dynamically import DocViewer to avoid SSR issues
const DocViewer = dynamic(
  () => import("@cyntler/react-doc-viewer"),
  { 
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center p-24 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
        <p className="text-zinc-500 font-medium">Preparing Local Viewer...</p>
      </div>
    )
  }
);

export default function PPTViewer({ url, pdfUrl }) {
  const [DocViewerRenderers, setDocViewerRenderers] = useState(null);
  const [error, setError] = useState(false);
  const [usingPdfFallback, setUsingPdfFallback] = useState(false);

  // We prioritize the PDF version for 100% local rendering
  const finalUrl = pdfUrl || url;
  const fileExtension = finalUrl.split('.').pop()?.toLowerCase() || 'pdf';

  useEffect(() => {
    // Import renderers only on client
    import("@cyntler/react-doc-viewer").then((mod) => {
      setDocViewerRenderers(() => mod.DocViewerRenderers);
      if (pdfUrl) {
        setUsingPdfFallback(true);
        console.log(`PPT Hub: Using high-fidelity local PDF version for rendering.`);
      }
    }).catch(err => {
      console.error("PPT Hub: Failed to load doc viewer renderers", err);
      setError(true);
    });
  }, [url, pdfUrl]);

  const docs = [
    { 
      uri: finalUrl,
      fileType: fileExtension, 
    },
  ];

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-24 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-xl">
        <FileWarning className="text-rose-500 mb-4" size={48} />
        <p className="text-zinc-500 font-medium text-center">
          Oops! Failed to initialize the local viewer. <br/>
          Please try refreshing the page.
        </p>
      </div>
    );
  }

  if (!DocViewerRenderers) {
    return (
      <div className="flex flex-col items-center justify-center p-24 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-xl">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
        <p className="text-zinc-500 font-medium text-center">
          Preparing High-Fidelity Slides... <br/>
          <span className="text-xs text-zinc-400 mt-2 block">Powered by Local LibreOffice Engine</span>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[80vh] rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-zinc-900 shadow-2xl bg-white relative">
      <DocViewer 
        documents={docs} 
        pluginRenderers={DocViewerRenderers}
        config={{
          header: {
            disableHeader: true,
          },
          pdfVerticalScrollByDefault: true,
          pdfZoom: {
            defaultZoom: 1.2,
            zoomJump: 0.1,
          },
        }}
        theme={{
          primary: "#4f46e5",
          secondary: "#ffffff",
          tertiary: "#f8fafc",
          textPrimary: "#18181b",
          textSecondary: "#71717a",
          textTertiary: "#71717a",
          disableThemeScrollbar: false,
        }}
      />
      
      <div className="absolute top-0 right-0 p-4 pointer-events-none flex flex-col items-end gap-2">
        <div className="bg-indigo-600/10 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm shadow-sm ring-1 ring-white/20">
          PPT Hub Professional Viewer (Local)
        </div>
        {usingPdfFallback && (
          <div className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm shadow-sm ring-1 ring-white/20 flex items-center gap-1">
            <ExternalLink size={10} />
            High Fidelity PDF Mode
          </div>
        )}
      </div>
    </div>
  );
}
