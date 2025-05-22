'use client'

import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { ICart } from "@/lib/types";
import { toast } from "sonner";

interface ShoppingCartContextType {
    cartItems: ICart[];
    cartQuantity: number;
    cartTotal: number;
    getItemQuantity: (id: string) => number;
    addToCart: (item: Omit<ICart, "quantity">, quantity?: number) => void;
    initiateBuyNow: (item: ICart) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export function useShoppingCart() {
    const context = useContext(ShoppingCartContext);
    if (!context) {
        throw new Error("useShoppingCart must be used within a ShoppingCartProvider");
    }
    return context;
}

const CART_STORAGE_KEY = "shopping-cart";
const CART_BUY_NOW_KEY = "pc_buy-now";

interface ShoppingCartProviderProps {
    children: ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

    const [cartItems, setCartItems] = useState<ICart[]>(() => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem(CART_STORAGE_KEY);
            return storedCart ? JSON.parse(storedCart) : [];
        }
        return [];
    });

    const [buyNowItem, setBuyNowItem] = useState<ICart>(() => {
        if (typeof window !== 'undefined') {
            const storedBuyNow = localStorage.getItem(CART_BUY_NOW_KEY);
            return storedBuyNow ? JSON.parse(storedBuyNow) : {};
        }
        return {};
    })

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem(CART_BUY_NOW_KEY, JSON.stringify(buyNowItem));
    }, [buyNowItem]);

    const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    function getItemQuantity(id: string) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function addToCart(newItem: Omit<ICart, "quantity">, quantity = 1) {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === newItem.id);

            if (existingItem) {
                return prevItems.map(item => {
                    if (item.id === newItem.id) {
                        const newQuantity = item.quantity + quantity;
                        return {
                            ...item,
                            quantity: Math.min(newQuantity, item.available_quantity)
                        };
                    }
                    return item;
                });
            } else {

                return [...prevItems, { ...newItem, quantity: Math.min(quantity, newItem.available_quantity) }];
            }
        });

        toast("Item added to cart",
            {
                description: `${newItem.name} has been added to your cart.`,
                position: "top-center"
            }
        );
    }

    function initiateBuyNow(newItem: ICart) {
        setBuyNowItem(newItem);

        toast('Initiating instant buy',
            {
                description: `Redirecting to checkout to purchase ${newItem.name}`,
                position: "top-center"
            }
        );
    }

    function removeFromCart(id: string) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));

        const itemToRemove = cartItems.find(item => item.id === id);
        if (itemToRemove) {
            toast("Item removed",
                {
                    description: `${itemToRemove.name} has been removed from your cart.`,
                    position: "top-center"
                }
            );
        }
    }

    function updateQuantity(id: string, quantity: number) {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.min(quantity, item.available_quantity) }
                    : item
            ).filter(item => item.quantity > 0)
        );
    }

    function clearCart() {
        setCartItems([]);
        toast("Cart cleared",
            {
                description: "All items have been removed from your cart.",
                position: "top-center"
            }
        );
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                cartItems,
                cartQuantity,
                cartTotal,
                getItemQuantity,
                addToCart,
                initiateBuyNow,
                removeFromCart,
                updateQuantity,
                clearCart
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
}
