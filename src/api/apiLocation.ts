import axios from "axios";
import { toast } from "react-toastify";

// currently only supports VietNam

const token = "5814eda3-c696-11ee-b38e-f6f098158c7e";
const host = "https://online-gateway.ghn.vn/shiip/public-api/master-data";

export const getProvinceApi = async () => {
    try {
        const res = await axios.get(`${host}/province`, {
            headers: {
                "Content-Type": "application/json",
                Token: token,
            },
        });
        return res.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || error.message;
            toast.error(message);
        }
        return false;
    }
};

export const getDistrictApi = async (provinceId: number) => {
    try {
        const res = await axios.get(`${host}/district?province_id=${provinceId}`, {
            headers: {
                "Content-Type": "application/json",
                Token: token,
            },
        });
        return res.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || error.message;
            toast.error(message);
        }
        return false;
    }
};

export const getWardApi = async (districtId: Number) => {
    try {
        const res = await axios.get(`${host}/ward?district_id=${districtId}`, {
            headers: {
                "Content-Type": "application/json",
                Token: token,
            },
        });
        return res.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.message || error.message;
            toast.error(message);
        }
        return false;
    }
};
