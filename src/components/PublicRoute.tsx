import { ReactElement, useContext, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { pathname } from "~/configs/pathname";
import { CheckLoggedContext } from "./CheckLogged";

type Props = {
    children: JSX.Element | ReactElement<any, any>;
};

export const PublicRoute = ({ children }: Props) => {
    const { isLogged } = useContext(CheckLoggedContext);
    const navigate = useNavigate();

    const { search, pathname: path } = useLocation();
    const redirectUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectUrl ? redirectUrl : pathname.home;

    useLayoutEffect(() => {
        if (isLogged && (path === pathname.login || path === pathname.register)) {
            navigate(redirect);
        }
    }, [isLogged, navigate, redirect, path]);

    return children;
};
