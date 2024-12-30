import { Inter, Rubik } from "next/font/google";
import { headers } from 'next/headers';
import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

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
  console.log('business id:', business)

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${rubik.variable} antialiased bg-white text-dark transition-colors duration-200 flex flex-col gap-6`}
      >
        {/* navigation */}
        <Navigation />

        {children}

        {/* footer */}
        <Footer />
      </body>
    </html>
  );
}
