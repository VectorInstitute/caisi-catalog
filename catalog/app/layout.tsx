import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH === 'true' ? '/caisi-catalog' : '';

export const metadata: Metadata = {
  title: "CAISI Research Catalog",
  description: "A curated collection of AI safety research implementations and tools developed under the Canadian AI Safety Institute Research Program",
  keywords: ["AI Safety", "Machine Learning", "CAISI", "CIFAR", "Research", "Implementation", "Deep Learning", "Canada"],
  authors: [{ name: "CAISI Research Program" }],
  openGraph: {
    title: "CAISI Research Catalog",
    description: "A curated collection of AI safety research implementations and tools",
    type: "website",
  },
  icons: {
    icon: `${basePath}/caisi-logo.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src={`${basePath}/_pagefind/pagefind-ui.js`} defer />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
