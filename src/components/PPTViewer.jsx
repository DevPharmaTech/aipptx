"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const DocViewer = dynamic(
  () => import("@cyntler/react-doc-viewer"),
  { 
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center p-24 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
        <p className="text-zinc-500 font-medium">Loading Viewer...</p>
      </div>
    )
  }
);

export default function PPTViewer({ url }) {
  const docs = [
    { uri: url },
  ];

  return (
    <div className="w-full h-[80vh] rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-zinc-900 shadow-2xl">
      <DocViewer 
        documents={docs} 
        config={{
          header: {
            disableHeader: true,
          },
          csvDelimiter: ",",
          pdfZoom: {
            defaultZoom: 1.1,
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
    </div>
  );
}
