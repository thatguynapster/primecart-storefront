export type ICart = {
  id: string;
  name: string;
  quantity: number;
  available_quantity: number;
  price: number;
  image: string;
  variant: Record<string, string>;
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
