import styles from "~/styles/components/EmptyCartShow.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { pathname } from "~/configs/pathname";
import emptyCart from "~/assets/images/empty2png.png";

const cx = classNames.bind(styles);

export default function EmptyCartShow() {
    return (
        <div className={cx("empty-cart", "d-flex flex-column align-items-center")}>
            <img src={emptyCart} alt="" />
            <h2 className="text-black-50">Your cart is empty!</h2>
            <Link to={pathname.shop}>Go to shop now</Link>
        </div>
    );
}
