import type { Metadata } from "next";
import { Geist_Sans } from "next/font/google";
import "./globals.css";
import { WindowsProvider } from "@/context/WindowsContext";

const geistSans = Geist_Sans({
  variable: "--font-geist-sans",
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
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <WindowsProvider>
          {children}
        </WindowsProvider>
      </body>
    </html>
  );
}
