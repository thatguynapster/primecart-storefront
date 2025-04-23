import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { routes } from '@/routes'
import Image from 'next/image'

type Props = {}

const HeroSection = (props: Props) => {
    return (
        <section className="relative w-full">
            {/* Hero image */}
            <div className="relative h-[calc(100dvh-104px)] w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 z-10" />
                {/* <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="LUXE Summer Collection"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                /> */}
                <div className="relative w-full h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3"
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        fill
                    />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-center z-20 px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            Summer Collection 2025
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-8">
                            Embrace the season with our latest styles crafted for modern elegance.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                            <Link href={routes.products.all}>
                                <Button variant={'default'} size="lg" className="button-cta min-w-[160px]">
                                    Shop Now
                                </Button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection