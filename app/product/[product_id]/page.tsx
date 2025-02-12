import React from 'react'

import { ImagePreviewSlider } from '@/components/image-preview-slider'
import ProductVariants from '@/components/product-variants'
import { attributes, productImages } from '@/dummyData'
import { Button } from '@/components/ui/button'
import { formatNumber } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import { routes } from '@/routes'

type Props = { params: Promise<{ product_id: string }> };

const ProductDetailsPage = async ({ params }: Props) => {
    const { product_id } = await params

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 px-4">

            <ImagePreviewSlider images={productImages} alt={product_id} />

            <div className="w-full max-w-[493px] flex flex-col gap-5">
                <h1 className="text-3xl truncate w-full">Nike Milu Deer Sneakers</h1>
                <h2 className="text-2xl font-semibold">{formatNumber(1234.5, 'currency',
                    'GHS', 'narrowSymbol')}</h2>

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
                            If you found this model in stock somewhere at a lower price, send us a link to this model in another store. We will be happy to offer you a discount that compensates for the difference in cost and a better price compared to competitors. Please note that the promotion applies only to Russian platforms.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

export default ProductDetailsPage
