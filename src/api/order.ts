import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { Shipping } from "~/types";

export const createOrderApi = async (axiosJWT: AxiosInstance, products: any[], toastId: any): Promise<boolean> => {
    try {
        const res = await axiosJWT.post("/order/create", { products });
        toast.update(toastId.current, { type: "success", render: res.data.message });
        return true;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || error.message;
            toast.update(toastId.current, { type: "error", render: message });
        }
        return false;
    }
};

export const getShippingCostApi = async (provinceId: number): Promise<Shipping[]> => {
    try {
        const res = await axios.get(`/order/shipping-cost?product_id=${provinceId}`);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || error.message;
            toast.error(message);
        }
        return [];
    }
};

export const fetchPaymentURL = async ({
    amount,
    orderDescription,
    orderType,
    bankCode = "",
    language = "en",
    returnUrl,
}: {
    amount: number;
    orderDescription: string;
    orderType: string;
    language?: string;
    bankCode?: string;
    returnUrl: string;
}): Promise<string> => {
    try {
        const res = await axios.post("/order/create-payment", {
            amount: amount + "",
            orderDescription,
            orderType,
            language,
            bankCode,
            returnUrl,
        });
        return res.data.url;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || error.message;
            toast.error(message);
        }
        return "";
    }
};
