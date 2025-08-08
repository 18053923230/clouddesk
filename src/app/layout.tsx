import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WindowsProvider } from "@/context/WindowsContext";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CloudDesk",
  description: "A web-based desktop environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <WindowsProvider>
          {children}
        </WindowsProvider>
      </body>
    </html>
  );
}
