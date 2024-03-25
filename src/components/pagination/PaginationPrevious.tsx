import classNames from "classnames/bind";
import styles from "~/styles/Pagination.module.scss";

const cx = classNames.bind(styles);

type Props = {
    disabled?: boolean;
    onClick?: () => void;
};

const PaginationPrevious = ({ disabled, onClick }: Props) => {
    return (
        <li className={cx("pagination-item", "previous", disabled ? "disabled" : "")} onClick={onClick}>
            <span className={cx("value")}>Prev</span>
        </li>
    );
};

export default PaginationPrevious;
