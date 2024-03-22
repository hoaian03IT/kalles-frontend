import { Action, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { NavigateFunction } from "react-router-dom";
import { RefreshTokenApi } from "~/api";
import { UserState, signUpSuccess } from "~/app/features/user/userReducer";

export const axiosInstance = (state: UserState, dispatch: Dispatch<Action>, navigate: NavigateFunction) => {
    let newInstance = axios.create();
    newInstance.interceptors.request.use(
        async function (config) {
            let currentToken = state.token;
            const { exp } = jwtDecode(currentToken);
            if (exp && exp < new Date().getTime() / 1000) {
                try {
                    const res = await RefreshTokenApi(navigate);
                    currentToken = res.token;

                    dispatch(signUpSuccess({ ...state, token: currentToken }));
                } catch (error) {
                    localStorage.removeItem("persist:root");
                }
            }
            config.headers.Authorization = "Bearer " + currentToken;
            return config;
        },
        function (error) {
            console.log("interceptor error: ", error);
            return Promise.reject(error);
        }
    );
    return newInstance;
};
