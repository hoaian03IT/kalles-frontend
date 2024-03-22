import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "../commonTypes";

type Product = {
    _id: string;
    previewImages: string[];
    name: string;
    price: number;
    discount: number;
    sold: number;
};

type ProductListState = {
    products: Product[];
    loading: boolean;
    error: string;
};

const initialState: ProductListState = {
    products: [],
    loading: false,
    error: "",
};

export const productListSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        fetchListProductRequest: (state) => {
            state.loading = true;
            state.error = "";
        },
        fetchListProductSuccess: (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.products = action.payload;
            state.error = "";
        },
        fetchListProductFailed: (state, action: PayloadAction<Error>) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});

export const { fetchListProductFailed, fetchListProductRequest, fetchListProductSuccess } = productListSlice.actions;

export default productListSlice.reducer;
