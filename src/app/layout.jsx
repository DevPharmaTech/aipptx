import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PPT Hub - Abhinav's Presentation Manager",
  description: "Upload and view PowerPoint presentations with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 pt-24 px-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
        
        {/* Subtle background decorative elements */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] rounded-full bg-blue-500/5 blur-[100px]" />
          <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] rounded-full bg-purple-500/5 blur-[110px]" />
        </div>
      </body>
    </html>
  );
}
