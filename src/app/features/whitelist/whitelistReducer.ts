import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "../commonTypes";
import { SubProduct } from "~/types";

export type WhitelistState = {
    whitelist: SubProduct[];
    loading: boolean;
    error: string;
};

const initialState: WhitelistState = {
    whitelist: [],
    loading: false,
    error: "",
};

export const whitelistSlice = createSlice({
    name: "whitelist",
    initialState,
    reducers: {
        getWhitelistRequest: (state) => {
            state.loading = true;
        },
        getWhitelistSuccess: (state, action: PayloadAction<SubProduct[]>) => {
            state.whitelist = action.payload;
            state.loading = false;
        },
        getWhitelistFail: (state, action: PayloadAction<Error>) => {
            state.error = action.payload.message;
            state.loading = false;
        },
        addNewToWhitelistRequest: (state) => {
            state.loading = true;
        },
        addNewToWhitelistSuccess: (state, action: PayloadAction<SubProduct>) => {
            let existed = false;
            for (let product of state.whitelist) {
                if (product._id === action.payload._id) {
                    existed = true;
                    break;
                }
            }
            if (!existed) {
                state.whitelist.push(action.payload);
            }

            state.loading = false;
        },
        addNewToWhitelistFail: (state, action: PayloadAction<Error>) => {
            state.error = action.payload.message;
            state.loading = false;
        },
        removeOneFromWhitelistRequest: (state) => {
            state.loading = true;
        },
        removeOneFromWhitelistSuccess: (state, action: PayloadAction<string>) => {
            state.whitelist = state.whitelist.filter((product) => product._id !== action.payload);
            state.loading = false;
        },
        removeOneFromWhitelistFail: (state, action: PayloadAction<Error>) => {
            state.error = action.payload.message;
            state.loading = false;
        },
    },
});

export const {
    addNewToWhitelistFail,
    addNewToWhitelistRequest,
    addNewToWhitelistSuccess,
    getWhitelistFail,
    getWhitelistRequest,
    getWhitelistSuccess,
    removeOneFromWhitelistFail,
    removeOneFromWhitelistRequest,
    removeOneFromWhitelistSuccess,
} = whitelistSlice.actions;

export default whitelistSlice.reducer;
