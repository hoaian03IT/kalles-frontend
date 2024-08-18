import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addNewToWhitelistApi, fetchAllWhitelistApi, removeFromWhitelistApi } from "~/api/whitelist";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { axiosInstance } from "~/https/axiosInstance";
import { SubProduct } from "~/types";

export const WhitelistContext = createContext<{
    getWhitelist: () => Promise<void>;
    addNewToWhitelist: (product: SubProduct) => Promise<boolean>;
    removeOneFromWhitelist: (productId: string) => Promise<boolean>;
} | null>(null);

export default function WLContextComponent({ children }: { children: JSX.Element }) {
    const user = useAppSelector((state) => state.persist.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const axiosJWT = axiosInstance(user, dispatch, navigate);

    useEffect(() => {
        getWhitelist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getWhitelist = async () => {
        await fetchAllWhitelistApi(axiosJWT, dispatch);
    };

    const addNewToWhitelist = async (product: SubProduct): Promise<boolean> => {
        let result = await addNewToWhitelistApi(axiosJWT, dispatch, product);
        return result;
    };

    const removeOneFromWhitelist = async (productId: string): Promise<boolean> => {
        let result = await removeFromWhitelistApi(axiosJWT, dispatch, productId);
        return result;
    };

    return (
        <WhitelistContext.Provider value={{ getWhitelist, addNewToWhitelist, removeOneFromWhitelist }}>
            {children}
        </WhitelistContext.Provider>
    );
}
