import { FormEvent, Fragment, useState } from "react";
import { CustomInput } from "./CustomInput";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { pathname } from "~/configs/pathname";

export const RegisterForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <Fragment>
            <form onSubmit={(e) => handleSubmit(e)}>
                <CustomInput
                    className="mt-4"
                    value={firstName}
                    setValue={setFirstName}
                    label="First name"
                    required={false}
                />
                <CustomInput
                    className="mt-4"
                    value={lastName}
                    setValue={setLastName}
                    label="Last name"
                    required={false}
                />
                <CustomInput className="mt-4" value={email} setValue={setEmail} label="Email" required />
                <CustomInput className="mt-4" value={password} setValue={setPassword} label="Password" required />

                <Button type="submit" className="btn-size-md my-4 w-100 btn-round-border">
                    Register
                </Button>
            </form>
            <Link className="mt-3 d-block text-black-50" to={pathname.login}>
                Already have an account? Login here
            </Link>
        </Fragment>
    );
};
