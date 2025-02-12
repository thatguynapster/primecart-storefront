"use client";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import type SwiperType from "swiper";
import Image from "next/image";

// swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import clsx from "clsx";

export const ImagePreviewSlider = ({
    images,
    alt,
}: {
    images: string[];
    alt: string;
}) => {
    const [previewSwiper, setPreviewSwiper] = useState<null | SwiperType>(null);
    const [swiper, setSwiper] = useState<null | SwiperType>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        previewSwiper?.on("slideChange", ({ realIndex }) => {
            setActiveIndex(realIndex);
        });
    }, [previewSwiper, images]);

    return (
        <div className="w-full flex flex-col gap-4">
            <Swiper
                className="w-full max-w-96 h-max"
                onSwiper={setPreviewSwiper}
                spaceBetween={16}
                navigation
                thumbs={{ swiper }}
                modules={[FreeMode, Thumbs]}
            >
                {images.map((data: any, index: number) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full aspect-square">
                            <Image
                                src={data}
                                alt={`${alt} Image`}
                                fill
                                priority
                                className="object-cover border border-neutral-30 rounded-2xl"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                className="w-full max-w-96 h-max"
                onSwiper={setSwiper}
                spaceBetween={10}
                slidesPerView={4.7}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
            >
                {images.map((data: any, index: number) => (
                    <SwiperSlide key={index}>
                        <div className={clsx("relative w-full aspect-square rounded-2xl", { "border border-neutral-30": activeIndex === index })}>
                            <Image
                                src={data}
                                alt={`${alt} Image`}
                                fill
                                priority
                                className="object-contain rounded-2xl"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
