import Image from 'next/image'
import React from 'react'

type Props = {}

const DiscountBanner = (props: Props) => {
    return (
        <div className="flex flex-col gap-2 5 py-8 px-6 rounded-xl relative w-full max-w-2xl mx-auto h-44">
            <Image
                src={'https://primecart.s3.us-east-2.amazonaws.com/categories/Rectangle 109.png-1734110797092.png'}
                alt={"Business Name Logo"}
                priority
                fill
                sizes="(max-width: 1200px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="z-[-1] object-cover mx-auto rounded-xl"
            />

            <h1 className="text-2xl font-medium text-white font-rubik">
                7% Discount
            </h1>
            <p className="text-lg text-white leading-6">Get 7% off your first purchase when you sign up for our exclusive promotions, updates and news</p>
        </div>
    )
}

export default DiscountBanner