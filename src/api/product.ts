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
import { ProductFilterType, Product, SubProduct } from "~/types";
import { messageErrDefault } from ".";

export const fetchFilteredProductApi = async (
    filter: ProductFilterType,
    dispatch?: Dispatch<Action>
): Promise<SubProduct[]> => {
    dispatch && dispatch(fetchListProductRequest());
    try {
        const res = await axios.get(
            `/product/filter?category=${filter.category}&order=${filter.order}&query=${filter.query}&sex=${filter.sex}&price=${filter.price}&page-size=${filter.pageSize}&page=${filter.page}&stock=${filter.stock}`
        );
        dispatch && dispatch(fetchListProductSuccess(res.data));
        return res.data.products;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            dispatch && dispatch(fetchListProductFailed({ message }));
            toast.error(message);
        }
        dispatch && dispatch(fetchListProductFailed({ message: messageErrDefault }));
        return [];
    }
};

export const fetchProductDetailApi = async (
    productId: string,
    dispatch?: Dispatch<Action> | null
): Promise<Product | null> => {
    dispatch && dispatch(fetchDetailProductRequest());
    try {
        const res = await axios.get(`/product/details/${productId}`);
        dispatch && dispatch(fetchDetailProductSuccess(res.data.product as Product));
        return res.data.product;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            dispatch && dispatch(fetchDetailProductFailed({ message }));
            toast.error(message);
        }
        return null;
    }
};

export const fetchSuggestedProductApi = async (categoryId: string, productId: string) => {
    try {
        const res = await axios.get(`/product/suggested-product?category=${categoryId}&except=${productId}`);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            toast.error(message);
        }
    }
};

export const fetchQuantityAndSoldProductByColorSizeApi = async (productId: string, sizeId: string, colorId: string) => {
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

export const fetchHighestProductApi = async (): Promise<number> => {
    try {
        const res = await axios.get("/product/highest-price");
        return res.data.price || 0;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            toast.error(message);
        }
        return 0;
    }
};
