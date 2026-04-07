"use client";

import Link from "next/link";
import { Play, Upload, Presentation, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-white dark:bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl hover:shadow-2xl transition-all duration-500 group"
  >
    <div className="bg-indigo-600/10 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon className="text-indigo-600" size={28} />
    </div>
    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{title}</h3>
    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
  </motion.div>
);

export default function Home() {
  return (
    <div className="flex flex-col gap-24 py-12 pb-24">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold mb-8 ring-1 ring-indigo-200 dark:ring-indigo-800"
        >
          <Zap size={14} fill="currentColor" />
          <span>New: High-Performance PPT Rendering</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-8"
        >
          Run your slides <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
            like a pro.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl font-medium leading-relaxed mb-12"
        >
          The ultimate presentation hub for MBA students. Upload, manage, and run your PowerPoint slides directly from the web. No software needed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link
            href="/upload"
            className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl font-bold text-lg shadow-2xl shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 group"
          >
            <Upload size={20} />
            Start Uploading
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/gallery"
            className="px-10 py-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-3xl font-bold text-lg shadow-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Presentation size={20} />
            View My Library
          </Link>
        </motion.div>

        {/* Decorative Grid */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-20 opacity-20 dark:opacity-10 pointer-events-none overflow-hidden">
          <div className="w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto w-full">
        {[
          { label: "Uptime", val: "99.9%" },
          { label: "Rendering", val: "Fast" },
          { label: "Security", val: "Private" },
          { label: "Storage", val: "Cloud-Ready" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl font-black text-indigo-600 mb-1">{stat.val}</div>
            <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Features Grid */}
      <section className="flex flex-col gap-12">
        <div className="text-center">
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white mb-4">Built for Business</h2>
          <p className="text-lg text-zinc-500 font-medium max-w-xl mx-auto">Everything you need to deliver high-impact presentations without the technical headaches.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Globe}
            title="Access Anywhere"
            desc="Your presentations are hosted in the cloud. Access them from any classroom or boardroom with a browser."
            delay={0.1}
          />
          <FeatureCard 
            icon={ShieldCheck}
            title="Private & Secure"
            desc="Your slides are kept private to your account. We use industry-standard encryption to keep your ideas safe."
            delay={0.2}
          />
          <FeatureCard 
            icon={Zap}
            title="Instant Preview"
            desc="No need to download files. Our fast rendering engine shows your slides instantly after upload."
            delay={0.3}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-950 rounded-[4rem] p-16 relative overflow-hidden text-center flex flex-col items-center">
        <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-indigo-600/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[100%] bg-purple-600/20 blur-[100px]" />
        
        <h2 className="text-4xl md:text-5xl font-black text-white relative z-10 mb-6">
          Ready to elevate your presentations, <br className="hidden md:block"/> Abhinav?
        </h2>
        <p className="text-zinc-400 text-xl font-medium max-w-2xl relative z-10 mb-10 leading-relaxed">
          Join other MBA students who are already using PPT Hub to streamline their academic workflow.
        </p>

        <Link
          href="/upload"
          className="px-12 py-5 bg-white text-zinc-950 rounded-full font-black text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 relative z-10"
        >
          Create New Project
          <Play size={20} fill="currentColor" />
        </Link>
      </section>

      {/* Footer info */}
      <footer className="text-center text-zinc-400 font-medium text-sm">
        <p>© 2026 PPT Hub. Designed for Abhinav & MBA Presentations.</p>
      </footer>
    </div>
  );
}
