'use client'

import { isValidPhoneNumber } from "react-phone-number-input";
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useShoppingCart } from "@/context/shopping-cart-context"
import { useModal } from "@/providers/modal-provider";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from './ui/phone-input'
import { createOrder } from "@/lib/queries"
import useStore from "@/hooks/useStore"
import Spinner from "./ui/spinner"
import { Place } from "./place"
import CustomModal from "./modal";
import Link from "next/link";

type Props = {}

const CheckoutForm = (props: Props) => {
    const { store } = useStore()
    const { cartItems, clearCart } = useShoppingCart();
    const { setOpen, setClose } = useModal()

    const formSchema = z.object({
        name: z.string({ message: 'Provide a name' }),
        email: z.string({ required_error: 'Provide an email' }).email({ message: 'Invalid email' }),
        phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
        location: z.object({
            address: z.string({ message: 'Provide an address' }),
            country: z.string({}),
            country_code: z.string({ message: 'Provide an address' }),
            city: z.string({ message: 'Provide an address' }),
            region: z.string({ message: 'Provide an address' }),
            longitude: z.number({ message: 'Provide an address' }),
            latitude: z.number({ message: 'Provide an address' }),
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            location: {
                address: "",
                country: "",
                country_code: "",
                city: "",
                region: "",
                longitude: 0,
                latitude: 0,
            }
        },
        mode: 'onChange'
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const order = await createOrder({
            business_id: store.business ?? '',
            customer: {
                email: values.email,
                name: values.name,
                phone: values.phone
            },
            location: { ...values.location },
            products: cartItems.map((item) => {
                return {
                    product_id: item.id,
                    product_variation_id: item.variation_id,
                    quantity: item.quantity
                }
            }),
        })

        form.reset()
        setOpen(
            <CustomModal
                title="Order created"
            >
                <p className="font-semibold text-center">Continue to payment</p>

                <Button className="w-max mx-auto" onClick={() => {
                    window.open(order.sale.payment.checkout_url, '_blank')
                    setClose()
                }}>
                    Pay Now
                </Button>
            </CustomModal>
        )
        clearCart()
    }

    return (
        <div className="w-full flex flex-col gap-12">
            <h1 className="text-3xl font-medium">Checkout</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex gap-4 items-center justify-between'>
                                    <FormLabel className='w-2/5'>Username</FormLabel>
                                    <FormControl>
                                        <div className="w-full flex flex-col">
                                            <Input placeholder="Eg: John Doe" {...field} />
                                        </div>
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex gap-4 items-center justify-between'>
                                    <FormLabel className='w-2/5'>E-mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Eg: me@johndoe.com" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex gap-4 items-center justify-between'>
                                    <FormLabel className='w-2/5'>Phone Number</FormLabel>
                                    <FormControl>
                                        <PhoneInput defaultCountry="GH" placeholder="020 123 4567" className="w-full" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex gap-4 items-center justify-between'>
                                    <FormLabel className='w-2/5'>Location</FormLabel>
                                    <FormControl>
                                        <Place
                                            {...field}
                                            value={field.value}
                                            setFieldValue={(_: string, value: z.infer<typeof formSchema>['location']) => {
                                                form.setValue('location', value, { shouldValidate: true })
                                            }}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end">
                        <Button
                            disabled={!form.formState.isValid || form.formState.isSubmitting}
                            type="submit"
                            // onClick={() => {
                            //     setOpen(
                            //         <CustomModal
                            //             title="Redirecting to payment"
                            //         >
                            //             <p className="font-semibold text-center">Redirecting to payment page...</p>
                            //         </CustomModal>)
                            // }}
                            className='w-full lg:w-max px-8 text-sm'
                        >
                            {form.formState.isSubmitting ? <Spinner /> : 'Continue'}

                        </Button>
                    </div>
                </form>
            </Form>

        </div>
    )
}

export default CheckoutForm