import React, { SetStateAction, useId } from "react";
import { FormControl, FormGroup } from "react-bootstrap";
import classNames from "classnames/bind";

import styles from "~/styles/CustomInput.module.scss";

type Props = {
    label: string;
    value: string;
    setValue: React.Dispatch<SetStateAction<string>>;
    required: boolean;
    className?: string;
};

const cx = classNames.bind(styles);

export const CustomInput = ({ label, value, setValue, required, className }: Props) => {
    const inputId = useId();

    return (
        <FormGroup className={`${className} ${cx("group")}`}>
            <FormControl
                autoComplete="off"
                id={inputId}
                className={cx("input")}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <label className={cx("label", required ? "required" : "")} htmlFor={inputId}>
                {label}
            </label>
        </FormGroup>
    );
};
