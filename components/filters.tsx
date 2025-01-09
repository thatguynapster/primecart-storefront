'use client'

import queryString from 'query-string'
import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'

import { categories } from '@/dummyData'
import { routes } from '@/routes'
import { useSearchParams } from 'next/navigation'
import RangeSlider from './range-slider'
import { constructQuery } from '@/lib/utils'

type Props = {}

const Filters = (props: Props) => {
    const category = useSearchParams().get('category');

    return (
        // TODO: hide the filters on small screens
        <div className="flex flex-col gap-9 w-full max-w-72">
            <div className="flex flex-col gap-5">
                <h1 className="font-rubik text-2xl font-semibold">Categories</h1>

                {categories.map(({ name }, index) =>
                    <Link
                        key={index}
                        className={clsx({ 'font-bold': name === category },
                            "text-xl capitalize")}
                        href={`${routes.products.all}?${queryString.stringify({ category: name })}`}

                    >
                        {name}
                    </Link>
                )
                }
            </div>

            <div className="flex flex-col gap-5">
                <h1 className="font-rubik text-2xl font-semibold">Filters</h1>

                <RangeSlider defaultValue={[1500, 6800]} max={7500} name='Price' />
            </div>
        </div>
    )
}

export default Filters