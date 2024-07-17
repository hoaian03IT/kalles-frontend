import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "../commonTypes";
import { Product } from "~/types";

type ProductState = {
    product: Product;
    loading: boolean;
    error: string;
};

const initialState: ProductState = {
    product: {
        category: {},
        _id: "",
        previewImages: [],
        name: "",
        description: "",
        price: 0,
        discount: 0,
        colors: [],
        sex: "",
        stock: 0,
        sold: 0,
        rate: 0,
        sizes: [],
    },
    loading: false,
    error: "",
};

export const userSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        fetchDetailProductRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        fetchDetailProductSuccess: (state, action: PayloadAction<Product>) => {
            state.loading = false;
            state.product = { ...state.product, ...action.payload };
            state.error = "";
        },
        fetchDetailProductFailed: (state, action: PayloadAction<Error>) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});

export const { fetchDetailProductFailed, fetchDetailProductRequest, fetchDetailProductSuccess } = userSlice.actions;

export default userSlice.reducer;
