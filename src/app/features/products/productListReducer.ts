import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "../commonTypes";
import { SubProduct } from "~/types";

type ProductListState = {
    products: SubProduct[];
    page: number;
    pages: number;
    loading?: boolean;
    error?: string;
};

const initialState: ProductListState = {
    products: [],
    page: 1,
    pages: 0,
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
        fetchListProductSuccess: (state, action: PayloadAction<ProductListState>) => {
            const { page, pages, products } = action.payload;
            state.loading = false;
            state.products = products;
            state.page = page;
            state.pages = pages;
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
