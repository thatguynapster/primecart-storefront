"use server";

import queryString from "query-string";
import { Customer, Location, OrderProduct } from "./types";
import { method } from "lodash";

export const getBusiness = async ({
	domain,
	subdomain,
}: {
	domain?: string;
	subdomain?: string;
}) => {
	try {
		let business = await (
			await fetch(
				`${
					process.env["NEXT_PUBLIC_API_URL"]
				}/api/business/?${queryString.stringify(
					{ domain, subdomain },
					{ skipNull: true }
				)}`
			)
		)
			.json()
			.then((resp) => resp)
			.catch((error) => {
				throw error;
			});

		return business;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to get business details", { cause: error });
	}
};

type OrderDetails = {
	business_id: string;
	customer: Pick<Customer, "email" | "name" | "phone">;
	location: Location;
	products: Pick<
		OrderProduct,
		"product_id" | "product_variation_id" | "quantity"
	>[];
};

export const createOrder = async (data: OrderDetails) => {
	let order = await (
		await fetch(`${process.env["NEXT_PUBLIC_API_URL"]}/api/orders/`, {
			method: "POST",
			body: JSON.stringify(data),
		})
	)
		.json()
		.then((resp) => resp)
		.catch((error) => {
			throw error;
		});

	return order;
};
