import { Inter, Roboto } from "next/font/google";
import { headers } from 'next/headers';
import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import Navigation from "@/components/navigation";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  weight: ["100", "300", "400", "500", "700", "900"],
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
        className={`${inter.variable} ${roboto.variable} antialiased bg-white text-dark transition-colors duration-200`}
      >
        {/* navigation */}
        <Navigation />

        {children}

        {/* footer */}
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </body>
    </html>
  );
}
