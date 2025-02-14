import { headers } from 'next/headers';
import React from 'react'

import ProductCategories from "@/components/product-categories";
import { Slider } from '@/components/products-slider';
import ProductCard from '@/components/product-card';
import Image from 'next/image';
import { Product } from '@/lib/types';
import queryString from 'query-string';

type Props = {
    searchParams?: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: Props) => {
    const headerList = headers();
    const business = (await headerList).get('business');
    const resolvedSearchParams = await searchParams;

    const products: Product[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${business}/inventory/all?${queryString.stringify({ category: resolvedSearchParams?.category })}`).then(resp => resp.json()).then(data => data.data).catch(error => console.log(error))

    return (
        <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-2.5">
            {products?.map((product, i) =>
                <ProductCard {...{ product }} key={i} />
            )}
        </div>
    )
}

export default Home