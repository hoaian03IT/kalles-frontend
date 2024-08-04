import { FormEvent, useState } from "react";
import { CustomInput } from "./CustomInput";
import { Button, FormGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { pathname } from "~/configs/pathname";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { signUpApi } from "~/api";
import classNames from "classnames/bind";

import styles from "~/styles/components/LoginForm&RegisterForm.module.scss";
import { validateRules } from "~/utils";

const cx = classNames.bind(styles);

export const RegisterForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("none");

    const [validateFirstNameMsg, setValidateFirstNameMsg] = useState("");
    const [validateLastNameMsg, setValidateLastNameMsg] = useState("");
    const [validateEmailMsg, setValidateEmailMsg] = useState("");
    const [validatePasswordMsg, setValidatePasswordMsg] = useState("");
    const [validateGenderMsg, setValidateGenderMsg] = useState("");

    const { loading } = useAppSelector((state) => state.persist.user);

    const dispatch = useAppDispatch();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let canSubmit = true;

        if (validateRules.email(email)) {
            setValidateEmailMsg(validateRules.email(email));
            canSubmit = false;
        } else {
            setValidateEmailMsg("");
        }

        if (validateRules.min(8)(password) || validateRules.max(256)(password)) {
            setValidatePasswordMsg(validateRules.min(8)(password) || validateRules.max(256)(password));
            canSubmit = false;
        } else {
            setValidatePasswordMsg("");
        }

        if (gender === "none") {
            setValidateGenderMsg("Select your gender!");
            canSubmit = false;
        } else {
            setValidateGenderMsg("");
        }

        if (
            validateRules.required(firstName) ||
            validateRules.required(lastName) ||
            validateRules.required(email) ||
            validateRules.required(password)
        ) {
            setValidateFirstNameMsg(validateRules.required(firstName));
            setValidateLastNameMsg(validateRules.required(lastName));
            setValidateEmailMsg(validateRules.required(email));
            setValidatePasswordMsg(validateRules.required(password));
            canSubmit = false;
        } else {
            setValidateFirstNameMsg("");
            setValidateLastNameMsg("");
            setValidateEmailMsg("");
            setValidatePasswordMsg("");
            setValidateGenderMsg("");
        }

        if (canSubmit) {
            await signUpApi({ firstName, lastName, email, password, gender }, dispatch);
        }
    };

    return (
        <div className={cx("wrapper")}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup>
                    <CustomInput
                        type="text"
                        value={firstName}
                        setValue={setFirstName}
                        label="First name"
                        required={true}
                    />
                    <span className={cx("validation-msg", "limit-line-1")}>{validateFirstNameMsg}</span>
                </FormGroup>
                <FormGroup>
                    <CustomInput
                        type="text"
                        value={lastName}
                        setValue={setLastName}
                        label="Last name"
                        required={true}
                    />
                    <span className={cx("validation-msg", "limit-line-1")}>{validateLastNameMsg}</span>
                </FormGroup>
                <FormGroup>
                    <select
                        className={cx("gender-selection")}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}>
                        <option value="none">-Select your gender-</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <span className={cx("validation-msg", "limit-line-1")}>{validateGenderMsg}</span>
                </FormGroup>
                <FormGroup>
                    <CustomInput type="email" value={email} setValue={setEmail} label="Email" required />
                    <span className={cx("validation-msg", "limit-line-1")}>{validateEmailMsg}</span>
                </FormGroup>
                <FormGroup>
                    <CustomInput type="password" value={password} setValue={setPassword} label="Password" required />
                    <span className={cx("validation-msg", "limit-line-1")}>{validatePasswordMsg}</span>
                </FormGroup>

                <Button type="submit" className="btn-size-md my-4 w-100 btn-round-border">
                    {loading ? <Spinner animation="border" variant="light" /> : <span>Register</span>}
                </Button>
            </form>
            <Link className="mt-3 d-block text-black-50" to={pathname.login}>
                Already have an account? Login here
            </Link>
        </div>
    );
};
