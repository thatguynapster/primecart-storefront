import { Category, StorefrontFeatures } from "@/lib/types";
import { routes } from "@/routes";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import queryString from "query-string";
import React from "react";

const Footer = async () => {

  const headerList = headers()
  const business = (await headerList).get('business')

  const categories: Category[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${business}/inventory/categories`)
    .then(resp => resp.json())
    .then(data => data.data)
    .catch(error => console.log(error))

  const storefrontFeatures: StorefrontFeatures = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${business}/storefront_features`)
    .then(resp => resp.json())
    .then(data => data.data)
    .catch(error => console.log(error))

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

        {/* <p className="text-dark-muted">Your supplier to the world of limited editions with worldwide delivery</p> */}
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="font-rubik text-xl text-dark font-medium">Catalog</h1>

        <div className="flex flex-col gap-2.5">
          {categories.slice(0, 5).map(({ id, name }) =>
            <Link key={id}
              href={`${routes.products.all}?${queryString.stringify({ category: id })}`}
              className="text-dark">
              {name}
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="font-rubik text-xl text-dark font-medium">Support</h1>

        <div className="flex flex-col gap-2.5">
          {!!storefrontFeatures?.support.deliveryPolicy &&
            <Link href="/support/delivery_policy" className="text-dark">
              Delivery
            </Link>
          }
          {!!storefrontFeatures?.support.paymentPolicy &&
            <Link href="/support/payment_policy" className="text-dark">
              Payment
            </Link>
          }
          {!!storefrontFeatures?.support.faq &&
            <Link href="/support/faq" className="text-dark">
              FAQs
            </Link>
          }
          {/* <Link href="#" className="text-dark">
            Track Your Order
          </Link> */}
        </div>
      </div>

      <div className="flex flex-col gap-6">

        <div className="flex flex-col gap-2.5">
          {!!storefrontFeatures?.contact.email &&
            <Link href={`mailto:${storefrontFeatures.contact.email}`} className="text-dark-muted">
              {storefrontFeatures.contact.email}
            </Link>
          }
          {!!storefrontFeatures?.contact.phone &&
            <Link href={`tel:${storefrontFeatures.contact.phone}`} className="text-dark-muted">
              {storefrontFeatures.contact.phone}
            </Link>
          }
          {!!storefrontFeatures?.support.privacyPolicy &&
            <Link href="/support/privacy_policy" className="text-dark-muted">
              Privacy Policy
            </Link>
          }
          {!!storefrontFeatures?.support.UserAgreement &&
            <Link href="/support/user_agreement" className="text-dark-muted">
              User Agreement
            </Link>
          }
        </div>
      </div>
    </footer>
  );
};

export default Footer;
