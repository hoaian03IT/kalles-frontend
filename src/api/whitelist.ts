import axios, { AxiosInstance } from "axios";
import { SubProduct } from "~/types";
import { messageErrDefault } from ".";
import { toast } from "react-toastify";

export const fetchAllWhitelistApi = async (axiosJWT: AxiosInstance): Promise<SubProduct[]> => {
    try {
        const res = await axiosJWT.get("/whitelist");
        return res.data.whitelist;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            toast.error(message);
        } else {
            toast.error(messageErrDefault);
        }
        return [];
    }
};

export const addNewToWhitelistApi = async (axiosJWT: AxiosInstance, productId: string): Promise<boolean> => {
    try {
        const res = await axiosJWT.post("/whitelist/add", { productId: productId });
        toast.success(res.data.message);
        return true;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            toast.error(message);
        } else {
            toast.error(messageErrDefault);
        }
        return false;
    }
};

export const removeFromWhitelistApi = async (axiosJWT: AxiosInstance, productId: string) => {
    try {
        const res = await axiosJWT.delete(`/whitelist/remove/${productId}`);
        toast.success(res.data.message);
        return true;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            toast.error(message);
        } else {
            toast.error(messageErrDefault);
        }
        return false;
    }
};
