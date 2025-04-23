import { Category } from "@/lib/types";
import clsx from "clsx";
import { headers } from 'next/headers';
import Link from "next/link";



type DesktopLayoutConfig = {
    [key in number]: { gridStart: string[], aspect: string[] };
};


const desktopLayoutConfig: DesktopLayoutConfig = {
    1: {
        gridStart: [
            'md:row-span-3 md:col-span-3',
        ], aspect: ['md:aspect-[2.568]']
    },
    2: {
        gridStart: [
            'md:row-span-3 md:col-start-1',
            'md:row-span-3 md:col-start-2 md:col-span-2',
        ], aspect: ['md:aspect-[0.83]', 'md:aspect-[1.699]']
    },
    3: {
        gridStart: [
            'md:row-span-3 md:col-start-1',
            'md:row-span-3 md:col-start-2',
            'md:row-span-3 md:col-start-3',
        ], aspect: ['md:aspect-[0.83]', 'md:aspect-[0.83]', 'md:aspect-[0.83]']
    },
    4: {
        gridStart: [
            'md:row-span-3 md:col-start-1',
            'md:row-span-3 md:col-start-2',
            'md:col-start-3 md:row-start-1',
            'md:row-span-2 md:col-start-3 md:row-start-2',
        ], aspect: ['md:aspect-[0.83]', 'md:aspect-[0.83]', 'md:aspect-[2.697]', 'md:aspect-[1.27]']
    },
    5: {
        gridStart: [
            'md:row-span-3 md:col-start-1',
            'md:col-start-2 md:row-start-1',
            'md:row-span-2 md:col-start-2 md:row-start-2',
            'md:row-span-2 md:col-start-3 md:row-start-1',
            'md:col-start-3 md:row-start-3',
        ], aspect: ['md:aspect-[0.83]', 'md:aspect-[2.697]', 'md:aspect-[1.27]', 'md:aspect-[1.27]', 'md:aspect-[2.697]']
    },
    6: {
        gridStart: [
            'md:col-start-1 md:row-start-1',
            'md:row-span-2 md:col-start-1 md:row-start-2',
            'md:row-span-2 md:col-start-2 md:row-start-1',
            'md:col-start-2 md:row-start-3',
            'md:col-start-3 md:row-start-1',
            'md:row-span-2 md:col-start-3 md:row-start-2',
        ], aspect: ['md:aspect-[2.697]', 'md:aspect-[1.27]', 'md:aspect-[1.27]', 'md:aspect-[2.697]', 'md:aspect-[2.697]', 'md:aspect-[1.27]']
    },
    7: {
        gridStart: [
            'md:col-start-1 md:row-start-1',
            'md:row-span-2 md:col-start-1 md:row-start-2',
            'md:row-span-2 md:col-start-2 md:row-start-1',
            'md:col-start-2 md:row-start-3',
            'md:col-start-3 md:row-start-1',
            'md:col-start-3 md:row-start-2',
            'md:col-start-3 md:row-start-3',
        ], aspect: ['md:aspect-[2.697]', 'md:aspect-[1.27]', 'md:aspect-[1.27]', 'md:aspect-[2.697]', 'md:aspect-[2.697]', 'md:aspect-[2.697]', 'md:aspect-[2.697]',]
    },
    8: {
        gridStart: [
            'md:col-start-1 md:row-start-1',
            'md:row-span-2 md:col-start-1 md:row-start-2',
            'md:col-start-2 md:row-start-1',
            'md:col-start-2 md:row-start-2',
            'md:col-start-2 md:row-start-3',
            'md:col-start-3 md:row-start-1',
            'md:col-start-3 md:row-start-2',
            'md:col-start-3 md:row-start-3',
        ], aspect: ['md:aspect-[2.697]', 'md:aspect-[1.27]', 'md:aspect-[2.697]', 'md:aspect-[2.697]', 'md:aspect-[2.697]', 'md:aspect-[2.697]', 'md:aspect-[2.697]', 'md:aspect-[2.697]']
    },
    9: {
        gridStart: [
            'md:col-start-1 md:row-start-1',
            'md:col-start-1 md:row-start-2',
            'md:col-start-1 md:row-start-3',
            'md:col-start-2 md:row-start-1',
            'md:col-start-2 md:row-start-2',
            'md:col-start-2 md:row-start-3',
            'md:col-start-3 md:row-start-1',
            'md:col-start-3 md:row-start-2',
            'md:col-start-3 md:row-start-3',
        ], aspect: ['md:aspect-[2.697]', 'md:aspect-[2.697]', 'md:aspect-[2.697]', 'md:aspect-[2.697]', 'md:aspect-[2.697]', 'md:aspect-[2.697]', 'md:aspect-[2.697]', 'md:aspect-[2.697]', 'md:aspect-[2.697]']
    },
};

const FeaturedCategories = async () => {
    const headerList = headers()
    const business = (await headerList).get('business')

    const categories: Category[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${business}/inventory/categories`)
        .then(resp => resp.json())
        .then(data => data.data)
        .catch(error => console.log(error))
    const layoutConfig = desktopLayoutConfig[categories.length as (3 | 4 | 5 | 6 | 7 | 8 | 9)];

    return (
        <section className="py-12 md:py-16 bg-brand-gray-50 w-full">
            <div className="container px-4 md:px-6">

                <div className="grid grid-cols-2 grid-rows-2 grid-flow-col gap-4 md:grid-cols-3 md:grid-rows-3">
                    {categories.map((category, index) => {
                        const gridClasses = layoutConfig?.gridStart[index] || '';
                        const aspectClass = layoutConfig?.aspect[index] || '';
                        const mobileVisibility = index >= 4 ? 'hidden md:block' : '';

                        return <div
                            key={index}
                            className={clsx(gridClasses, mobileVisibility)}
                        >
                            <Link
                                key={category.id}
                                href={`/products?category=${encodeURIComponent(category.id)}`}
                                className="group block"
                            >
                                <div className={clsx("relative overflow-hidden rounded-lg aspect-square", aspectClass)}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                                    <img
                                        src={category.previewImage}
                                        alt={category.name}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-6 z-20">
                                        <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                                        <div className="font-medium text-white inline-flex items-center">
                                            Shop Now
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    })}
                </div>
            </div>
        </section >
    );
};

export default FeaturedCategories;
