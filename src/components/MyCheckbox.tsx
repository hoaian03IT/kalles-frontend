import { FaCheck } from "react-icons/fa6";
import classNames from "classnames/bind";

import styles from "~/styles/MyCheckbox.module.scss";
import { useId } from "react";

const cx = classNames.bind(styles);

type Props = {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const MyCheckbox = ({ label, checked, onChange }: Props) => {
    const inputId = useId();
    return (
        <div className={cx("group")}>
            <input
                id={inputId}
                type="checkbox"
                className={cx("input", "d-none")}
                checked={checked}
                onChange={onChange}
            />
            <div className={cx("my-checkbox", "d-flex align-items-center")}>
                <label htmlFor={inputId} className={cx("box", "d-flex align-items-center justify-content-center")}>
                    <FaCheck className={cx("check")} />
                </label>
                <label htmlFor={inputId} className={cx("label", "ps-2 fw-light")}>
                    {label}
                </label>
            </div>
        </div>
    );
};
