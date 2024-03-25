import classNames from "classnames/bind";
import styles from "~/styles/Pagination.module.scss";

const cx = classNames.bind(styles);

const PaginationEllipsis = () => {
    return (
        <li className={cx("pagination-item", "ellipsis")}>
            <span className={cx("value")}>...</span>
        </li>
    );
};

export default PaginationEllipsis;
