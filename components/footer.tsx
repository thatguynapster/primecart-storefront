import { routes } from "@/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="mx-auto w-full max-w-3xl lg:max-w-7xl flex flex-col lg:flex-row justify-between gap-6 px-4 py-8 lg:text-sm">
      <div className="flex flex-col gap-6">
        <Link href={routes.home} className="relative w-32 h-24">
          <Image
            src={'/img/logo.png'}
            alt={"Business Name Logo"}
            priority
            fill
            sizes="(max-width: 1200px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="dark:hidden object-contain mx-auto"
          />
        </Link>

        <p className="text-dark-muted">Your supplier to the world of limited editions with worldwide delivery</p>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="font-rubik text-xl text-dark font-medium">Catalog</h1>

        <div className="flex flex-col gap-2.5">
          <Link href="#" className="text-dark">
            Clothes
          </Link>
          <Link href="#" className="text-dark">
            Shoes
          </Link>
          <Link href="#" className="text-dark">
            Accessories
          </Link>
          <Link href="#" className="text-dark">
            Bags
          </Link>
          <Link href="#" className="text-dark">
            Sports Goods
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="font-rubik text-xl text-dark font-medium">Menu</h1>

        <div className="flex flex-col gap-2.5">
          <Link href="#" className="text-dark">
            About Us
          </Link>
          <Link href="#" className="text-dark">
            Products
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="font-rubik text-xl text-dark font-medium">Support</h1>

        <div className="flex flex-col gap-2.5">
          <Link href="#" className="text-dark">
            Delivery
          </Link>
          <Link href="#" className="text-dark">
            Payment
          </Link>
          <Link href="#" className="text-dark">
            FAQs
          </Link>
          <Link href="#" className="text-dark">
            Customer Service
          </Link>
          <Link href="#" className="text-dark">
            Track Your Order
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-6">

        <div className="flex flex-col gap-2.5">
          <Link href="#" className="text-dark-muted">
            help@dealerclub.com
          </Link>
          <Link href="#" className="text-dark-muted">
            info@dealerclub.com
          </Link>
          <Link href="#" className="text-dark-muted">
            +7 (929) 555-00-04
          </Link>
          <Link href="#" className="text-dark-muted">
            Privacy Policy
          </Link>
          <Link href="#" className="text-dark-muted">
            User Agreement
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
