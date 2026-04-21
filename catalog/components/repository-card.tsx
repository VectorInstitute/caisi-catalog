"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText, BookOpen, Code2, Database, Check, Tag } from "lucide-react";
import type { Repository } from "@/types/repository";
import { useState } from "react";

interface RepositoryCardProps {
  repository: Repository;
  index?: number;
}

const TYPE_LABEL: Record<string, string> = {
  "tool": "Toolkit",
  "applied-research": "Research",
};

const TYPE_COLORS: Record<string, string> = {
  "tool": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  "applied-research": "bg-caisi-purple/10 text-caisi-purple dark:text-violet-400 border-caisi-purple/30",
};

export default function RepositoryCard({ repository, index = 0 }: RepositoryCardProps) {
  const repoUrl = repository.github_url || (repository.repo_id ? `https://github.com/${repository.repo_id}` : null);
  const repoSlug = repository.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const [copied, setCopied] = useState(false);

  const handleCiteCopy = async () => {
    if (!repository.bibtex) return;
    try {
      const baseUrl = window.location.pathname.includes('/caisi-catalog') ? '/caisi-catalog' : '';
      const response = await fetch(`${baseUrl}/data/papers.bib`);
      const bibtexContent = await response.text();
      const entryRegex = new RegExp(`@\\w+\\{${repository.bibtex},[\\s\\S]*?\\n\\}`, 'i');
      const match = bibtexContent.match(entryRegex);
      if (match) {
        await navigator.clipboard.writeText(match[0]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Failed to copy citation:', error);
    }
  };

  return (
    <motion.article
      id={repoSlug}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 p-6 overflow-hidden scroll-mt-20"
    >
      {/* Gradient accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-caisi-purple via-caisi-purple-tint to-caisi-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-caisi-purple/4 rounded-full blur-3xl group-hover:bg-caisi-purple/8 transition-colors duration-500" />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          {repoUrl ? (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white hover:text-caisi-purple dark:hover:text-violet-400 transition-colors"
            >
              <span className="truncate">{repository.name}</span>
              <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity" />
            </a>
          ) : (
            <span className="text-xl font-bold text-gray-900 dark:text-white">{repository.name}</span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
          <span className="inline-flex items-center gap-1 bg-caisi-purple/8 text-caisi-purple border border-caisi-purple/20 text-xs font-semibold px-3 py-1.5 rounded-full">
            {repository.year}
          </span>
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border ${TYPE_COLORS[repository.type] ?? ""}`}>
            {TYPE_LABEL[repository.type] ?? repository.type}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
        {repository.description}
      </p>

      {/* Tags */}
      {repository.tags && repository.tags.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tags</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {repository.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Implementations */}
      {repository.implementations && repository.implementations.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Code2 className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Implementations</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {repository.implementations.map((impl, idx) => (
              <span key={idx}>
                {impl.url ? (
                  <a
                    href={impl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-caisi-cyan/15 hover:bg-caisi-cyan/25 text-caisi-cyan-shade dark:text-cyan-300 text-xs font-medium px-3 py-1.5 rounded-lg transition-all hover:scale-105 border border-caisi-cyan/30"
                  >
                    {impl.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="inline-block bg-caisi-cyan/10 text-caisi-cyan-shade dark:text-cyan-300 text-xs font-medium px-3 py-1.5 rounded-lg border border-caisi-cyan/20">
                    {impl.name}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Datasets */}
      {repository.public_datasets && repository.public_datasets.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Datasets</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {repository.public_datasets.map((dataset, idx) => (
              <span key={idx}>
                {dataset.url ? (
                  <a
                    href={dataset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-caisi-purple/8 hover:bg-caisi-purple/15 text-caisi-purple dark:text-violet-400 text-xs font-medium px-3 py-1.5 rounded-lg transition-all hover:scale-105 border border-caisi-purple/20"
                  >
                    {dataset.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="inline-block bg-caisi-purple/8 text-caisi-purple dark:text-violet-400 text-xs font-medium px-3 py-1.5 rounded-lg border border-caisi-purple/20">
                    {dataset.name}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      {(repository.paper_url || repository.bibtex) && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
          {repository.paper_url && (
            <a
              href={repository.paper_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg transition-all hover:scale-105"
            >
              <FileText className="w-4 h-4" />
              Paper
            </a>
          )}
          {repository.bibtex && (
            <button
              onClick={handleCiteCopy}
              className="inline-flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg transition-all hover:scale-105"
              title={copied ? "Copied!" : "Copy citation to clipboard"}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <BookOpen className="w-4 h-4" />}
              {copied ? "Copied!" : "Cite"}
            </button>
          )}
        </div>
      )}
    </motion.article>
  );
}
