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
import { Product } from "~/types";

const messageErrDefault = "Oops! Something went wrong";

export const fetchListProductApi = async (query: string, dispatch: Dispatch<Action>) => {
    dispatch(fetchListProductRequest());
    try {
        const res = await axios.get(`/product/filter?${query}`);
        dispatch(fetchListProductSuccess(res.data));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            dispatch(fetchListProductFailed({ message }));
            toast.error(message);
        }
        dispatch(fetchListProductFailed({ message: "lỗi" }));
    }
};

export const fetchProductDetailApi = async (productId: string, dispatch?: Dispatch<Action> | null) => {
    dispatch && dispatch(fetchDetailProductRequest());
    try {
        const fetchDetailProduct = async () => {
            const res = await axios.get(`/product/details/${productId}`);
            return res.data;
        };
        const fetchRateOfProduct = async () => {
            const res = await axios.get(`/review/avg-rate/${productId}`);
            return res.data;
        };

        const [res1, res2] = await Promise.all([fetchDetailProduct(), fetchRateOfProduct()]);
        const productDetail = { ...res1?.product, ...res2 };
        dispatch && dispatch(fetchDetailProductSuccess(productDetail as Product));
        return productDetail;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            dispatch && dispatch(fetchDetailProductFailed({ message }));
            toast.error(message);
        }
    }
};

export const fetchSuggestedProductApi = async (categoryId: string) => {
    try {
        const res = await axios.get(`/product/suggest/${categoryId}`);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            toast.error(message);
        }
    }
};

export const fetchQuantityAndSoldProductByColorSize = async (productId: string, sizeId: string, colorId: string) => {
    try {
        const res = await axios.get(
            `/product/quantity-sold?product-id=${productId}&size-id=${sizeId}&color-id=${colorId}`
        );
        return res.data as { quantity: number; sold: number };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            toast.error(message);
        }
    }
};
