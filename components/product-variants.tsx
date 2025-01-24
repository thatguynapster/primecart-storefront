'use client'

import { Radio, RadioGroup } from '@headlessui/react'
import React, { useState } from 'react'
import clsx from 'clsx';
import { CircleX } from 'lucide-react';

type Props = { attributes: Record<string, string>[] }

const ProductVariants = ({ attributes }: Props) => {

    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

    // Get unique options for a given key
    const getOptions = (key: string) => {
        const availability = attributes.reduce<Record<string, boolean>>((acc, attr) => {
            // Check if the attribute combination is valid based on selected attributes
            const isValid = Object.entries(selectedAttributes).every(([k, v]) =>
                k === key || attr[k] === v
            );
            acc[attr[key]] = acc[attr[key]] || isValid;
            return acc;
        }, {});

        return Array.from(new Set(attributes.map((attr) => attr[key]))).map((option) => ({
            value: option,
            available: availability[option],
        }));
    }

    return (
        // {/* Display attribute selectors */}
        <>
            {Object.keys(attributes[0]).map((key) => (
                <div key={key} className="flex flex-col gap-2 capitalize">
                    <p className='font-semibold'>{key}</p>
                    <RadioGroup
                        value={selectedAttributes[key] || ''}
                        onChange={(value) => setSelectedAttributes((prev) => ({
                            ...prev,
                            [key]: value,
                        }))}
                        className="flex flex-wrap gap-2 w-max">
                        {getOptions(key).map(({ value, available }) => (
                            <Radio
                                key={value}
                                value={value}
                                disabled={!available}
                                className={clsx(
                                    available
                                        ? 'cursor-pointer focus:outline-none bg-white'
                                        : 'cursor-not-allowed opacity-65 bg-dark-muted',
                                    'flex items-center justify-center rounded-xl p-4 text-sm font-semibold uppercase border border-dark-muted hover:bg-gray-50 data-[checked]:bg-dark data-[checked]:text-white sm:flex-1 [&:not([data-focus])]:[&:not([data-checked])]:ring-inset whitespace-nowrap w-max',
                                )}
                            >
                                {value}
                            </Radio>
                        ))}
                    </RadioGroup>


                </div>
            ))}

            {Object.keys(selectedAttributes).length > 0 &&
                <div className="-mt-2 flex gap-2 items-center text-error cursor-pointer" onClick={() => setSelectedAttributes({})}>
                    <CircleX size={20} />
                    <p className="font-semibold">Clear Selection</p>
                </div>
            }
        </>
    )
}

export default ProductVariants