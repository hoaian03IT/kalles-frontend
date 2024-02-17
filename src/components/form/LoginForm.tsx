import { useState } from "react";
import { CustomInput } from "./CustomInput";
import { Button, FormGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { pathname } from "~/configs/pathname";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { signInApi } from "~/api";
import classNames from "classnames/bind";

import styles from "~/styles/LoginForm&RegisterForm.module.scss";
import { validateRules } from "~/utils";

const cx = classNames.bind(styles);

type Props = {
    onHideModal?: () => void; // pass if it is inside a modal
};

export const LoginForm = ({ onHideModal }: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validatedEmailMessage, setValidatedEmailMessage] = useState("");
    const [validatedPasswordMessage, setValidatedPasswordMessage] = useState("");

    const { loading } = useAppSelector((state) => state.user);

    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let canSubmit = true;
        // validate email
        if (validateRules.required(email)) {
            setValidatedEmailMessage(validateRules.required(email));
            canSubmit = false;
        } else if (validateRules.email(email)) {
            setValidatedEmailMessage(validateRules.email(email));
            canSubmit = false;
        } else {
            setValidatedEmailMessage("");
        }

        // validate password
        if (validateRules.required(password)) {
            setValidatedPasswordMessage(validateRules.required(password));
            canSubmit = false;
        } else if (validateRules.min(8)(password) || validateRules.max(256)(password)) {
            setValidatedPasswordMessage(validateRules.min(8)(password) || validateRules.max(256)(password));
            canSubmit = false;
        } else {
            setValidatedPasswordMessage("");
        }

        if (canSubmit) {
            signInApi({ email, password }, dispatch);
            if (onHideModal) onHideModal();
        }
    };

    return (
        <div className={cx("wrapper")}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup>
                    <CustomInput type="text" value={email} setValue={setEmail} label="Email" required />
                    <span className={cx("validation-msg", "limit-line-1")}>{validatedEmailMessage}</span>
                </FormGroup>
                <FormGroup>
                    <CustomInput type="password" value={password} setValue={setPassword} label="Password" required />
                    <span className={cx("validation-msg", "limit-line-1")}>{validatedPasswordMessage}</span>
                </FormGroup>
                <Link to="/" className="my-3 d-block text-black-50">
                    Forgot your password?
                </Link>
                <Button type="submit" disabled={loading ? true : false} className="btn-size-md w-100 btn-round-border">
                    {loading ? <Spinner animation="border" variant="light" /> : <span>Sign In</span>}
                </Button>
            </form>
            <Link className="mt-3 d-block text-black-50" to={pathname.register}>
                New customer? Create your account
            </Link>
        </div>
    );
};
