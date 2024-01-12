import { LoginForm } from "../form/LoginForm";
import { CustomOffCanvas } from "./CustomOffCanvas";

type Props = {
    show: boolean;
    onHide: () => void;
};

export const LoginSlide = ({ show, onHide }: Props) => {
    return (
        <CustomOffCanvas titleHeader="login" show={show} onHide={onHide} placement="end">
            <LoginForm className="px-4" />
        </CustomOffCanvas>
    );
};
