import React, { Fragment, useState } from "react";
import { CustomInput } from "./CustomInput";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { pathname } from "~/configs/pathname";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(123);
    };

    return (
        <Fragment>
            <form onSubmit={(e) => handleSubmit(e)}>
                <CustomInput className="mt-4" value={email} setValue={setEmail} label="Email" required />
                <CustomInput className="mt-4" value={password} setValue={setPassword} label="Password" required />
                <Link to="/" className="my-3 d-block text-black-50">
                    Forgot your password?
                </Link>
                <Button type="submit" className="btn-size-md w-100 btn-round-border">
                    Sign In
                </Button>
            </form>
            <Link className="mt-3 d-block text-black-50" to={pathname.register}>
                New customer? Create your account
            </Link>
        </Fragment>
    );
};
