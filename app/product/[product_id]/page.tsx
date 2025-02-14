import { headers } from 'next/headers';
import Link from 'next/link'
import React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ImagePreviewSlider } from '@/components/image-preview-slider'
import ProductVariants from '@/components/product-variants'
import { Button } from '@/components/ui/button'
import { formatNumber } from '@/lib/utils'
import { Product } from '@/lib/types';
import { routes } from '@/routes'

type Props = { params: Promise<{ product_id: string }> };

const ProductDetailsPage = async ({ params }: Props) => {
    const { product_id } = await params

    const headerList = headers()
    const business = (await headerList).get('business')

    const product: Product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${business}/inventory/${product_id}`).then(resp => resp.json()).then(data => data.data).catch(error => console.log(error))
    console.log(product)

    const attributes = product?.variations.map(variation => variation.attributes)

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 px-4">

            <ImagePreviewSlider images={product?.images} alt={`${product.name} image`} />

            <div className="w-full max-w-[493px] flex flex-col gap-5">
                <h1 className="text-3xl truncate w-full">{product.name}</h1>
                <h2 className="text-2xl font-semibold">
                    {formatNumber(product.variations[0].price, 'currency', 'GHS', 'narrowSymbol')}
                </h2>

                <ProductVariants {...{ attributes }} />

                <div className="flex gap-4">
                    <Link className='w-full lg:max-w-max' href={routes.checkout}>
                        <Button className='w-full text-sm'>Quick Purchase</Button>
                    </Link>
                    <Button className='w-full lg:w-max text-sm' variant={'outline'}>Add to Cart</Button>
                </div>

                <Accordion type="single" collapsible defaultValue='item-1'>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Product Description</AccordionTrigger>
                        <AccordionContent className='text-sm text-dark-muted'>
                            {product.description}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

export default ProductDetailsPage
