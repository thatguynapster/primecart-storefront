'use client'

import { ShoppingBag, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { formatNumber } from '@/lib/utils'
import { routes } from '@/routes'

type Props = {
    product: { id: string }
}

const ProductCard = ({ product }: Props) => {
    return (
        <Link href={`${routes.products.details.replace(':product_id', product.id)}`} className='flex flex-col gap-2 border border-gray rounded-lg p-2.5 group relative cursor-pointer'>
            <div className="flex flex-col gap-2">
                <div className="relative w-full h-28">
                    <Image
                        src={'https://primecart.s3.us-east-2.amazonaws.com/categories/Rectangle 109.png-1734110797092.png'}
                        alt={"Business Name Logo"}
                        priority
                        fill
                        sizes="(max-width: 1200px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-contain mx-auto"
                    />
                </div>
                <div className="flex flex-col gap-2.5">
                    <p className="text-center text-sm line-clamp-2">Product Name</p>
                    <p className="font-semibold text-center text-sm">{formatNumber(1234.5, 'currency',
                        'GHS', 'narrowSymbol')}</p>
                </div>
            </div>

            <div className="absolute right-0 bottom-0 p-2 group-hover:opacity-100 opacity-0 duration-300">
                <div className="flex flex-col items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger className='bg-dark text-white p-2 rounded-full' onClick={(ev => {
                            ev.preventDefault();
                            ev.stopPropagation()
                        })}>
                            <ShoppingCart size={16} />
                        </TooltipTrigger>
                        <TooltipContent className='z-50'>
                            <p>Buy Now</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger className='p-2 rounded-full' onClick={(ev => {
                            ev.preventDefault();
                            ev.stopPropagation()
                        })}>
                            <ShoppingBag size={16} />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add to cart</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard