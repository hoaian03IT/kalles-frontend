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

const messageErrDefault = "Oops! Something went wrong";

export const fetchFilteredProductApi = async (filter: ProductFilterType, dispatch: Dispatch<Action>) => {
    dispatch(fetchListProductRequest());
    try {
        const res = await axios.get(
            `/product/filter?category=${filter.category}&order=${filter.order}&query=${filter.query}&sex=${filter.sex}&price=${filter.price}&page-size=${filter.pageSize}&page=${filter.page}&stock=${filter.stock}`
        );
        dispatch && dispatch(fetchListProductSuccess(res.data));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            dispatch && dispatch(fetchListProductFailed({ message }));
            toast.error(message);
        }
        dispatch && dispatch(fetchListProductFailed({ message: "lỗi" }));
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

export const fetchNewArrivalProductApi = async (quantityProducts: number = 16): Promise<SubProduct[]> => {
    try {
        const res = await axios.get(`/product/filter?order=newest&page-size=${quantityProducts}`);
        return res.data.products || [];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            toast.error(message);
        }
        return [];
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
