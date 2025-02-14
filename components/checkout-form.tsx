'use client'

import { isValidPhoneNumber } from "react-phone-number-input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React from 'react'
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from './ui/phone-input'
import { Place } from "./place";

type Props = {}

const CheckoutForm = (props: Props) => {

    const formSchema = z.object({
        name: z.string({ message: 'Provide a name' }),
        email: z.string({ required_error: 'Provide an email' }).email({ message: 'Invalid email' }),
        phoneNumber: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
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
        resolver: zodResolver(formSchema)
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
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
                                {/* <FormMessage /> */}
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
                                {/* <FormMessage /> */}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex gap-4 items-center justify-between'>
                                    <FormLabel className='w-2/5'>Phone Number</FormLabel>
                                    <FormControl>
                                        {/* <Input placeholder="shadcn" {...field} /> */}
                                        <PhoneInput defaultCountry="GH" placeholder="020 123 4567" className="w-full" {...field} />
                                    </FormControl>
                                </div>
                                {/* <FormMessage /> */}
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
                                        {/* <Input placeholder="Eg: Accra, Ghana"  {...field} value={field.value.address} /> */}
                                        <Place {...field} value={field.value} />
                                    </FormControl>
                                </div>
                                {/* <FormMessage /> */}
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className='w-full lg:w-max px-8 text-sm'
                            onClick={() => { }}
                        >
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CheckoutForm