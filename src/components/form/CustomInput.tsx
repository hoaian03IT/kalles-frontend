import React, { SetStateAction, useId, useState } from "react";
import { FormControl, FormGroup } from "react-bootstrap";
import classNames from "classnames/bind";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

import styles from "~/styles/components/CustomInput.module.scss";

type Props = {
    label: string;
    value: string;
    type: "email" | "phone" | "text" | "password";
    setValue: React.Dispatch<SetStateAction<string>>;
    required?: boolean;
    boldText?: boolean;
    roundBordered?: boolean;
    disabled?: boolean;
};

const cx = classNames.bind(styles);

export const CustomInput = ({
    label,
    value,
    setValue,
    required = false,
    type,
    boldText = false,
    roundBordered = false,
    disabled = false,
}: Props) => {
    const inputId = useId();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormGroup className={cx("group", roundBordered ? "rounded" : "")}>
            <FormControl
                autoComplete="off"
                id={inputId}
                className={cx("input", boldText ? "fw-semibold" : "fw-light")}
                type={showPassword ? "text" : type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
            />
            <label className={cx("label", required ? "required" : "")} htmlFor={inputId}>
                {label}
            </label>
            {type === "password" && (
                <div>
                    <IoMdEyeOff
                        className={cx("icon-show-hide-password", !showPassword ? "active" : "", "fs-5")}
                        onClick={() => setShowPassword(true)}
                    />
                    <IoMdEye
                        className={cx("icon-show-hide-password", showPassword ? "active" : "", "fs-5")}
                        onClick={() => setShowPassword(false)}
                    />
                </div>
            )}
        </FormGroup>
    );
};
