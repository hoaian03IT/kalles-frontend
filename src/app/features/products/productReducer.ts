import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "../commonTypes";

type SizeProduct = {
    _id: string;
    image: string;
    name: string;
    description: string;
};

type ColorProduct = {
    _id: string;
    name: string;
    hex: string;
    sizes: SizeProduct[];
};

type FeedBackProduct = {
    _id: string;
    feedback: string;
    owner: {
        lastName: string;
        avatar: string;
    };
};

type Product = {
    _id: string;
    category: string;
    previewImages: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    colors: ColorProduct[];
    sex: string[];
    stock: number;
    sold: number;
    feedback: FeedBackProduct;
};

type ProductState = {
    product: Product | null;
    loading: boolean;
    error: string;
};

const initialState: ProductState = {
    product: null,
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
