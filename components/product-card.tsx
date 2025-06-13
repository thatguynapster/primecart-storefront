'use client'

import { ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { useShoppingCart } from '@/context/shopping-cart-context'
import { Product, StoreInterface } from '@/lib/types'
import useLocalStorage from '@/hooks/useLocalStorage'
import { formatNumber } from '@/lib/utils'
import { routes } from '@/routes'

type Props = {
    product: Product
}

const ProductCard = ({ product }: Props) => {
    const { addToCart } = useShoppingCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart({
            id: product.id,
            name: product.name,
            price: product.variations[0].price,
            image: product.images[0],
            available_quantity: product.variations[0].quantity || 10,
            variant: product.variations[0].attributes,
            variation_id: product.variations[0].id
        });
    };

    return (
        <Link href={`${routes.products.details.replace(':product_id', product.id)}`} className='flex flex-col gap-2 border border-gray rounded-lg p-2.5 group relative cursor-pointer'>
            <div className="flex flex-col gap-2">
                <div className="relative w-full h-28">
                    <Image
                        src={product.images[0]}
                        alt={`${product.name} image`}
                        priority
                        fill
                        sizes="(max-width: 1200px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-contain mx-auto"
                    />
                </div>
                <div className="flex flex-col gap-2.5">
                    <p className="text-center text-sm line-clamp-2">{product.name}</p>
                    <p className="font-semibold text-center text-sm">
                        {formatNumber(product.variations[0].price, 'currency', 'GHS', 'narrowSymbol')}
                    </p>
                </div>
            </div>

            <div className="absolute right-0 bottom-0 p-2 group-hover:opacity-100 opacity-0 duration-300">
                <div className="flex flex-col items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className='p-2 rounded-full' onClick={handleAddToCart}>
                                <ShoppingBag size={16} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add to cart</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard