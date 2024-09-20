import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "../commonTypes";
import { CartItem } from "~/types";

type CartState = {
    items: Array<CartItem>;
    total: number;
    discountAmount: number;
    loading: boolean;
    error: string;
};

const initialState: CartState = {
    items: [],
    total: 0,
    discountAmount: 0,
    loading: false,
    error: "",
};

function calculateTotalAndDiscount(cartItems: Array<CartItem>): [number, number] {
    let total = 0,
        discountAmount = 0;

    cartItems.forEach((cartItem) => {
        const product = cartItem.product;
        const quantity = cartItem.quantity;
        discountAmount += ((product.price * product.discount) / 100) * quantity;
        total += product.price * quantity;
    });
    return [total, discountAmount];
}

const MAX_ITEMS = 10;
const MIN_ITEMS = 1;

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCartRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        addProductToCartSuccess: (state, action: PayloadAction<CartItem>) => {
            const { product, quantity } = action.payload;
            let currentIndex = -1;
            for (let i = 0; i < state.items.length; i++) {
                let p = state.items[i].product;
                let { _id, size, color } = p;
                if (_id === product._id && size._id === product.size._id && color._id === product.color._id) {
                    currentIndex = i;
                    break;
                }
            }

            if (currentIndex >= 0 && currentIndex < state.items.length) {
                // update new stock
                state.items[currentIndex].product = { ...state.items[currentIndex].product, stock: product.stock };
                let quantityAfterAdded = state.items[currentIndex].quantity + quantity;
                console.log(quantityAfterAdded <= product.stock && quantityAfterAdded <= MAX_ITEMS);
                if (quantityAfterAdded <= product.stock && quantityAfterAdded <= MAX_ITEMS) {
                    state.items[currentIndex].quantity = quantityAfterAdded;
                }
            } else {
                state.items.push({ product, quantity });
            }

            let [t, d] = calculateTotalAndDiscount(state.items);
            state.total = t;
            state.discountAmount = d;
            state.loading = false;
        },
        addProductToCartFailed: (state, action: PayloadAction<Error>) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        removeProductFromCartRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        removeProductFromCartSuccess: (state, action: PayloadAction<CartItem>) => {
            const { product, quantity } = action.payload;
            let currentIndex = -1;
            for (let i = 0; i < state.items.length; i++) {
                let p = state.items[i].product;
                let { _id, size, color } = p;
                if (_id === product._id && size._id === product.size._id && color._id === product.color._id) {
                    currentIndex = i;
                    break;
                }
            }

            if (currentIndex >= 0 && currentIndex < state.items.length) {
                let quantityAfterRemoved = state.items[currentIndex].quantity - quantity;
                if (quantityAfterRemoved >= MIN_ITEMS) state.items[currentIndex].quantity = quantityAfterRemoved;
            }
            let [t, d] = calculateTotalAndDiscount(state.items);
            state.total = t;
            state.discountAmount = d;
            state.loading = false;
        },
        removeProductFromCartFailed: (state, action: PayloadAction<Error>) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        destroyProductFromCart: (state, action: PayloadAction<CartItem>) => {
            const { product } = action.payload;
            state.items = state.items.filter(
                (item) =>
                    product._id !== item.product._id ||
                    product.color._id !== item.product.color._id ||
                    product.size._id !== item.product.size._id
            );
            let [t, d] = calculateTotalAndDiscount(state.items);
            state.total = t;
            state.discountAmount = d;
            state.loading = false;
        },
        cleanAllCart: (state) => {
            state.items = [];
            state.total = 0;
            state.discountAmount = 0;
            state.loading = false;
            state.error = "";
        },
    },
});

export const {
    addProductToCartFailed,
    addProductToCartRequest,
    addProductToCartSuccess,
    removeProductFromCartFailed,
    removeProductFromCartRequest,
    removeProductFromCartSuccess,
    destroyProductFromCart,
    cleanAllCart,
} = cartSlice.actions;

export default cartSlice.reducer;
