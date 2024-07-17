import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "../commonTypes";
import { CartItem, Product } from "~/types";

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

function calculateTotalAndDiscount(cartItems: Array<CartItem>): Array<number> {
    let total = 0,
        discountAmount = 0;

    cartItems.forEach((cartItem: CartItem) => {
        const product = cartItem.product;
        const quantity = cartItem.quantity;
        discountAmount += ((product.price * product.discount) / 100) * quantity;
        total += product.price * quantity;
    });
    return [total, discountAmount];
}

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
            const oldProduct = state.items.find(
                (item) =>
                    item.product._id === product._id &&
                    item.product.colors[0]._id === product.colors[0]._id &&
                    item.product.sizes[0]._id === product.sizes[0]._id
            );
            if (!oldProduct) {
                state.items.push({
                    product,
                    quantity,
                });
                const [total, discountAmount] = calculateTotalAndDiscount(state.items);
                state.total = total;
                state.discountAmount = discountAmount;
            }
            state.loading = false;
        },
        addProductToCartFailed: (state, action: PayloadAction<Error>) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        uploadQuantityProductFromCartRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        uploadQuantityProductFromCartSuccess: (state, action: PayloadAction<CartItem>) => {
            const { product, quantity } = action.payload;
            state.items = state.items.map((item) => {
                if (
                    item.product._id === product._id &&
                    item.product.colors[0]._id === product.colors[0]._id &&
                    item.product.sizes[0]._id === product.sizes[0]._id
                ) {
                    return {
                        ...item,
                        quantity,
                    };
                }
                return item;
            });
            const [total, discountAmount] = calculateTotalAndDiscount(state.items);
            state.total = total;
            state.discountAmount = discountAmount;
        },
        uploadQuantityProductFromCartFailed: (state, action: PayloadAction<Error>) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        removeProductFromCartRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        removeProductFromCartSuccess: (state, action: PayloadAction<CartItem>) => {
            state.loading = false;
            state.items = state.items.filter(
                (item) =>
                    item.product._id !== action.payload.product._id ||
                    item.product.colors[0]._id !== action.payload.product.colors[0]._id ||
                    item.product.sizes[0]._id !== action.payload.product.sizes[0]._id
            );
            const [total, discountAmount] = calculateTotalAndDiscount(state.items);
            state.total = total;
            state.discountAmount = discountAmount;
        },
        removeProductFromCartFailed: (state, action: PayloadAction<Error>) => {
            state.loading = false;
            state.error = action.payload.message;
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
    uploadQuantityProductFromCartFailed,
    uploadQuantityProductFromCartRequest,
    uploadQuantityProductFromCartSuccess,
} = cartSlice.actions;

export default cartSlice.reducer;
