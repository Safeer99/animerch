import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext';

const Cart = createContext();

const CartContext = ({ children }) => {
    const [cart, setCart] = useState({});
    const [subTotal, setSubTotal] = useState(0);
    const [key, setKey] = useState(false);
    const [user, setUser] = useState({ value: null });
    const router = useRouter()

    const { dispatch } = useContext(UserContext);

    useEffect(() => {
        try {
            if (localStorage.getItem("cart")) {
                setCart(JSON.parse(localStorage.getItem("cart")))
                saveCart(JSON.parse(localStorage.getItem("cart")))
            }
        } catch (err) {
            localStorage.clear()
        }
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ value: token })
        }
    }, [router.query])

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
        setUser({ value: null });
        dispatch({ type: "LOG_OUT" })
    }

    const saveCart = (myCart) => {
        localStorage.setItem("cart", JSON.stringify(myCart))
        let subt = 0;
        let keys = Object.keys(myCart);
        for (let i = 0; i < keys.length; i++) {
            subt += myCart[keys[i]]?.price * myCart[keys[i]]?.qty;
        }
        setSubTotal(subt);
    }

    const addToCart = (itemCode, qty, price, name, size, variant) => {
        setKey(true);
        let newCart = cart;
        if (itemCode in cart) {
            newCart[itemCode].qty = cart[itemCode].qty + qty;
        } else {
            newCart[itemCode] = { qty: 1, price, name, size, variant }
        }
        setCart(newCart);
        saveCart(newCart);
    }

    const removeFromCart = (itemCode, qty) => {
        let newCart = cart;
        if (itemCode in cart) {
            newCart[itemCode].qty = cart[itemCode].qty - qty;
        }
        if (newCart[itemCode].qty <= 0) {
            setKey(false);
            delete newCart[itemCode]
        }
        setCart(newCart);
        saveCart(newCart);
    }

    const buyNow = (itemCode, qty, price, name, size, variant) => {
        let newCart = {};
        newCart[itemCode] = { qty, price, name, size, variant };
        setCart(newCart);
        saveCart(newCart);
        router.push('/checkout')
    }

    const clearCart = () => {
        setKey(false);
        setCart({});
        saveCart({});
    }

    return (
        <Cart.Provider value={{ key, logout, user, addToCart, removeFromCart, buyNow, clearCart, subTotal, cart }}>
            {children}
        </Cart.Provider>
    )
}

export default CartContext;

export const CartState = () => useContext(Cart);