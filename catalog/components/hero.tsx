"use client";

import { motion } from "framer-motion";
import { ArrowDown, TrendingUp, Layers } from "lucide-react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

interface HeroProps {
  totalImplementations: number;
  yearsOfResearch: number;
}

export default function Hero({ totalImplementations, yearsOfResearch }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-slate-100">
      {/* Large ambient blob - top left (purple) */}
      <motion.div
        className="absolute -top-48 -left-48 w-[900px] h-[900px]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(72, 0, 172, 0.13) 0%, rgba(72, 0, 172, 0.07) 40%, rgba(72, 0, 172, 0.03) 65%, transparent 82%)',
          filter: 'blur(60px)',
          borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
        }}
        animate={{
          borderRadius: [
            '63% 37% 54% 46% / 55% 48% 52% 45%',
            '40% 60% 48% 52% / 45% 55% 45% 55%',
            '58% 42% 55% 45% / 48% 52% 45% 55%',
            '63% 37% 54% 46% / 55% 48% 52% 45%',
          ],
          x: [0, 40, -20, 0],
          y: [0, 30, -15, 0],
          scale: [1, 1.08, 0.98, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }}
      />

      {/* Medium accent blob - bottom right (cyan) */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-[800px] h-[800px]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(15, 251, 255, 0.10) 0%, rgba(15, 251, 255, 0.05) 40%, rgba(15, 251, 255, 0.02) 65%, transparent 82%)',
          filter: 'blur(65px)',
          borderRadius: '45% 55% 52% 48% / 48% 55% 45% 52%',
        }}
        animate={{
          borderRadius: [
            '45% 55% 52% 48% / 48% 55% 45% 52%',
            '55% 45% 48% 52% / 52% 48% 52% 48%',
            '48% 52% 58% 42% / 55% 45% 48% 52%',
            '45% 55% 52% 48% / 48% 55% 45% 52%',
          ],
          x: [0, -35, 20, 0],
          y: [0, 25, -30, 0],
          scale: [1, 0.96, 1.06, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95], delay: 0.5 }}
      />

      {/* Central flowing blob (purple + cyan mix) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(72, 0, 172, 0.07) 0%, rgba(15, 251, 255, 0.05) 40%, rgba(218, 41, 28, 0.03) 65%, transparent 82%)',
          filter: 'blur(70px)',
          borderRadius: '52% 48% 45% 55% / 55% 45% 55% 45%',
        }}
        animate={{
          borderRadius: [
            '52% 48% 45% 55% / 55% 45% 55% 45%',
            '48% 52% 55% 45% / 45% 55% 48% 52%',
            '55% 45% 50% 50% / 52% 48% 45% 55%',
            '52% 48% 45% 55% / 55% 45% 55% 45%',
          ],
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.05, 0.98, 1.02, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Subtle CIFAR red accent blob - top right */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(218, 41, 28, 0.07) 0%, rgba(218, 41, 28, 0.03) 50%, transparent 75%)',
          filter: 'blur(50px)',
          borderRadius: '58% 42% 48% 52% / 52% 55% 45% 48%',
        }}
        animate={{
          borderRadius: [
            '58% 42% 48% 52% / 52% 55% 45% 48%',
            '45% 55% 55% 45% / 48% 52% 55% 45%',
            '58% 42% 48% 52% / 52% 55% 45% 48%',
          ],
          x: [0, 25, 0],
          y: [0, -20, 0],
          scale: [1, 1.04, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: [0.65, 0, 0.35, 1], delay: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <Image
            src={getAssetPath("caisi-logo.svg")}
            alt="CAISI — Canadian AI Safety Institute Research Program"
            width={320}
            height={56}
            className="object-contain h-14 w-auto"
            priority
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 leading-tight tracking-tight"
        >
          Research{" "}
          <span className="bg-gradient-to-r from-caisi-purple to-caisi-cyan bg-clip-text text-transparent">
            Catalog
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl mb-12 text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Explore AI safety research implementations from the Canadian AI Safety Institute Research Program at CIFAR
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-caisi-purple/10 rounded-xl border border-caisi-purple/25">
              <Layers className="w-6 h-6 text-caisi-purple" />
            </div>
            <div className="text-left">
              <div className="text-3xl md:text-4xl font-bold text-gray-900">{totalImplementations}</div>
              <div className="text-sm text-gray-600 uppercase tracking-widest font-semibold">Implementations</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-caisi-cyan/10 rounded-xl border border-caisi-cyan/30">
              <TrendingUp className="w-6 h-6 text-caisi-cyan-shade" />
            </div>
            <div className="text-left">
              <div className="text-3xl md:text-4xl font-bold text-gray-900">{yearsOfResearch}</div>
              <div className="text-sm text-gray-600 uppercase tracking-widest font-semibold">Years of Research</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="#browse"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-caisi-purple to-caisi-purple-tint hover:from-caisi-purple-shade hover:to-caisi-purple text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg shadow-caisi-purple/25 transition-all mb-8"
        >
          Browse Research
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </motion.a>

        {/* Search Bar in Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="max-w-2xl mx-auto"
        >
          <div id="hero-search" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-caisi-purple/40"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </div>
  );
}
