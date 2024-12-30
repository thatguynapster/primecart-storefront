import { Menu, ShoppingBag } from "lucide-react";
import Image from "next/image";
import React from "react";
import clsx from "clsx";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Label } from "@headlessui/react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type Props = {};

const navigation = [
  { name: "Features", href: "#features", current: false },
  { name: "Pricing", href: "#pricing", current: false },
  { name: "About Us", href: "#about-us", current: false },
];

const Navigation = async ({ }: Props) => {

  return (
    <div className="min-h-full sticky top-0 z-10 glass">
      <div className="mx-auto max-w-3xl lg:max-w-7xl flex flex-col">
        <div className="flex items-center justify-center py-2.5">
          <p className="text-dark-muted text-sm font-semibold uppercase">best price guarantee</p>
        </div>

        <div className="relative flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <div className="lg:hidden px-4 py-2">
                <Menu strokeWidth={1.5} />
              </div>
            </SheetTrigger>

            <SheetContent side="left">
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              <div className="mt-3 space-y-1 px-2">
                {/* load navigation data from business' main categories */}
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
          </Sheet>

          <div className="relative w-24 h-16">
            <Image
              src={'/img/logo.png'}
              alt={"Business Name Logo"}
              priority
              fill
              sizes="(max-width: 1200px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="dark:hidden object-contain mx-auto"
            />
          </div>

          <div className="px-4 py-2">
            <Popover>
              <PopoverTrigger asChild>
                <ShoppingBag strokeWidth={1.5} />
              </PopoverTrigger>

              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">
                      Set the dimensions for the layer.
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navigation;
