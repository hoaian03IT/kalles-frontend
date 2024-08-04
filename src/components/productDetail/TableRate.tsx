import { FaStar } from "react-icons/fa";

import classNames from "classnames/bind";
import styles from "~/styles/screens/ProductDetailScreen.module.scss";
const cx = classNames.bind(styles);

type Props = {
    totalRate: Array<{ rate: number }>;
    handleSelectRate: (value: number) => void;
    filterRate: number;
};

export const TableRate = ({ filterRate, handleSelectRate, totalRate }: Props) => {
    return (
        <table className={cx("table-rate-percent")}>
            <tbody>
                {Array.from(Array(5).keys())
                    .reverse()
                    .map((item) => {
                        const quantity = totalRate.filter((oneRate) => oneRate.rate === item + 1).length;
                        const percent = (quantity / totalRate.length) * 100;
                        return (
                            <tr className={cx("rate-bar")} key={item}>
                                <th className={cx("rate-name")}>
                                    <div className="d-flex align-items-start">
                                        <FaStar className={cx("ic-star", "fs-5")} />
                                        <span className="ms-1 fw-light text-black-50">{item + 1}</span>
                                    </div>
                                </th>
                                <th className="w-100 px-2">
                                    <div
                                        className={cx("total-bar-default", percent === 0 ? "disabled" : "")}
                                        onClick={() => handleSelectRate(item + 1)}>
                                        <span className={cx("percent")} style={{ width: `${percent}%` }}></span>
                                    </div>
                                </th>
                                <th>
                                    <div
                                        className={cx(
                                            "quantity",
                                            "fw-light d-flex align-items-center justify-content-center",
                                            filterRate === item + 1 ? "active" : ""
                                        )}
                                        style={{}}>
                                        {quantity}
                                    </div>
                                </th>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
};
