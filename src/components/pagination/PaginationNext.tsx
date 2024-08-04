import classNames from "classnames/bind";
import styles from "~/styles/components/Pagination.module.scss";

const cx = classNames.bind(styles);

type Props = {
    disabled?: boolean;
    onClick?: () => void;
};

const PaginationNext = ({ disabled, onClick }: Props) => {
    return (
        <li className={cx("pagination-item", "next", disabled ? "disabled" : "")} onClick={onClick}>
            <span className={cx("value")}>Next</span>
        </li>
    );
};

export default PaginationNext;
