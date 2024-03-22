import { CustomOffCanvas } from "./slides/CustomOffCanvas";
import classNames from "classnames/bind";

import styles from "~/styles/SortProductModal.module.scss";

const cx = classNames.bind(styles);

type Props = {
    orders: any[];
    current: number;
    onSelected: (value: number) => void;
    show: boolean;
    onHide: () => void;
};

export const SortProductModal = ({ orders, current, onSelected, show, onHide }: Props) => {
    return (
        <CustomOffCanvas titleHeader="sort by:" placement="bottom" show={show} onHide={onHide}>
            <div className={cx("wrapper")}>
                {orders.map((order, index) => (
                    <div
                        className={cx("order", current === index ? "active" : "", "px-4 py-2 my-2")}
                        key={order.key}
                        onClick={() => onSelected(index)}>
                        <span>{order.label}</span>
                    </div>
                ))}
            </div>
        </CustomOffCanvas>
    );
};
