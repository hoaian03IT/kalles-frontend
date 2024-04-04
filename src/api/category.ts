import { Action, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
    fetchCategoriesFailed,
    fetchCategoriesRequest,
    fetchCategoriesSuccess,
} from "~/app/features/category/categoryReducer";
export const fetchCategoriesApi = async (dispatch: Dispatch<Action>) => {
    try {
        dispatch(fetchCategoriesRequest());
        const response = await axios.get("/category/all");
        dispatch(fetchCategoriesSuccess(response.data));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || error.message;
            dispatch(fetchCategoriesFailed(message));
            toast.error(message);
        }
    }
};
