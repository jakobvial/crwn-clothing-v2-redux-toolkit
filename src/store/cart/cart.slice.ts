import {createSlice} from "@reduxjs/toolkit";
import {CartItem} from "./cart.types";
import {CategoryItem} from "../categories/category.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        );
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // check if the quantity is equal to 1, if it is, remove that item from the cart
    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }

    // return back cartItems with matching cart item with reduced quantity
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
    );
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}

const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: []
};

// cart slice with createSlice
export const cartSlice = createSlice({
    name: 'cart',
    initialState: CART_INITIAL_STATE,
    reducers: {
        setIsCartOpen(state, action) {
            state.isCartOpen = action.payload;
        },
        addItemToCart(state, action) {
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        removeItemFromCart(state, action) {
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        },
        clearItemFromCart(state, action) {
            state.cartItems = clearCartItem(state.cartItems, action.payload);
        }
    }
});

// destructuring the action creators from the slice
export const {setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart} = cartSlice.actions;

// returning the reducer from the slice
export const cartReducer = cartSlice.reducer;