import { ReactElement, useContext, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { pathname } from "~/configs/pathname";
import { CheckLoggedContext } from "./CheckLogged";

type Props = {
    children: JSX.Element | ReactElement<any, any>;
};

export const PrivateRoute = ({ children }: Props) => {
    const { isLogged } = useContext(CheckLoggedContext);

    const navigate = useNavigate();
    const { pathname: path } = useLocation();

    useLayoutEffect(() => {
        if (!isLogged) navigate(pathname.login + "?redirect=" + path);
    }, [navigate, isLogged, path]);

    return children;
};
