import React from "react";

import { Skeleton } from "@/components/ui/skeleton"


const Loading = () => {
    return (
        <main className="flex flex-col lg:flex-row justify-items-center min-h-screen w-full max-w-3xl lg:max-w-7xl mx-auto gap-8 row-start-2 items-center sm:items-start px-2.5">
            <div className="hidden lg:flex flex-col gap-4 w-full max-w-72">
                {Array.from({ length: 10 }, (_, j) => (
                    <Skeleton key={j} className="w-full h-8 rounded-xl" />
                ))}
            </div>

            <div className="w-full mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 15 }, (_, j) => (
                    <Skeleton key={j} className="aspect-video rounded-xl" />
                ))}
            </div>
        </main>
    );
};

export default Loading;
