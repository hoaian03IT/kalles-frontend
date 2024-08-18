import axios, { AxiosInstance } from "axios";
import { SubProduct } from "~/types";
import { messageErrDefault } from ".";
import { toast } from "react-toastify";
import { Action, Dispatch } from "@reduxjs/toolkit";
import {
    addNewToWhitelistFail,
    addNewToWhitelistRequest,
    addNewToWhitelistSuccess,
    getWhitelistFail,
    getWhitelistRequest,
    getWhitelistSuccess,
    removeOneFromWhitelistFail,
    removeOneFromWhitelistRequest,
    removeOneFromWhitelistSuccess,
} from "~/app/features/whitelist/whitelistReducer";

export const fetchAllWhitelistApi = async (axiosJWT: AxiosInstance, dispatch: Dispatch<Action>) => {
    dispatch(getWhitelistRequest());
    try {
        const res = await axiosJWT.get("/whitelist");
        dispatch(getWhitelistSuccess(res.data.whitelist));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            toast.error(message);
            dispatch(getWhitelistFail({ message }));
        } else {
            toast.error(messageErrDefault);
            dispatch(getWhitelistFail({ message: messageErrDefault }));
        }
    }
};

export const addNewToWhitelistApi = async (
    axiosJWT: AxiosInstance,
    dispatch: Dispatch<Action>,
    product: SubProduct
): Promise<boolean> => {
    dispatch(addNewToWhitelistRequest());
    try {
        const res = await axiosJWT.post("/whitelist/add", { productId: product._id });
        dispatch(addNewToWhitelistSuccess(product));
        toast.success(res.data.message);
        return true;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            toast.error(message);
            dispatch(addNewToWhitelistFail({ message }));
        } else {
            toast.error(messageErrDefault);
            dispatch(addNewToWhitelistFail({ message: messageErrDefault }));
        }
        return false;
    }
};

export const removeFromWhitelistApi = async (
    axiosJWT: AxiosInstance,
    dispatch: Dispatch<Action>,
    productId: string
) => {
    dispatch(removeOneFromWhitelistRequest());
    try {
        const res = await axiosJWT.delete(`/whitelist/remove/${productId}`);
        dispatch(removeOneFromWhitelistSuccess(productId));
        toast.success(res.data.message);
        return true;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            dispatch(removeOneFromWhitelistFail({ message }));
            toast.error(message);
        } else {
            dispatch(removeOneFromWhitelistFail({ message: messageErrDefault }));
            toast.error(messageErrDefault);
        }
        return false;
    }
};
