import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { LazyReact } from "~/components/LazyReact";
import classNames from "classnames/bind";

import styles from "~/styles/Layouts.module.scss";

const cx = classNames.bind(styles);

type Props = {
    children: JSX.Element | JSX.Element[] | string;
};

export default function SecondaryLayout({ children }: Props) {
    return (
        <div className={cx("secondary-layout", "min-vh-100 d-flex flex-column justify-content-between")}>
            <Header type="fixed" />
            <main className={cx("main")}>
                <LazyReact>{children}</LazyReact>
            </main>
            <Footer />
        </div>
    );
}
