import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PromoBar } from "@/components/layout/PromoBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Driftwear Studio — Soft Everyday Clothing for Warm Days",
    template: "%s | Driftwear Studio",
  },
  description:
    "Driftwear Studio makes easy, relaxed clothing for people who like comfort but still want to look put together. Soft fabrics, warm tones, zero fuss.",
  keywords: [
    "Driftwear",
    "Studio",
    "clothing",
    "linen",
    "cotton",
    "resort wear",
    "summer",
    "casual",
    "India",
  ],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Driftwear Studio",
    description: "Soft everyday clothing for warm days.",
    type: "website",
    siteName: "Driftwear Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Driftwear Studio",
    description: "Soft everyday clothing for warm days.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${instrumentSerif.variable} ${inter.variable} antialiased font-[family-name:var(--font-inter)] bg-offwhite text-deep-ink`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <div className="min-h-screen flex flex-col">
          <PromoBar />
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}