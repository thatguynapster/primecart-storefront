'use client'

import { Menu, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import clsx from "clsx";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useShoppingCart } from "@/context/shopping-cart-context";
import { routes } from "@/routes";
import { ScrollArea } from "./ui/scroll-area";
import Cart from "./cart";

const navigation = [
  { name: "Features", href: "#features", current: false },
  { name: "Pricing", href: "#pricing", current: false },
  { name: "About Us", href: "#about-us", current: false },
];

const Navigation = () => {
  const { cartItems } = useShoppingCart();

  return (
    <div className="min-h-full sticky top-0 z-50 bg-white/50 glass">
      <div className="mx-auto max-w-3xl lg:max-w-7xl flex flex-col">
        <div className="flex items-center justify-center py-2.5">
          <p className="text-dark-muted text-sm font-semibold uppercase">best price guarantee</p>
        </div>

        <div className="relative flex items-center justify-between px-4">
          {/* <Sheet>
            <SheetTrigger asChild>
              <div className="lg:hidden px-4 py-2 cursor-pointer">
                <Menu strokeWidth={1.5} />
              </div>
            </SheetTrigger>

            <SheetContent side="left">
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              <div className="mt-3 space-y-1 px-2">
                {navigation.map(({ href, name }, i) => (
                  <Link
                    key={name}
                    className={clsx(
                      "block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                    )}
                    {...{ href }}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet> */}

          <Link href={routes.home} className="relative w-24 h-16">
            <Image
              src={'/img/logo.png'}
              alt={"Business Name Logo"}
              priority
              fill
              sizes="(max-width: 1200px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="dark:hidden object-contain mx-auto"
            />
          </Link>

          <div className="px- py-2">
            <Sheet>
              <SheetTrigger asChild>
                <div className="cursor-pointer p-2 relative">
                  <ShoppingBag strokeWidth={1.5} />

                  <div className={clsx("absolute w-4 h-4 p-2.5 rounded-full bg-dark text-white top-0 right-0 flex justify-center items-center",
                    // { 'hidden': !cartItems.length }
                  )}>
                    <p className="text-xs">{cartItems?.length}</p>
                  </div>

                </div>

              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="hidden">Cart</SheetTitle>
                  <SheetDescription />
                </SheetHeader>

                <Cart />

              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navigation;
