import React from 'react'

import ProductCategories from "@/components/product-categories";
import { Slider } from '@/components/products-slider';
import ProductCard from '@/components/product-card';
import Image from 'next/image';

type Props = {}

const Home = async ({ }: Props) => {

    return (
        <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-2.5">
            {Array.from({ length: 10 }, (_, i) =>
                <ProductCard product={{ id: 'some_product_id' }} key={i} />
            )}
        </div>
    )
}

export default Home