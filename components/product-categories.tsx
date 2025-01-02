import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

type Props = {}

const ProductCategories = (props: Props) => {
    const categories: { previewImage: string, name: string }[] = [
        {
            name: 'category 1',
            previewImage: 'https://primecart.s3.us-east-2.amazonaws.com/categories/Rectangle 109.png-1734110797092.png'
        },
        {
            name: 'category 2',
            previewImage: 'https://primecart.s3.us-east-2.amazonaws.com/categories/Rectangle 109.png-1734110797092.png'
        },
        {
            name: 'category 3',
            previewImage: 'https://primecart.s3.us-east-2.amazonaws.com/categories/Rectangle 109.png-1734110797092.png'
        },
        {
            name: 'category 4',
            previewImage: 'https://primecart.s3.us-east-2.amazonaws.com/categories/Rectangle 109.png-1734110797092.png'
        }
    ]

    return (
        <div className={clsx('grid grid-cols-2 md:grid-cols-3', 'gap-2.5 w-full')}>
            {categories.map(({ previewImage, name }, index) =>
                <div key={index} className={clsx({ 'md:hidden': index > 2 }, "aspect-square relative")}>
                    <Image
                        className="rounded-md"
                        src={previewImage}
                        alt={`category ${name}`}
                        fill
                        priority
                        sizes="(max-width: 1200px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute rounded-md bottom-0 left-0 right-0 bg-gradient-to-t from-dark to-transparent p-2 5">
                        <h1 className="text-xl font-medium text-white capitalize">{name}</h1>
                    </div>
                </div>

            )}
        </div>
    )
}

export default ProductCategories 