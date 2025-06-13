'use client'

import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import queryString from 'query-string'
import Link from 'next/link'
import clsx from 'clsx'

import RangeSlider from './range-slider'
import { Category } from '@/lib/types'
import { Button } from './ui/button'
import { routes } from '@/routes'

type Props = {
    categories: Category[]
}

const Filters = ({ categories }: Props) => {
    const category = useSearchParams().get('category');
    const catLen = 5

    const [categoryLength, setCategoryLength] = useState(catLen)

    return (
        // TODO: hide the filters on small screens
        <div className="flex flex-1 flex-col gap-9 w-full max-w-72">
            <div className="flex flex-col gap-5 w-full">
                <h1 className="font-rubik text-2xl font-semibold">Categories</h1>

                {categories.slice(0, categoryLength).map(({ id, name }, index) =>
                    <Link
                        key={index}
                        className={clsx({ 'font-bold': id === category },
                            "text-xl capitalize w-full")}
                        href={`${routes.products.all}?${queryString.stringify({ category: id })}`}

                    >
                        {name}
                    </Link>
                )
                }

                <Button
                    variant={'outline'}
                    className='w-max px-16 text-sm'
                    onClick={() => setCategoryLength((prev) => (prev === catLen ? category?.length ?? 0 : catLen))}
                >
                    Show {`${categoryLength > catLen ? 'Less' : 'More'}`}
                </Button>

            </div>

            <div className="flex flex-col gap-5">
                <h1 className="font-rubik text-2xl font-semibold">Filters</h1>

                <RangeSlider defaultValue={[1500, 6800]} max={7500} name='Price' />
            </div>
        </div>
    )
}

export default Filters