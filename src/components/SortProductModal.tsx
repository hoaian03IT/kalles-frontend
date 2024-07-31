import { CustomOffCanvas } from "./slides/CustomOffCanvas";
import classNames from "classnames/bind";

import styles from "~/styles/SortProductModal.module.scss";
import { OrderFilterType } from "~/types";

const cx = classNames.bind(styles);

type Props = {
    orders: Array<{ label: string; key: OrderFilterType }>;
    current: OrderFilterType;
    onSelected: (value: OrderFilterType) => void;
    show: boolean;
    onHide: () => void;
};

export const SortProductModal = ({ orders, current, onSelected, show, onHide }: Props) => {
    return (
        <CustomOffCanvas titleHeader="sort by:" placement="bottom" show={show} onHide={onHide}>
            <div className={cx("wrapper")}>
                {orders.map((order, index) => (
                    <div
                        className={cx("order", current === order.key ? "active" : "", "px-4 py-2 my-2")}
                        key={order.key}
                        onClick={() => onSelected(order.key)}>
                        <span>{order.label}</span>
                    </div>
                ))}
            </div>
        </CustomOffCanvas>
    );
};
