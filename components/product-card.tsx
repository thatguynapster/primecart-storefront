import { ShoppingBag } from 'lucide-react'
import React from 'react'
import { Badge } from './ui/badge'
import Image from 'next/image'
import { parseCurrency } from '@/lib/utils'

type Props = {}

const ProductCard = (props: Props) => {
    return (

        <div className='flex flex-col gap-2 border border-gray rounded-lg p-2.5 group'>
            <div className="flex justify-between items-center group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                <div></div>
                <ShoppingBag />
            </div>

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
                    <p className="font-semibold text-center text-sm">{parseCurrency(1234.5)}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard