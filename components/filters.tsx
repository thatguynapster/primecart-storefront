'use client'

import { useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'

import { constructQuery } from '@/lib/utils'
import { categories } from '@/dummyData'
import RangeSlider from './range-slider'
import { Category } from '@/lib/types'
import { routes } from '@/routes'

type Props = {
    categories: Category[]
}

const Filters = ({ categories }: Props) => {
    const category = useSearchParams().get('category');

    return (
        // TODO: hide the filters on small screens
        <div className="flex flex-col gap-9 w-full max-w-72">
            <div className="flex flex-col gap-5">
                <h1 className="font-rubik text-2xl font-semibold">Categories</h1>

                {categories.map(({ id, name }, index) =>
                    <Link
                        key={index}
                        className={clsx({ 'font-bold': id === category },
                            "text-xl capitalize")}
                        href={`${routes.products.all}?${queryString.stringify({ category: id })}`}

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