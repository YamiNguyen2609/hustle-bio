import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { DataProvider } from "@/context/DataContext";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SheetCraft",
  description: "Google Sheet templates for smarter workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${syne.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f9f5e8] font-[var(--font-dm-sans)] text-[#0d0d0d]">
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
