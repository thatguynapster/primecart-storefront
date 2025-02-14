export type ICart = {
  _id: string;
  name: string;
  quantity: number;
  available_quantity: number;
  price: number;
  image: string;
  variant: Record<string, string>;
};

export type Product = {
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
