"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Hero from "@/components/hero";
import FilterTabs from "@/components/filter-tabs";
import RepositoryCard from "@/components/repository-card";
import SearchBar from "@/components/search-bar";
import Navigation from "@/components/navigation";
import type { RepositoryType, RepositoryData } from "@/types/repository";
import { getAssetPath } from "@/lib/utils";

import repositoryData from "@/public/data/repositories.json";

export default function Home() {
  const data = repositoryData as RepositoryData;
  const [activeFilter, setActiveFilter] = useState<RepositoryType | "all">("all");

  const counts = useMemo(() => {
    const typeCounts: Record<string, number> = {
      all: data.repositories.length,
      "applied-research": 0,
      tool: 0,
    };

    data.repositories.forEach((repo) => {
      typeCounts[repo.type] = (typeCounts[repo.type] || 0) + 1;
    });

    return typeCounts;
  }, [data.repositories]);

  const filteredRepositories = useMemo(() => {
    if (activeFilter === "all") {
      return data.repositories;
    }
    return data.repositories.filter((repo) => repo.type === activeFilter);
  }, [activeFilter, data.repositories]);

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <Hero
        totalImplementations={data.totalImplementations}
        yearsOfResearch={data.yearsOfResearch}
      />

      {/* Main Content */}
      <div className="relative bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Browse Section */}
          <section id="browse" className="scroll-mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
                Browse{" "}
                <span className="bg-gradient-to-r from-caisi-purple to-caisi-purple-tint bg-clip-text text-transparent">
                  Research
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto font-medium">
                Discover AI safety implementations across evaluation, alignment, robustness, and more
              </p>
            </div>

            {/* Info Blurb */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex-shrink-0 mt-0.5 rounded-lg bg-caisi-purple/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-caisi-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">What&apos;s in the Catalog?</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
                      Executable code for AI safety research spanning individual techniques to comprehensive frameworks:
                    </p>
                    <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1 ml-3">
                      <li className="flex items-start gap-1.5">
                        <span className="text-caisi-purple mt-0.5">•</span>
                        <span><span className="font-semibold text-caisi-purple">Research</span> — novel safety techniques, benchmarks, and evaluations accompanying published work</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-caisi-purple mt-0.5">•</span>
                        <span><span className="font-semibold text-caisi-purple">Toolkit</span> — production-ready frameworks and tools for real-world AI safety applications</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar />

            {/* Filter Tabs */}
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              counts={counts}
            />

            {/* Repository Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredRepositories.map((repo, index) => (
                <RepositoryCard key={repo.repo_id} repository={repo} index={index} />
              ))}
            </div>

            {filteredRepositories.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No repositories found for this filter.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 py-12 mt-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <Image
              src={getAssetPath("caisi-logo.svg")}
              alt="CAISI Research Program"
              width={200}
              height={36}
              className="h-9 w-auto opacity-90"
            />
            <div className="h-px w-24 bg-gradient-to-r from-caisi-purple to-caisi-cyan opacity-40" />
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} Canadian AI Safety Institute Research Program at CIFAR. All rights reserved.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs text-center">
              Last updated: {new Date(data.lastUpdated).toISOString().split('T')[0]}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
