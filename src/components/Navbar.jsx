"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Presentation, Upload, LayoutGrid, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const NavItem = ({ href, icon: Icon, children, active }) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
      active 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20" 
        : "text-zinc-600 hover:bg-zinc-100 hover:text-indigo-600 dark:text-zinc-400 dark:hover:bg-zinc-800"
    )}
  >
    <Icon size={18} />
    <span className="font-medium">{children}</span>
  </Link>
);

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-800 shadow-2xl rounded-3xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Presentation className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            PPT<span className="text-indigo-600">Hub</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <NavItem href="/" icon={Home} active={pathname === "/"}>
            Home
          </NavItem>
          <NavItem href="/upload" icon={Upload} active={pathname === "/upload"}>
            Upload
          </NavItem>
          <NavItem href="/gallery" icon={LayoutGrid} active={pathname === "/gallery"}>
            Library
          </NavItem>
        </div>
      </div>
    </nav>
  );
}
