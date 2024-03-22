import { Action, Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

import {
    signUpFailed,
    signInFailed,
    signInRequest,
    signInSuccess,
    signUpRequest,
    signUpSuccess,
    signOutRequest,
    signOutSuccess,
} from "~/app/features/user/userReducer";
import { pathname } from "~/configs/pathname";

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
        return true;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const { message } = error.response?.data;
            dispatch(signInFailed({ message }));
            toast.error(message);
        }
        return false;
    }
};

type SignUpPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
};

export const signUpApi = async (payload: SignUpPayload, dispatch: Dispatch<Action>) => {
    try {
        dispatch(signUpRequest());
        const response = await axios.post("/auth/sign-up", payload, {
            withCredentials: true,
        });
        toast.success(response.data.message);
        dispatch(signUpSuccess(response.data));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const { message } = error.response?.data;
            dispatch(signUpFailed({ message }));
            toast.error(message);
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
            toast.error(message);
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
