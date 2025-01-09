import React from 'react'

import ProductCategories from "@/components/product-categories";
import { Slider } from '@/components/products-slider';
import ProductCard from '@/components/product-card';

type Props = {}

const Home = async ({ }: Props) => {

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
          {Array.from({ length: 10 }, (_, i) =>
            <ProductCard product={{ id: 'some_product_id' }} key={i} />
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
          {Array.from({ length: 10 }, (_, i) =>
            <ProductCard product={{ id: 'some_product_id' }} key={i} />
          )}
        </Slider>
      </div>

      {/* <DiscountBanner /> */}
    </main>
  )
}

export default Home