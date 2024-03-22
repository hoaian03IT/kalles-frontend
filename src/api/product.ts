import axios from "axios";
import { Action, Dispatch } from "@reduxjs/toolkit";
import {
    fetchListProductFailed,
    fetchListProductRequest,
    fetchListProductSuccess,
} from "~/app/features/products/productListReducer";
import { toast } from "react-toastify";
import {
    fetchDetailProductFailed,
    fetchDetailProductRequest,
    fetchDetailProductSuccess,
} from "~/app/features/products/productReducer";

export const fetchListProductApi = async (query: string, dispatch: Dispatch<Action>) => {
    dispatch(fetchListProductRequest());
    try {
        const res = await axios.get(`/product/filter?${query}`);
        dispatch(fetchListProductSuccess(res.data.products));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const { message } = error.response?.data;
            dispatch(fetchListProductFailed({ message }));
            toast.error(message);
        }
        dispatch(fetchListProductFailed({ message: "lỗi" }));
    }
};

export const fetchProductDetailApi = async (idProduct: string, dispatch: Dispatch<Action>) => {
    dispatch(fetchDetailProductRequest());
    try {
        const res = await axios.get(`/product/detail/${idProduct}`);
        dispatch(fetchDetailProductSuccess(res.data.product));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const { message } = error.response?.data;
            dispatch(fetchDetailProductFailed({ message }));
            toast.error(message);
        }
    }
};
