import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "../commonTypes";
import { Category } from "../category/categoryReducer";

export type SizeProduct = {
    _id: string;
    image: string;
    name: string;
    description: string;
};

export type ColorProduct = {
    _id: string;
    name: string;
    hex: string;
    sizes: Array<SizeProduct>;
};

export type ReviewProduct = {
    product: string;
    _id: string;
    content: string;
    title: string;
    owner: {
        firstName: string;
        lastName: string;
        avatar: string;
    };
    rate: number | 0;
    photos: Array<string>;
    updatedAt: string;
};

export type Product = {
    category: Category;
    _id: string;
    previewImages: Array<string>;
    name: string;
    description: string;
    price: number;
    discount: number;
    colors: Array<ColorProduct>;
    sex: string;
    stock: number;
    sold: number;
    rate: number;
};

type ProductState = {
    product: Product;
    loading: boolean;
    error: string;
};

const initialState: ProductState = {
    product: {
        category: {
            _id: "",
            key: "",
            name: "",
            description: "",
            img: "",
            productCount: 0,
        },
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
        fetchDetailProductSuccess: (state, action: PayloadAction<ProductState>) => {
            state.loading = false;
            state.product = action.payload.product;
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
