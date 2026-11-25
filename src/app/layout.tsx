import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "FitLedger — Train with intention", description: "A practical fitness, nutrition and budget companion.", applicationName: "FitLedger", appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "FitLedger" } };
export const viewport: Viewport = { themeColor: "#111310", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }