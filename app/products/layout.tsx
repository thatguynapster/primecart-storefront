
import { headers } from 'next/headers';
import type { Metadata } from "next";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Filters from "@/components/filters";
import { Category } from '@/lib/types';

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
    const headerList = headers()
    const business = (await headerList).get('business')

    const categories: Category[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${business}/inventory/categories`)
        .then(resp => resp.json())
        .then(data => data.data)
        .catch(error => console.log(error))

    return (
        <main className="flex flex-col lg:flex-row justify-items-center min-h-screen w-full max-w-3xl lg:max-w-7xl mx-auto gap-8 row-start-2 items-center sm:items-start px-2.5">
            <div className="hidden lg:flex">
                <Filters {...{ categories }} />
            </div>

            <div className="flex lg:hidden w-full px-4 justify-end">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="border-none bg-light px-4 py-2.5 rounded-full font-normal">Filters <SlidersHorizontal size={16} /></Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className="sr-only">Products Filters</SheetTitle>
                            <SheetDescription />
                        </SheetHeader>
                        <Filters {...{ categories }} />
                    </SheetContent>
                </Sheet>
            </div>
            {children}
        </main >
    );
}
