"use client";

import { motion } from "framer-motion";
import { Wrench, FlaskConical, Grid3x3, type LucideIcon } from "lucide-react";
import type { RepositoryType } from "@/types/repository";

interface FilterTabsProps {
  activeFilter: RepositoryType | "all";
  onFilterChange: (filter: RepositoryType | "all") => void;
  counts: Record<string, number>;
}

const filters: Array<{ key: RepositoryType | "all"; label: string; icon: LucideIcon }> = [
  { key: "all", label: "All", icon: Grid3x3 },
  { key: "applied-research", label: "Research", icon: FlaskConical },
  { key: "tool", label: "Toolkit", icon: Wrench },
];

export default function FilterTabs({ activeFilter, onFilterChange, counts }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {filters.map(({ key, label, icon: Icon }) => {
        const count = counts[key] || 0;
        const isActive = activeFilter === key;

        return (
          <motion.button
            key={key}
            onClick={() => onFilterChange(key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-6 py-3 rounded-xl font-semibold transition-all ${
              isActive
                ? "bg-gradient-to-r from-caisi-purple to-caisi-purple-tint text-white shadow-lg shadow-caisi-purple/25"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-caisi-purple dark:hover:border-caisi-purple hover:text-caisi-purple"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-caisi-purple to-caisi-purple-tint rounded-xl"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {label}
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                isActive
                  ? "bg-white/20"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
                {count}
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
