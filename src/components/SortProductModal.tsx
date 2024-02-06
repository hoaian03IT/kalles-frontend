import { CustomOffCanvas } from "./slides/CustomOffCanvas";
import classNames from "classnames/bind";

import styles from "~/styles/SortProductModal.module.scss";

const cx = classNames.bind(styles);

type Props = {
    orders: string[];
    current: string;
    onSelected: (value: string) => void;
    show: boolean;
    onHide: () => void;
};

export const SortProductModal = ({ orders, current, onSelected, show, onHide }: Props) => {
    return (
        <CustomOffCanvas titleHeader="sort by:" placement="bottom" show={show} onHide={onHide}>
            <div className={cx("wrapper")}>
                {orders.map((item) => (
                    <div
                        className={cx("item", current === item ? "active" : "", "px-4 py-2 my-2")}
                        key={item}
                        onClick={() => onSelected(item)}>
                        <span>{item[0].toUpperCase() + item.slice(1)}</span>
                    </div>
                ))}
            </div>
        </CustomOffCanvas>
    );
};
