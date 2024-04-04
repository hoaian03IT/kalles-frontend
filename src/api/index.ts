import axios from "axios";
import { RefreshTokenApi, signInApi, signOutApi, signUpApi } from "./auth";
import { fetchCategoriesApi } from "./category";
import { fetchListProductApi, fetchProductDetailApi } from "./product";
import { createReviewApi, fetchReviewsApi, fetchTotalRateApi } from "./review";

axios.defaults.baseURL = "http://localhost:4000";

export {
    RefreshTokenApi,
    fetchCategoriesApi,
    signInApi,
    signOutApi,
    signUpApi,
    fetchListProductApi,
    fetchProductDetailApi,
    createReviewApi,
    fetchReviewsApi,
    fetchTotalRateApi,
};
