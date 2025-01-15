import React from 'react'

import { ImagePreviewSlider } from '@/components/image-preview-slider'
import ProductVariants from '@/components/product-variants'
import { attributes, productImages } from '@/dummyData'
import { Button } from '@/components/ui/button'
import { formatNumber } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type Props = { params: Promise<{ product_id: string }> };

const ProductDetailsPage = async ({ params }: Props) => {
    const { product_id } = await params

    return (
        <div className="flex flex-col gap-8 px-4">
            <ImagePreviewSlider images={productImages} alt={product_id} />

            <div className="flex flex-col gap-5">
                <h1 className="text-3xl truncate w-full">Nike Milu Deer Sneakers</h1>
                <h2 className="text-2xl font-semibold">{formatNumber(1234.5, 'currency',
                    'GHS', 'narrowSymbol')}</h2>

                <ProductVariants {...{ attributes }} />

                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Product Description</AccordionTrigger>
                        <AccordionContent className='text-sm text-dark-muted'>
                            If you found this model in stock somewhere at a lower price, send us a link to this model in another store. We will be happy to offer you a discount that compensates for the difference in cost and a better price compared to competitors. Please note that the promotion applies only to Russian platforms.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="flex gap-4">
                    <Button className='w-full text-sm'>Quick Purchase</Button>
                    <Button className='w-full text-sm' variant={'outline'}>Add to Cart</Button>
                </div>
            </div>
        </div >
    )
}

export default ProductDetailsPage
