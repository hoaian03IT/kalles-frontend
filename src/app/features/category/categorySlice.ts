import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "../commonTypes";

type Category = {
    _id: string;
    name: string;
    description: string | null | undefined;
    img: string;
};

type CategoryState = {
    categories: Category[];
    loading: boolean;
    error: string;
};

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: "",
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        fetchCategoriesRequest: (state) => {
            state.loading = true;
        },
        fetchCategoriesSuccess: (state, action: PayloadAction<CategoryState>) => {
            state.loading = false;
            state.categories = action.payload.categories;
            state.error = "";
        },
        fetchCategoriesFailed: (state, action: PayloadAction<Error>) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});

export const { fetchCategoriesFailed, fetchCategoriesRequest, fetchCategoriesSuccess } = categorySlice.actions;

export default categorySlice.reducer;
