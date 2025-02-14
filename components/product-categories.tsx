
import queryString from "query-string";
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

import { categories } from "@/dummyData";
import { routes } from '@/routes';

type Props = {}

type Category = {
    id: string
    name: string
    previewImage: string
}

const ProductCategories = async (props: Props) => {
    const headerList = headers()
    const business = (await headerList).get('business')

    const categories: Category[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${business}/inventory/categories`)
        .then(resp => resp.json())
        .then(data => data.data)
        .catch(error => console.log(error))

    let columns: any[] = [];
    if (categories) columns = getColumns(categories);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 w-full">
            {columns.map((column: Category[], colIdx) => (
                <div key={colIdx} className={clsx("flex flex-col gap-2.5", 'h-[25.375rem] lg:', { 'hidden lg:inline-flex': colIdx > 1 })}>
                    {column.map(({ id, name, previewImage }) => {
                        // Determine height based on the number of items in this column
                        const heightClass =
                            column.length === 1 ? "h-full"
                                : column.length === 2 ? "h-1/2"
                                    : "h-1/3";

                        return (
                            <Link
                                key={id}
                                className={clsx("relative cursor-pointer", heightClass)}
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
                                <div className="absolute rounded-md bottom-0 left-0 right-0 bg-gradient-to-t from-dark to-transparent p-2.5">
                                    <h1 className="text-xl font-medium text-white capitalize">{name}</h1>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )
            )}
        </div>
    )
}

const getColumns = (categories: Category[]) => {
    const columns: Category[][] = [[], [], []];
    let colIndex = 0;

    categories.forEach((category: Category) => {
        columns[colIndex].push(category);
        colIndex = (colIndex + 1) % 3;
    });

    return columns;
};

export default ProductCategories 