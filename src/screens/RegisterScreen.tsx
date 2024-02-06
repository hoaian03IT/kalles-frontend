import classNames from "classnames/bind";
import { HeaderBanner } from "~/components/HeaderBanner";
import { RegisterForm } from "~/components/form/RegisterForm";

import styles from "~/styles/LoginScreen_RegisterScreen.module.scss";

const cx = classNames.bind(styles);
export default function RegisterScreen() {
    return (
        <div className={cx("wrapper")}>
            <HeaderBanner
                img="https://demo-kalles-4-3.myshopify.com/cdn/shop/files/shopping-cart-head_1950x_08fcf354-77bb-45df-9dbb-35687bdfb000.jpg"
                title="LOGIN"
            />
            <div className={cx("register-form")}>
                <RegisterForm />
            </div>
        </div>
    );
}
