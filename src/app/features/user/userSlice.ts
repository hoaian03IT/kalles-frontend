import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "../commonTypes";
import { toast } from "react-toastify";

type UserState = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    phoneNumber: string;
    avatar: string;
    gender: string;
    loading: boolean;
    error: string;
};

const initialState: UserState = {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    token: "",
    phoneNumber: "",
    avatar: "",
    gender: "",
    loading: false,
    error: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signUpRequest: (state) => {
            state.loading = true;
        },
        signUpSuccess: (state, action: PayloadAction<UserState>) => {
            const { _id, firstName, lastName, email, token, phoneNumber, avatar, gender } = action.payload;
            state._id = _id;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
            state.phoneNumber = phoneNumber;
            state.avatar = avatar;
            state.gender = gender;
            state.token = token;

            state.loading = false;
            state.error = "";
        },
        signUpFailed: (state, action: PayloadAction<Error>) => {
            const errMsg = action.payload.message;
            toast.error(errMsg);
            state.error = errMsg;
            state.loading = false;
        },
        signInRequest: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action: PayloadAction<UserState>) => {
            const { _id, firstName, lastName, email, token, phoneNumber, avatar, gender } = action.payload;
            state._id = _id;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
            state.phoneNumber = phoneNumber;
            state.avatar = avatar;
            state.gender = gender;
            state.token = token;
            state.loading = false;
            state.error = "";
        },
        signInFailed: (state, action: PayloadAction<Error>) => {
            const errMsg = action.payload.message;
            toast.error(errMsg);
            state.error = errMsg;
            state.loading = false;
        },
        signOutRequest: (state) => {
            state.loading = true;
        },
        signOutSuccess: (state) => {
            state._id = "";
            state.firstName = "";
            state.lastName = "";
            state.email = "";
            state.token = "";
            state.error = "";
            state.phoneNumber = "";
            state.avatar = "";
            state.gender = "";
            state.loading = false;
        },
        signOutFailed: (state, action: PayloadAction<Error>) => {
            const errMsg = action.payload.message;
            toast.error(errMsg);
            state.error = errMsg;
            state.loading = false;
        },
    },
});

export const {
    signInRequest,
    signInSuccess,
    signInFailed,
    signUpFailed,
    signUpRequest,
    signUpSuccess,
    signOutFailed,
    signOutRequest,
    signOutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
