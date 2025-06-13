import React from 'react'

import Cart from '@/components/cart'
import CheckoutForm from '@/components/checkout-form'
import Footer from '@/components/footer'

type Props = {}

const CheckoutPage = ({ }: Props) => {
    return (
        <div className='flex flex-col gap-12'>
            <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-16 px-4 mb-12">
                <Cart />

                <CheckoutForm />
            </div>
            {/* footer */}
            <Footer />
        </div>
    )
}

export default CheckoutPage