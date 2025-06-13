import React from "react";

import { Skeleton } from "@/components/ui/skeleton"

type Props = {};

const Loading = (props: Props) => {
    return (
        <>
            <section className="py-12 md:py-16 w-full">
                <div className="container px-4 md:px-6">

                    <div className="grid grid-cols-3 gap-4">
                        <Skeleton className="aspect-[0.83] rounded-xl" />
                        <Skeleton className="aspect-[0.83] rounded-xl" />
                        <Skeleton className="aspect-[0.83] rounded-xl" />
                    </div>
                </div>
            </section>

            <div className="flex flex-col gap-4 w-full px-4 md:px-6 py-12 md:py-16 ">
                <Skeleton className="w-80 h-10" />

                <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: 4 }, (_, j) => (
                        <Skeleton key={j} className="aspect-video rounded-xl" />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full px-4 md:px-6 py-12 md:py-16 ">
                <Skeleton className="w-80 h-10" />

                <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: 4 }, (_, j) => (
                        <Skeleton key={j} className="aspect-video rounded-xl" />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Loading;
