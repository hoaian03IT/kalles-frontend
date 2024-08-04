import styles from "~/styles/components/ChangeLayoutProductBtns.module.scss";
import classNames from "classnames/bind";
import { TfiLayoutColumn2Alt, TfiLayoutColumn3Alt, TfiLayoutColumn4Alt } from "react-icons/tfi";
import { Dispatch, SetStateAction } from "react";

const cx = classNames.bind(styles);

type Props = {
    layout: 2 | 3 | 4;
    setLayout: Dispatch<SetStateAction<2 | 3 | 4>>;
};

export const ChangeLayoutProductBtns = ({ layout, setLayout }: Props) => {
    return (
        <div className={cx("layouts", "justify-content-center")}>
            <button className={cx("layout-button", layout === 2 ? "active" : "")} onClick={() => setLayout(2)}>
                <TfiLayoutColumn2Alt className="fs-4" />
            </button>
            <button className={cx("layout-button", layout === 3 ? "active" : "")} onClick={() => setLayout(3)}>
                <TfiLayoutColumn3Alt className="fs-4" />
            </button>
            <button className={cx("layout-button", layout === 4 ? "active" : "")} onClick={() => setLayout(4)}>
                <TfiLayoutColumn4Alt className="fs-4" />
            </button>
        </div>
    );
};
