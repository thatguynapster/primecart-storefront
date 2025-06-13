import { SlidersHorizontal } from 'lucide-react';
import { headers } from 'next/headers';
import queryString from 'query-string';
import React from 'react'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import ProductCard from '@/components/product-card';
import { Category, Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Filters from '@/components/filters';
import Footer from '@/components/footer';

type Props = {
    searchParams?: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: Props) => {
    const headerList = headers();
    const business = (await headerList).get('business');
    const resolvedSearchParams = await searchParams;

    const categories: Category[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${business}/inventory/categories`)
        .then(resp => resp.json())
        .then(data => data.data)
        .catch(error => console.log(error))

    const products: Product[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${business}/inventory/all?${queryString.stringify({ category: resolvedSearchParams?.category })}`).then(resp => resp.json()).then(data => data.data).catch(error => console.log(error))


    return (
        <div className='flex flex-col gap-12'>
            <main className="flex flex-col lg:flex-row justify-items-center min-h-screen w-full max-w-3xl lg:max-w-7xl mx-auto gap-8 row-start-2 items-center sm:items-start px-2.5">
                <div className="hidden lg:flex">
                    <Filters {...{ categories }} />
                </div>
                <div className="flex flex-1 lg:hidden w-full px-4 justify-end">
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
                <div className="flex-1 w-full mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
                    {products?.map((product, i) =>
                        <ProductCard {...{ product }} key={i} />
                    )}
                </div>
            </main>
            {/* footer */}
            <Footer />
        </div>
    )
}

export default Home