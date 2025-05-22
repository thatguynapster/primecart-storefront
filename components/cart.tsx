'use client'

import { ChevronRight, ShoppingBag } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

import { useShoppingCart } from '@/context/shopping-cart-context'
import { ScrollArea } from './ui/scroll-area'
import { formatNumber } from '@/lib/utils'
import { SheetClose } from './ui/sheet'
import { Button } from './ui/button'
import CartItem from './cart-item'
import { routes } from '@/routes'
import clsx from 'clsx'

const Cart = () => {
    const page = usePathname()
    const { cartItems, clearCart } = useShoppingCart();

    return (
        <div className="w-full max-w-lg flex flex-col gap-6 items-center">
            <div className="w-full flex justify-between gap-4">
                <p className="text-sm">{`${cartItems.length} item${(cartItems.length == 0 || cartItems.length > 1) ? 's' : ''}`}</p>

                {!page.includes('checkout') && <p className="text-sm cursor-pointer" onClick={clearCart}>Clear</p>}
            </div>


            {cartItems.length > 0 ?
                <>
                    <ScrollArea className={clsx("flex w-full", { "h-[calc(100dvh-9.75rem)]": !page.includes('checkout') })}>
                        <div className="flex flex-col divide-y divide-light transition-all duration-300">
                            {/* {cart.slice(0, cartLength).map((item, idx) => */}
                            {cartItems.map((item, idx) =>
                                <CartItem data={item} key={idx} />
                            )}
                        </div>
                    </ScrollArea>

                    <div className="w-full flex items-center justify-between gap-8">

                        {page.includes('checkout') && <h1 className="hidden lg:block text-3xl">
                            Total
                        </h1>}

                        <h1 className="text-2xl font-semibold">
                            {formatNumber(cartItems.reduce((curr, acc) => (acc.price * acc.quantity) + curr, 0), 'currency', 'GHS', 'narrowSymbol')}
                        </h1>

                        {!page.includes('checkout') &&
                            <SheetClose asChild>
                                <Link href={routes.checkout}>
                                    <Button
                                        variant={'default'}
                                        className='w-max text-sm active:outline-0'
                                    >
                                        Checkout <ChevronRight size={16} />
                                    </Button>
                                </Link>
                            </SheetClose>
                        }
                    </div>
                </> :
                <div className="text-center py-12">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                    <p className="text-muted-foreground mb-6">
                        Looks like you haven't added any products to your cart yet.
                    </p>
                    {/* {!page.includes('checkout') &&
                        <SheetClose asChild>
                            <Button asChild className="button-cta">
                                <Link href={routes.products.all}>Start Shopping</Link>
                            </Button>
                        </SheetClose>
                    } */}
                </div>
            }
        </div >
    )

}

export default Cart