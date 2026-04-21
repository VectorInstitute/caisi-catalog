"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();

  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH === "true"
      ? "/caisi-catalog"
      : "";

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path || pathname === basePath;
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href={`${basePath}/`}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src={getAssetPath("caisi-logo.svg")}
              alt="CAISI Research Program"
              width={180}
              height={36}
              className="h-9 w-auto"
            />
            <span className="hidden md:inline text-base font-semibold text-gray-800 border-l border-gray-200 pl-3 ml-1">
              Research Catalog
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Link
              href={`${basePath}/`}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive("/")
                  ? "bg-caisi-purple text-white shadow-sm"
                  : "text-gray-700 hover:bg-caisi-purple/10 hover:text-caisi-purple"
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
