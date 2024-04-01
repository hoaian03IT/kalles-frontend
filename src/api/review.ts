import axios from "axios";

export const fetchReviewsApi = async (query: string, setLoading: (value: boolean) => void) => {
    setLoading(true);
    try {
        const res = await axios.get(`/review/get-reviews?${query}`);
        setLoading(false);
        return res.data;
    } catch (error) {
        setLoading(false);
    }
};
