export type ICart = {
	id: string;
	name: string;
	quantity: number;
	available_quantity: number;
	price: number;
	image: string;
	variant: Record<string, string>;
	variation_id: string;
};

export interface StoreInterface {
	cart?: ICart[];
	instant_buy?: ICart;
	unavailable_products?: string[];
	missing_products?: string[];
}

export type Product = {
	description: string;
	id: string;
	name: string;
	images: string[];
	variations: {
		id: string;
		attributes: Record<string, string>;
		quantity: number;
		price: number;
	}[];
};

export type Category = {
	id: string;
	name: string;
	previewImage: string;
};

export type Customer = {
	name: string;
	id: string;
	email: string;
	phone: string;
	business_id: string;
	createdAt: Date;
	updatedAt: Date;
	location: {
		address: string;
		country: string;
		country_code: string;
		city: string;
		longitude: number;
		latitude: number;
		region: string;
	};
};

export type Location = {
	address: string;
	country: string;
	country_code: string;
	city: string;
	longitude: number;
	latitude: number;
	region: string;
};

export type OrderProduct = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	quantity: number;
	amount: number;
	product_id: string;
	product_variation_id: string;
	order_id: string;
};
