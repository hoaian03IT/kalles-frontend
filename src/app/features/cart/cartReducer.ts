import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "../commonTypes";
import { Product } from "../products/productReducer";

export type CartItem = {
    product: Product;
    quantity: number;
};

type CartState = {
    items: Array<CartItem>;
    loading: boolean;
    error: string;
};

const initialState: CartState = {
    items: [],
    loading: false,
    error: "",
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCartRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        addProductToCartSuccess: (state, action: PayloadAction<CartItem>) => {
            state.loading = false;
            const { product, quantity } = action.payload;
            const oldProduct = state.items.find(
                (item) =>
                    item.product._id === product._id &&
                    item.product.colors[0]._id === product.colors[0]._id &&
                    item.product.colors[0].sizes[0]._id === product.colors[0].sizes[0]._id
            );
            if (!oldProduct) {
                state.items.push({
                    product,
                    quantity,
                });
            }
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
                    item.product.colors[0].sizes[0]._id === product.colors[0].sizes[0]._id
                ) {
                    return {
                        ...item,
                        quantity,
                    };
                }
                return item;
            });
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
                    item.product.colors[0].sizes[0]._id !== action.payload.product.colors[0].sizes[0]._id
            );
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
