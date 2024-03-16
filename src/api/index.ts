import { Action, Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import {
    fetchCategoriesFailed,
    fetchCategoriesRequest,
    fetchCategoriesSuccess,
} from "~/app/features/category/categorySlice";
import {
    signUpFailed,
    signInFailed,
    signInRequest,
    signInSuccess,
    signUpRequest,
    signUpSuccess,
    signOutRequest,
    signOutSuccess,
} from "~/app/features/user/userSlice";
import { pathname } from "~/configs/pathname";

axios.defaults.baseURL = "http://localhost:4000";

type SignInPayload = {
    email: string;
    password: string;
};

export const signInApi = async (payload: SignInPayload, dispatch: Dispatch<Action>) => {
    try {
        dispatch(signInRequest());
        const response = await axios.post("/auth/sign-in", payload, {
            withCredentials: true,
        });
        dispatch(signInSuccess(response.data));
        toast.success(response.data.message);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const { message } = error.response?.data;
            dispatch(signInFailed({ message }));
        }
    }
};

type SignUpPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export const signUpApi = async (payload: SignUpPayload, dispatch: Dispatch<Action>) => {
    try {
        dispatch(signUpRequest());
        const response = await axios.post("/auth/sign-up", payload, {
            withCredentials: true,
        });
        dispatch(signUpSuccess(response.data));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const { message } = error.response?.data;
            dispatch(signUpFailed({ message }));
        }
    }
};

export const signOutApi = async (axiosJWT: AxiosInstance, navigate: NavigateFunction, dispatch: Dispatch<Action>) => {
    try {
        dispatch(signOutRequest());
        const response = await axiosJWT.post("/auth/sign-out", null, { withCredentials: true });
        dispatch(signOutSuccess());
        toast.success(response.data.message);
        navigate(pathname.home);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const { message } = error.response?.data;
            dispatch(signUpFailed({ message }));
        }
    }
};

export const RefreshTokenApi = async (navigate: NavigateFunction) => {
    try {
        const response = await axios.get("/auth/refresh-token", { withCredentials: true });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
        navigate(pathname.login);
    }
};

export const fetchCategoriesApi = async (dispatch: Dispatch<Action>) => {
    try {
        dispatch(fetchCategoriesRequest());
        const response = await axios.get("/category/all");
        dispatch(fetchCategoriesSuccess(response.data));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(fetchCategoriesFailed(error.response?.data));
        }
    }
};
