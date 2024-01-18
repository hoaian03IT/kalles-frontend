import classNames from "classnames/bind";
import styles from "~/styles/HomeScreen.module.scss";

import { Banner } from "~/components/Banner";
import { ShopCollections } from "~/components/ShopCollections";

const cx = classNames.bind(styles);

export default function HomeScreen() {
    return (
        <div className={cx("wrapper")}>
            <Banner />
            <ShopCollections />
        </div>
    );
}
