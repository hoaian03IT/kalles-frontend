import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

const messageErrDefault = "Oops! Something went wrong";

export const fetchReviewsApi = async (query: string) => {
    try {
        const res = await axios.get(`/review/get-reviews?${query}`);
        return res.data;
    } catch (error) {
        toast.error("Oops! Something went wrong");
    }
};
export const createReviewApi = async (
    payload: { productId: string; title: string; content: string; email: string; rate: number; photos: Array<string> },
    axiosJWT: AxiosInstance
) => {
    try {
        const res = await axiosJWT.post("/review/create", payload);
        toast.success(res.data.message);
        return true;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || messageErrDefault;
            toast.error(message);
        }
        return false;
    }
};

export const fetchTotalRateApi = async (productId: string) => {
    try {
        const res = await axios.get(`/review/total-rate/${productId}`);
        return res.data;
    } catch {
        toast.error("Oops! Something went wrong");
    }
};
