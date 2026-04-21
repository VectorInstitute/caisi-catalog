"use client";

import { useEffect } from "react";

interface PagefindUIOptions {
  element: HTMLElement;
  showSubResults: boolean;
  showImages: boolean;
  excerptLength: number;
  placeholder: string;
  basePath?: string;
}

declare global {
  interface Window {
    PagefindUI?: new (options: PagefindUIOptions) => void;
  }
}

export default function SearchBar() {
  useEffect(() => {
    const heroSearchContainer = document.getElementById("hero-search");

    const currentPath = window.location.pathname;
    const basePath = currentPath.startsWith('/caisi-catalog') ? '/caisi-catalog' : '';

    if (typeof window !== "undefined" && heroSearchContainer) {
      const loadPagefindCSS = () => {
        if (!document.querySelector('link[href*="pagefind-ui.css"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = `${basePath}/_pagefind/pagefind-ui.css`;
          document.head.appendChild(link);
        }
      };

      const checkPagefind = setInterval(() => {
        if (window.PagefindUI) {
          clearInterval(checkPagefind);
          loadPagefindCSS();
          const config: PagefindUIOptions = {
            element: heroSearchContainer,
            showSubResults: true,
            showImages: false,
            excerptLength: 15,
            placeholder: "Search research...",
          };

          config.basePath = basePath ? `${basePath}/_pagefind/` : '/_pagefind/';

          new window.PagefindUI(config);
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkPagefind);
        if (!window.PagefindUI && heroSearchContainer && heroSearchContainer.children.length === 0) {
          heroSearchContainer.innerHTML = `
            <div class="relative">
              <input
                type="text"
                placeholder="Search research... (build required)"
                disabled
                class="w-full px-12 py-4 rounded-2xl border-2 border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
          `;
        }
      }, 5000);

      return () => clearInterval(checkPagefind);
    }
  }, []);

  return null;
}
