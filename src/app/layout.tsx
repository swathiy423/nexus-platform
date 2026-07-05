import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Toaster } from "sonner";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: { default: "Nexus — Your AI Operations Console", template: "%s · Nexus" },
  description:
    "Nexus is an AI-native operations console: real-time dashboards, RAG-powered assistants, and role-based team management in one place.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Nexus — Your AI Operations Console",
    description: "Real-time dashboards, AI agents, and team management in one console.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-signal-violet focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>
        <Providers>
          <CustomCursor />
          <CommandPalette />
          <Toaster theme="dark" position="top-right" richColors />
          <main id="main-content">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
