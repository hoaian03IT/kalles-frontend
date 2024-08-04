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

export const userSlice = createSlice({
    name: "whitelist",
    initialState,
    reducers: {
        // addNewToWhitelistRequest: (state) => {
        //     state.loading = true;
        // },
        // addNewToWhitelistSuccess: (state, action: PayloadAction<SubProduct[]>) => {
        //     state.whitelist = action.payload;
        //     state.loading = false;
        // },
        // addNewToWhitelistFail: (state, action: PayloadAction<Error>) => {
        //     state.error = action.payload.message;
        //     state.loading = false;
        // },
    },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
