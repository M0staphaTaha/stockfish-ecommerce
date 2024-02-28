import React, { createContext, useState } from 'react';
import { useContext } from 'react';
import ShoppingCard from '../pages/ShoppingCard';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [favItems, setFavItems] = useState([]);

    const cartQuantityFav = favItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );

    const getItemsQuantityFav = (id) => {
        return favItems.find((item) => item.id === id)?.quantity || 0 ;
    };
    const increaseCartQuantityFav = (id) => {
        setFavItems((currItems) => {
            if (favItems.find((item) => item.id === id) == null) {
                // console.log(quantity);
                return [...currItems, { id, quantity: 1 }] ;
            }
            else {
                return currItems.map((item) => {
                    if (item.id === id) {
                // console.log(quantity);
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    else {
                // console.log(quantity);
                        return item;
                    }
                });
            }
        });
    };
    const decreaseCartQuantityFav = (id) => {
        setFavItems((currItems) => {
            if (favItems.find(item => item.id === id) === null) {
                return currItems.filter((item) => item.id !== id);
            }
            else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    }
                    else {
                        return item;
                    }
                })
            }
        });
    };
    const removeItemFromCartFav = (id) => {
        setFavItems((currItems) => currItems.filter((item) => item.id !== id))
    }
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );

    const getItemsQuantity = (id) => {
        return cartItems.find((item) => item.id === id)?.quantity || 0 ;
    };
    const increaseCartQuantity = (id) => {
        setCartItems((currItems) => {
            if (cartItems.find((item) => item.id === id) == null) {
                // console.log(quantity);
                return [...currItems, { id, quantity: 1 }] ;
            }
            else {
                return currItems.map((item) => {
                    if (item.id === id) {
                // console.log(quantity);
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    else {
                // console.log(quantity);
                        return item;
                    }
                });
            }
        });
    };
    const decreaseCartQuantity = (id) => {
        setCartItems((currItems) => {
            if (cartItems.find(item => item.id === id) === null) {
                return currItems.filter((item) => item.id !== id);
            }
            else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    }
                    else {
                        return item;
                    }
                })
            }
        });
    };
    const removeItemFromCart = (id) => {
        setCartItems((currItems) => currItems.filter((item) => item.id !== id))
    }
    return (
        <UserContext.Provider value={{ getItemsQuantityFav, increaseCartQuantityFav, decreaseCartQuantityFav, removeItemFromCartFav ,cartQuantityFav,cartQuantity,cartItems, getItemsQuantity, increaseCartQuantity, decreaseCartQuantity, removeItemFromCart }}> {/* Provide both name and setName functions */}
            {children}
        </UserContext.Provider>
    );
};

export const useShoppingCart = () => {
    return useContext(UserContext);
};