import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    // --------------------Add to Cart---------------------
    const addToCart = (product) => {
        const existing = cart.find(
            (item) => item._id === product._id
        );
        if (existing) {
            setCart(cart.map((item) => item._id === product._id ? {...item, qty: item.qty + 1,}: item));
        } else {
            setCart([...cart,{...product,qty: 1,},]);
        }
    };
    // --------------------Remove Item---------------------
    const removeFromCart = (_id) => {
        setCart(cart.filter((item) => item._id !== _id));
    };
    const increaseQty = (_id) => {
        setCart(cart.map((item) => item._id === _id ? {...item,qty: item.qty + 1,}: item));
    };
    const decreaseQty = (_id) => {
        setCart(cart.map((item) => item._id === _id ? {...item,qty: item.qty - 1,}: item).filter((item) => item.qty > 0));
    };
    const clearCart = () => {
        setCart([]);
    };

    // --------------------Total Price---------------------
    const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    return (
        <CartContext.Provider value={{cart,addToCart,removeFromCart,increaseQty,decreaseQty,clearCart,totalPrice,}}>
            {children}
        </CartContext.Provider>
    );
};