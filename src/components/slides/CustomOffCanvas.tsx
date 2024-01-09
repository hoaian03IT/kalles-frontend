import classNames from "classnames/bind";
import React, { SetStateAction } from "react";
import { Offcanvas } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";

import styles from "~/styles/CustomOffCanvas.module.scss";

const cx = classNames.bind(styles);

type Props = {
    titleHeader: string;
    show: boolean;
    placement?: "top" | "bottom" | "start" | "end";
    setShow: React.Dispatch<SetStateAction<boolean>>;
    children: JSX.Element | JSX.Element[] | string;
};

export const CustomOffCanvas = ({ titleHeader, show, placement = "start", children, setShow }: Props) => {
    return (
        <Offcanvas show={show} placement={placement}>
            <div className={`px-4 py-3 d-flex algin-items-center justify-content-between ${cx("header")}`}>
                <span className="text-uppercase fs-5 fw-light">{titleHeader}</span>
                <IoCloseOutline className={cx("icon-close")} onClick={() => setShow(false)} />
            </div>
            {children}
        </Offcanvas>
    );
};
