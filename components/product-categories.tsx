
import queryString from "query-string";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

import { categories } from "@/dummyData";
import { routes } from '@/routes';

type Props = {}

const ProductCategories = (props: Props) => {

    return (
        <div className={clsx('grid grid-cols-2 md:grid-cols-3', 'gap-2.5 w-full')}>
            {categories.map(({ previewImage, name }, index) =>
                <Link
                    key={index}
                    className={clsx({ 'md:hidden': index > 2 }, "aspect-square 2xl:aspect-auto 2xl:h-[29.375rem] relative cursor-pointer")}
                    href={`${routes.products.all}?${queryString.stringify({ category: name })}`}
                >
                    <Image
                        className="rounded-md object-cover"
                        src={previewImage}
                        alt={`category ${name}`}
                        fill
                        priority
                        sizes="(max-width: 1200px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute rounded-md bottom-0 left-0 right-0 bg-gradient-to-t from-dark to-transparent p-2 5">
                        <h1 className="text-xl font-medium text-white capitalize">{name}</h1>
                    </div>
                </Link>

            )}
        </div>
    )
}

export default ProductCategories 