import { headers } from 'next/headers';
import React from 'react'

import ProductCategories from "@/components/product-categories";
import { Slider } from '@/components/products-slider';
import ProductCard from '@/components/product-card';
import { Product } from '@/lib/types';

type Props = {}



const Home = async ({ }: Props) => {
  const headerList = headers()
  const business = (await headerList).get('business')

  const most_popular: Product[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${business}/inventory/most_popular`).then(resp => resp.json()).then(data => data.data).catch(error => console.log(error))

  const recent_products: Product[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${business}/inventory/recent_products`).then(resp => resp.json()).then(data => data.data).catch(error => console.log(error))

  return (
    <main className="flex flex-col justify-items-center min-h-screen w-full max-w-6xl mx-auto gap-8 row-start-2 items-center sm:items-start px-2.5">
      <ProductCategories />

      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl font-medium font-rubik">Most Popular Now</h1>
        <Slider
          loading={false}
          error={false}
          options={{ showButtons: true, rows: 2 }}
        >
          {most_popular.map((product, i) =>
            <ProductCard {...{ product }} key={i} />
          )}
        </Slider>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl font-medium font-rubik">New Items</h1>
        <Slider
          loading={false}
          error={false}
          options={{ showButtons: true, rows: 2 }}
        >
          {recent_products.map((product, i) =>
            <ProductCard {...{ product }} key={i} />
          )}
        </Slider>
      </div>

      {/* <DiscountBanner /> */}
    </main>
  )
}

export default Home