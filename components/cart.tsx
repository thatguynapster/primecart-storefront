'use client'

import { cart } from '@/dummyData'
import { formatNumber } from '@/lib/utils'
import { Trash, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { Button } from './ui/button'
import clsx from 'clsx'
import CartItem from './cart-item'

type Props = {}

const Cart = (props: Props) => {
    const [cartLength, setCartLength] = useState(3)

    return (
        <div className="w-full max-w-lg flex flex-col gap-6 items-center">
            <div className="w-full flex justify-between gap-4">
                <p className="text-sm">{`${cart.length} item${(cart.length == 0 || cart.length > 1) ? 's' : ''}`}</p>
                <p className="text-sm">Clear</p>
            </div>

            <div className="flex flex-col divide-y divide-light w-full transition-all duration-300">
                {cart.slice(0, cartLength).map((item, idx) =>
                    <CartItem data={item} />
                )}
            </div>

            <Button
                variant={'outline'}
                className='w-max px-16 text-sm'
                onClick={(ev) => setCartLength((prev) => (prev === 3 ? 10 : 3))}
            >
                Show {`${cartLength > 3 ? 'Less' : 'All'}`}
            </Button>

            <div className="w-full flex items-center justify-between gap-8">
                <h1 className="hidden lg:block text-3xl">
                    Total
                </h1>

                <h1 className="text-3xl font-semibold">
                    {formatNumber(cart.reduce((curr, acc) => acc.price + curr, 0), 'currency', 'GHS', 'narrowSymbol')}
                </h1>
            </div>
        </div >
    )
}

export default Cart