import axios from "axios";
import { RefreshTokenApi, signInApi, signOutApi, signUpApi } from "./auth";
import { fetchCategoriesApi } from "./category";
import {
    fetchFilteredProductApi,
    fetchProductDetailApi,
    fetchHighestProductApi,
    fetchQuantityAndSoldProductByColorSizeApi,
    fetchSuggestedProductApi,
} from "./product";
import { createReviewApi, fetchReviewsApi, fetchTotalRateApi } from "./review";
import { getDistrictApi, getProvinceApi, getWardApi } from "./apiLocation";

export const messageErrDefault = "Oops! Something went wrong";

axios.defaults.baseURL = "http://localhost:4000";

export {
    RefreshTokenApi,
    fetchCategoriesApi,
    signInApi,
    signOutApi,
    signUpApi,
    fetchFilteredProductApi,
    fetchProductDetailApi,
    createReviewApi,
    fetchReviewsApi,
    fetchTotalRateApi,
    fetchHighestProductApi,
    fetchQuantityAndSoldProductByColorSizeApi,
    fetchSuggestedProductApi,
    getDistrictApi,
    getProvinceApi,
    getWardApi,
};
