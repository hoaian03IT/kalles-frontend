import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOutApi } from "~/api";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { axiosInstance } from "~/https/axiosInstance";

type Props = {
    children: JSX.Element;
};

export const CheckLoggedContext = createContext({ isLogged: false, handleLogout: () => {} });

export const CheckLogged = ({ children }: Props) => {
    const [isLogged, setIsLogged] = useState(false);

    const userState = useAppSelector((state) => state.persist.user);
    const token = userState.token;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const axiosJWT = axiosInstance(userState, dispatch, navigate);

    const handleLogout = async () => {
        await signOutApi(axiosJWT, navigate, dispatch);
    };

    useEffect(() => {
        if (token) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, [token]);
    return <CheckLoggedContext.Provider value={{ isLogged, handleLogout }}>{children}</CheckLoggedContext.Provider>;
};
