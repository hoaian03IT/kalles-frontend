import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import classNames from "classnames/bind";

import styles from "~/styles/components/Layouts.module.scss";

const cx = classNames.bind(styles);

type Props = {
    children: JSX.Element | JSX.Element[] | string;
};

export default function PrimaryLayout({ children }: Props) {
    return (
        <div className={cx("primary-layout", "min-vh-100 d-flex flex-column justify-content-")}>
            <div>
                <Header type="sticky" />
                <main className={cx("main")}>{children}</main>
            </div>
            <Footer />
        </div>
    );
}
