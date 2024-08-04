import { FaStarHalfAlt, FaStar } from "react-icons/fa";

import classNames from "classnames/bind";
import styles from "~/styles/components/RatingProduct.module.scss";
const cx = classNames.bind(styles);

type Props = {
    rating: number;
    maxStar?: number;
    size?: "small" | "medium" | "large";
    justShow?: boolean;
    handleSelect?: (value: number) => void;
};

export const RateProduct = ({
    rating,
    maxStar = 5,
    size = "medium",
    justShow = true,
    handleSelect = () => {},
}: Props) => {
    const rateFloor = Math.floor(rating);
    const decimal = (rating - rateFloor) * 10;

    const fs = size === "medium" ? "fs-5" : size === "large" ? "fs-4" : "fs-6";

    return (
        <div className={cx("wrapper", "d-flex align-item-center")}>
            {Array.from(Array(maxStar).keys()).map((item) => {
                return item + 1 <= rateFloor ? (
                    <button
                        key={item}
                        className={cx("btn-select-star", justShow ? "just-show" : "")}
                        onClick={() => handleSelect(item + 1)}>
                        <FaStar className={cx("ic-star", "active", fs)} />
                    </button>
                ) : decimal > 0 && item + 1 === rateFloor + 1 ? (
                    <button
                        key={item}
                        className={cx("btn-select-star", justShow ? "just-show" : "")}
                        onClick={() => handleSelect(item + 1)}>
                        <FaStarHalfAlt className={cx("ic-star", "active", fs)} />
                    </button>
                ) : (
                    <button
                        key={item}
                        className={cx("btn-select-star", justShow ? "just-show" : "")}
                        onClick={() => handleSelect(item + 1)}>
                        <FaStar className={cx("ic-star", fs)} />
                    </button>
                );
            })}
        </div>
    );
};
