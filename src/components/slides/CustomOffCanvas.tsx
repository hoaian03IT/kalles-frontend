import classNames from "classnames/bind";
import { Offcanvas } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";

import styles from "~/styles/components/CustomOffCanvas.module.scss";

const cx = classNames.bind(styles);

type Props = {
    titleHeader?: string;
    show: boolean;
    placement?: "top" | "bottom" | "start" | "end";
    children: JSX.Element | JSX.Element[] | string;
    onHide?: () => void;
};

export const CustomOffCanvas = ({ titleHeader, show, onHide, placement = "start", children }: Props) => {
    return (
        <Offcanvas show={show} onHide={onHide} placement={placement}>
            <div className={cx("header", "px-4 py-3 d-flex algin-items-center justify-content-between")}>
                <span className="text-uppercase fs-5 fw-light">{titleHeader}</span>
                <IoCloseOutline className={cx("icon-close")} onClick={onHide} />
            </div>
            <div className={cx("body")}>{children}</div>
        </Offcanvas>
    );
};
