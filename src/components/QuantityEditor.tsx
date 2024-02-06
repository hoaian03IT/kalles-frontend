import { FaMinus, FaPlus } from "react-icons/fa6";
import classNames from "classnames/bind";
import styles from "~/styles/QuantityEditor.module.scss";

const cx = classNames.bind(styles);

type Props = {
    handleInCrease: () => void;
    handleInDecrease: () => void;
    value: number;
};

export const QuantityEditor = ({ handleInCrease, handleInDecrease, value }: Props) => {
    return (
        <div className={cx("quantity", "w-100")}>
            <FaMinus className={cx("plus-icon", "cursor-pointer")} onClick={handleInDecrease} />
            <span className="user-select-none">{value}</span>
            <FaPlus className={cx("minus-icon", "cursor-pointer")} onClick={handleInCrease} />
        </div>
    );
};
