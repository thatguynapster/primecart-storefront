'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Slider } from "@/components/ui/slider"
import clsx from 'clsx'
import { constructQuery, formatNumber } from '@/lib/utils'
import { Input } from './ui/input'

type Props = {
    defaultValue: number[]
    max: number,
    min?: number,
    name: string
}

const RangeSlider = ({ defaultValue, max, min = 0, name }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams?.toString() || '');

    const [maxValue, setMaxValue] = useState(params.get('max') ? Number(params.get('max')) : defaultValue[1]);
    const [minValue, setMinValue] = useState(params.get('min') ? Number(params.get('min')) : defaultValue[0]);


    // // Function to update URL parameters
    // const add2URL = (updates: Record<string, string>) => {
    //     Object.entries(updates).forEach(([key, value]) => {
    //         params.set(key, value);
    //     });
    //     router.push(`?${params.toString()}`);
    // };

    return (
        <div className="flex flex-col gap-4">
            <p className='capitalize'>{name}</p>

            <Slider
                {...{ defaultValue, max, min }}
                value={[minValue, maxValue]}
                step={10}
                className={clsx("w-full")}
                onValueChange={([min, max]) => {
                    setMinValue(min);
                    setMaxValue(max);
                }}
                onValueCommit={([min, max]) => {
                    router.push(constructQuery({ min: min.toString(), max: max.toString() }, params));
                }}
            />

            <div className="flex w-full justify-between items-center gap-4">
                <div className="flex justify-between items-center w-full border border-muted px-1 rounded-lg gap-2">

                    <p className="text-muted">₵</p>
                    {/* <span>{formatNumber(minValue)}</span> */}
                    <Input
                        className='border-none text-right px-0'
                        type="number"
                        placeholder="123.45"
                        min={minValue}
                        max={maxValue}
                        value={minValue}
                        onChange={(ev) => {
                            console.log(ev.currentTarget.value)
                            setMinValue(Number(ev.currentTarget.value));
                        }}
                    />
                </div>

                <hr className='w-6 h-1 text-dark' />

                <div className="flex justify-between items-center w-full border border-muted px-1 rounded-lg gap-2">
                    <p className="text-muted">₵</p>
                    <Input
                        className='border-none text-right px-0'
                        type="number"
                        placeholder="123.45"
                        min={minValue}
                        max={maxValue}
                        value={maxValue}
                        onChange={(ev) => {
                            setMaxValue(Number(ev.currentTarget.value));
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default RangeSlider