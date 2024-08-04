import classNames from "classnames/bind";
import styles from "~/styles/components/Pagination.module.scss";

const cx = classNames.bind(styles);

type Props = {
    value: number;
    isActive: boolean;
    onClick?: () => void;
};

const PaginationItem = ({ value, isActive, onClick }: Props) => {
    return (
        <li className={cx("pagination-item", isActive ? "active" : "")} onClick={onClick}>
            <span className={cx("value")}>{value}</span>
        </li>
    );
};

export default PaginationItem;
