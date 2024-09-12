import axios from "axios";
import { toast } from "react-toastify";
import { Shipping } from "~/types";

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
