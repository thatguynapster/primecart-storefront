'use client'

import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { useShoppingCart } from '@/context/shopping-cart-context'
import { formatNumber } from '@/lib/utils'
import { ICart } from '@/lib/types'
import { Button } from './ui/button'

type Props = { data: ICart }

const CartItem = ({ data }: Props) => {
    const { removeFromCart, updateQuantity } = useShoppingCart();


    const handleRemoveFromCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        removeFromCart(data.id)

    };


    return (
        <div className="flex items-center p-4 gap-6 group">
            <div className="w-[110px] h-[110px] relative">
                <Image
                    src={'https://primecart.s3.us-east-2.amazonaws.com/categories/Rectangle 109.png-1734110797092.png'}
                    alt={"Product Image"}
                    priority
                    fill
                    sizes="(max-width: 1200px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-contain"
                />
            </div>

            <div className="flex flex-col gap-4 w-full">
                <div className="flex gap-2 items-center justify-between cursor-pointer" onClick={handleRemoveFromCart}>
                    <p className="font-medium">{data.name}</p>
                    <Trash2 className='text-error lg:opacity-0 group-hover:opacity-100 duration-300' size={16} />
                </div>

                <div className="flex gap-2">
                    {Object.entries(data.variant).map(([key, value], idx) => (
                        <div key={idx}>
                            <p className="text-xs font-inter text-dark-muted capitalize">{key}</p>
                            <p className="font-semibold text-sm capitalize">{value}</p>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 items-center">
                    <Button
                        variant='ghost'
                        className='px-1'
                        disabled={data.quantity <= 1}
                        onClick={() => {
                            updateQuantity(data.id, --data.quantity)
                        }}
                    >
                        <Minus size='16' />
                    </Button>

                    <p className="font-semibold">{data.quantity}</p>

                    <Button
                        variant='ghost'
                        className='px-1'
                        disabled={data.available_quantity <= data.quantity}
                        onClick={() => {
                            updateQuantity(data.id, ++data.quantity)
                        }}
                    >
                        <Plus size='16' />
                    </Button>
                </div>

                <p className="font-semibold text-xl">{formatNumber(data.price * data.quantity, 'currency',
                    'GHS', 'narrowSymbol')}</p>
            </div>


        </div>
    )
}

export default CartItem