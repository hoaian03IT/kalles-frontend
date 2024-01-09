import { LoginForm } from "../form/LoginForm";
import { CustomOffCanvas } from "./CustomOffCanvas";
import React, { SetStateAction } from "react";

type Props = {
    show: boolean;
    setShow: React.Dispatch<SetStateAction<boolean>>;
};

export const LoginSlide = ({ show, setShow }: Props) => {
    return (
        <CustomOffCanvas titleHeader="login" show={show} setShow={setShow} placement="end">
            <LoginForm className="px-4" />
        </CustomOffCanvas>
    );
};
