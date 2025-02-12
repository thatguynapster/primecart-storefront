import { ICart } from "./lib/types";

export const categories: { previewImage: string; name: string }[] = [
  {
    name: "category 1",
    previewImage:
      "https://primecart.s3.us-east-2.amazonaws.com/categories/Rectangle 109.png-1734110797092.png",
  },
  {
    name: "category 2",
    previewImage:
      "https://primecart.s3.us-east-2.amazonaws.com/categories/Rectangle 109.png-1734110797092.png",
  },
  {
    name: "category 3",
    previewImage:
      "https://primecart-dev.thatguynapster.com/_next/image?url=https%3A%2F%2Fprimecart.s3.us-east-2.amazonaws.com%2Fproducts%2FScreenshot%20from%202024-11-06%2015-00-02.png-1733505829202.png&w=640&q=75",
  },
  {
    name: "category 4",
    previewImage:
      "https://primecart.s3.us-east-2.amazonaws.com/categories/Rectangle 109.png-1734110797092.png",
  },
];

export const productImages = [
  "https://primecart-dev.thatguynapster.com/_next/image?url=https%3A%2F%2Fprimecart.s3.us-east-2.amazonaws.com%2Fproducts%2FScreenshot%20from%202024-11-06%2015-00-02.png-1733505829202.png&w=640&q=75",
  "https://primecart.s3.us-east-2.amazonaws.com/categories/Rectangle 109.png-1734110797092.png",
  "https://primecart-dev.thatguynapster.com/_next/image?url=https%3A%2F%2Fprimecart.s3.us-east-2.amazonaws.com%2Fproducts%2FScreenshot%20from%202024-11-06%2015-00-02.png-1733505829202.png&w=640&q=75",
  "https://primecart.s3.us-east-2.amazonaws.com/categories/Rectangle 109.png-1734110797092.png",
  "https://primecart.s3.us-east-2.amazonaws.com/categories/Rectangle 109.png-1734110797092.png",
  "https://primecart-dev.thatguynapster.com/_next/image?url=https%3A%2F%2Fprimecart.s3.us-east-2.amazonaws.com%2Fproducts%2FScreenshot%20from%202024-11-06%2015-00-02.png-1733505829202.png&w=640&q=75",
  "https://primecart.s3.us-east-2.amazonaws.com/categories/Rectangle 109.png-1734110797092.png",
  "https://primecart.s3.us-east-2.amazonaws.com/categories/Rectangle 109.png-1734110797092.png",
];

export const attributes: Record<string, string>[] = [
  {
    color: "obsidian",
    storage: "256gb",
  },
  {
    color: "hazel",
    storage: "128gb",
  },
  {
    color: "bay blue",
    storage: "256gb",
  },
];

export const cart: ICart[] = [
  {
    _id: "1",
    name: "Product 1",
    quantity: 1,
    available_quantity: 10,
    price: 100,
    image: productImages[0],
    variant: attributes[0],
  },
  {
    _id: "2",
    name: "Product 2",
    quantity: 1,
    available_quantity: 10,
    price: 200,
    image: productImages[1],
    variant: attributes[1],
  },
  {
    _id: "3",
    name: "Product 3",
    quantity: 1,
    available_quantity: 10,
    price: 300,
    image: productImages[2],
    variant: attributes[2],
  },
  {
    _id: "4",
    name: "Product 4",
    quantity: 1,
    available_quantity: 10,
    price: 400,
    image: productImages[3],
    variant: attributes[0],
  },
  {
    _id: "5",
    name: "Product 5",
    quantity: 1,
    available_quantity: 10,
    price: 500,
    image: productImages[4],
    variant: attributes[1],
  },
  {
    _id: "6",
    name: "Product 6",
    quantity: 1,
    available_quantity: 10,
    price: 600,
    image: productImages[5],
    variant: attributes[2],
  },
  {
    _id: "7",
    name: "Product 7",
    quantity: 1,
    available_quantity: 10,
    price: 700,
    image: productImages[6],
    variant: attributes[0],
  },
  {
    _id: "8",
    name: "Product 8",
    quantity: 1,
    available_quantity: 10,
    price: 800,
    image: productImages[7],
    variant: attributes[1],
  },
  {
    _id: "9",
    name: "Product 9",
    quantity: 1,
    available_quantity: 10,
    price: 900,
    image: productImages[0],
    variant: attributes[2],
  },
  {
    _id: "10",
    name: "Product 10",
    quantity: 1,
    available_quantity: 10,
    price: 1000,
    image: productImages[6],
    variant: attributes[0],
  },
];
