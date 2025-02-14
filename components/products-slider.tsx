"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { ReactNode, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid } from "swiper/modules";
import type SwiperType from "swiper";
import clsx from "clsx";


import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { useWidth } from "@/hooks/useWidth";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Slider = ({
    children,
    loading,
    error,
    options = { showButtons: true, offset: 0 },
}: {
    children: ReactNode[];
    loading: boolean;
    error: any;
    options?: Partial<{ showButtons: boolean; offset: number; modules: string[], rows: number }>;
}) => {
    const width = useWidth();

    const base = (width as number) < 640;
    const sm = (width as number) < 768;
    const md = (width as number) < 1024;
    const lg = (width as number) < 1280;
    const xl = (width as number) < 1536;

    const svp = base ? 2 : sm ? 2 : md ? 4 : lg ? 4 : xl ? 4 : 4;

    const [swiper, setSwiper] = useState<null | SwiperType>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [slideConfig, setSlideConfig] = useState({
        isBeginning: true,
        isEnd: activeIndex === (children?.length ?? 0) - svp,
    });

    let modules = [Pagination];
    if (sm) modules.push(Grid);

    useEffect(() => {
        swiper?.on("slideChange", ({ activeIndex }: { activeIndex: number }) => {
            setActiveIndex(activeIndex);
            setSlideConfig({
                isBeginning: activeIndex === 0,
                isEnd: activeIndex === (modules.includes(Grid) ? Math.ceil(children.length / 4) ?? 0 : (children?.length ?? 0) - svp),
            });
        });
    }, [swiper, children]);

    const activeStyles =
        "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-10 place-items-center rounded-full text-white bg-dark-muted";

    const inactiveStyles = "hidden";


    return (
        <div className={clsx("relative")}>
            {error && <></>}

            {loading && (
                <div className="flex gap-4">
                    {Array.from({ length: svp }, (_, j) => (
                        <div
                            key={j}
                            className={clsx(
                                "flex flex-col gap-2",
                                "bg-neutral-20",
                                "animate-pulse",
                                "w-full h-[100px]",
                                "rounded-2xl"
                            )}
                        ></div>
                    ))}
                </div>
            )}

            {options.showButtons && (
                <div className="absolute inset-0">
                    <Button
                        className={clsx(
                            activeStyles,
                            "right-0 md:-right-4 transition",
                            { 'hidden': children.length < svp },
                            {
                                // [inactiveStyles]: slideConfig.isEnd || children?.length <= svp,
                                [inactiveStyles]: slideConfig.isEnd,
                                "hover:bg-gray hover:text-neutral-10 text-neutral-50 opacity-100":
                                    !slideConfig.isEnd,
                            },
                            "!p-0"
                        )}
                        aria-label="next category"
                        onClick={(ev) => {
                            ev.preventDefault();
                            swiper?.slideNext();
                        }}
                    >
                        <ChevronRight />
                    </Button>

                    <Button
                        className={clsx(
                            activeStyles,
                            "left-0 md:-left-4 transition",
                            {
                                [inactiveStyles]: slideConfig.isBeginning,
                                "hover:bg-gray hover:text-neutral-10 text-neutral-50 opacity-100":
                                    !slideConfig.isBeginning,
                            },
                            "!p-0"
                        )}
                        aria-label="previous category"
                        onClick={(ev) => {
                            ev.preventDefault();
                            swiper?.slidePrev();
                        }}
                    >
                        <ChevronLeft />
                    </Button>
                </div>
            )}

            <Swiper
                className="w-full h-full"
                spaceBetween={16}
                slidesPerView={svp + (options.offset ?? 0)}
                onSwiper={(swiper) => setSwiper(swiper)}
                modules={modules}
                grid={modules.includes(Grid) ? { rows: 2, fill: 'row' } : {}}
            >
                {children?.map((slide: any, index: number) => (
                    <SwiperSlide className="relative w-full h-full" key={index}>
                        {slide}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
