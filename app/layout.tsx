import { Inter, Rubik } from "next/font/google";
import { headers } from 'next/headers';
import type { Metadata } from "next";

import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { MapProvider } from "@/providers/map";
import { Toaster } from "@/components/ui/toaster";
import { ShoppingCartProvider } from "@/context/shopping-cart-context";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})



export const metadata: Metadata = {
  title: "PrimeCart",
  description:
    "PrimeCart is an e-commerce platform with a mission to empower SMEs in Africa and developing countries to establish and grow their online presence with minimal barriers. It offers an affordable, user-friendly solution with local currency support, a drag-and-drop store builder, and robust e-commerce tools.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const headersList = headers();
  const business = (await headersList).get('business')

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${rubik.variable} antialiased bg-white text-dark transition-colors duration-200`}
      >

        <ShoppingCartProvider>
          <TooltipProvider>
            {/* navigation */}
            <Navigation />

            <MapProvider>
              {children}
            </MapProvider>

            <Toaster />

            {/* footer */}
            <Footer />
          </TooltipProvider>
        </ShoppingCartProvider>
      </body>
    </html>
  );
}
