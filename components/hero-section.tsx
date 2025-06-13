import { routes } from '@/routes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Button } from './ui/button'
import { ExperimentalFeatures, StorefrontFeatures } from '@/lib/types'
import { headers } from 'next/headers'

const HeroSection = async () => {

    const headerList = headers()
    const business = (await headerList).get('business')

    const experimentalFeatures: ExperimentalFeatures = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${business}/experimental_features`)
        .then(resp => resp.json())
        .then(data => data.data)
        .catch(error => console.log(error))

    return (
        <section className="relative w-full">
            {/* Hero image */}
            <div className="relative h-[calc(100dvh-104px)] w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 z-10" />
                <div className="relative w-full h-full">
                    <Image
                        src={experimentalFeatures?.heroSection.backgroundImage ?? '/placeholder.svg'}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        fill
                    />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-center z-20 px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            {experimentalFeatures?.heroSection.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-8 line-clamp-2">
                            {experimentalFeatures?.heroSection.subText}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {experimentalFeatures?.heroSection.cta.text &&
                                <Link href={experimentalFeatures?.heroSection.cta.link ?? routes.products.all}>
                                    <Button variant={'default'} size="lg" className="button-cta min-w-[160px]">
                                        {experimentalFeatures?.heroSection.cta.text}
                                    </Button>
                                </Link>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection