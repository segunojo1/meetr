import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meetr",
  description: "Meet wit AI agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NuqsAdapter>
      <TRPCReactProvider>
        <NextTopLoader />
        <html lang="en" className={`${inter.className} h-full antialiased`}>
          <body className="min-h-full flex flex-col">
            {/* <DashboardNavbar /> */}
            <Toaster />
            {children}
          </body>
        </html>
      </TRPCReactProvider>
    </NuqsAdapter>
  );
}
