import classNames from "classnames/bind";
import { ReactNode } from "react";
import styles from "~/styles/components/Pagination.module.scss";

const cx = classNames.bind(styles);

type Props = {
    children: ReactNode | ReactNode[] | string;
    placement?: "start" | "end" | "center";
};

const Pagination = ({ children, placement = "center" }: Props) => {
    return <ul className={cx("pagination", placement)}>{children}</ul>;
};

export default Pagination;
