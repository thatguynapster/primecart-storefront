import Cart from '@/components/cart'
import CheckoutForm from '@/components/checkout-form'
import React from 'react'

type Props = {}

const CheckoutPage = ({ }: Props) => {
    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-16 px-4">
            <Cart />

            <CheckoutForm />
        </div>
    )
}

export default CheckoutPage