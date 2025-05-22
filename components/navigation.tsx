'use client'

import { ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useShoppingCart } from "@/context/shopping-cart-context";
import useStore from "@/hooks/useStore";
import { routes } from "@/routes";
import Cart from "./cart";

const navigation = [
  { name: "Features", href: "#features", current: false },
  { name: "Pricing", href: "#pricing", current: false },
  { name: "About Us", href: "#about-us", current: false },
];

const Navigation = ({ business }: { business: string }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const { cartItems } = useShoppingCart();
  const { setStore } = useStore()

  useEffect(() => {
    setHasMounted(true);

    return () => { setHasMounted(false) }
  }, []);

  useEffect(() => {
    console.log('business - client:', business)
    setStore({
      business
    })
  }, [business])

  return (
    <div className="min-h-full sticky top-0 z-50 bg-white/50 glass">
      <div className="mx-auto max-w-3xl lg:max-w-7xl flex flex-col">
        <div className="flex items-center justify-center py-2.5">
          <p className="text-dark-muted text-sm font-semibold uppercase">best price guarantee</p>
        </div>

        <div className="relative flex items-center justify-between px-4">

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

                  {hasMounted &&
                    <div className={clsx("absolute w-4 h-4 p-2.5 rounded-full bg-dark text-white top-0 right-0 flex justify-center items-center",
                      { 'hidden': !cartItems.length }
                    )}>
                      <p className="text-xs">{cartItems?.length}</p>
                    </div>
                  }

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
