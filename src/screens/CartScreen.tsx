import { HeaderBanner } from "~/components/HeaderBanner";
import { Col, Container, Row } from "react-bootstrap";
import { useAppSelector } from "~/app/hooks";
import { CartScreenItem } from "~/components/cart/CartScreenItem";
import { GrFormNextLink } from "react-icons/gr";

import classNames from "classnames/bind";
import styles from "~/styles/CartScreen.module.scss";
import { formatCurrencyVND } from "~/utils";
import { Link } from "react-router-dom";
import { pathname } from "~/configs/pathname";
import { bgBanner1 } from "~/assets/images/background-banner";

const cx = classNames.bind(styles);

export default function CartScreen() {
    const { items: cartItems, discountAmount, total } = useAppSelector((state) => state.persist.cart);
    return (
        <div className={cx("wrapper")}>
            <HeaderBanner img={bgBanner1} title="cart" />
            <Container className="my-5">
                <div className={cx("wrapper-title", "py-2")}>
                    <Row>
                        <Col md={6} className="text-start">
                            <span className="text-black text-uppercase">Product</span>
                        </Col>
                        <Col md={2} className="text-center">
                            <span className="text-black text-uppercase">Price</span>
                        </Col>
                        <Col md={2} className="text-center">
                            <span className="text-black text-uppercase">Quantity</span>
                        </Col>
                        <Col md={2} className="text-end">
                            <span className="text-black text-uppercase">Total</span>
                        </Col>
                    </Row>
                </div>
                <div className={cx("cart-list")}>
                    {cartItems?.map((item, index) => (
                        <CartScreenItem key={index} cartItem={item} />
                    ))}
                </div>
                <div className="py-4 d-flex justify-content-between">
                    <div>
                        <Link className={cx("link-to-shopping")} to={pathname.product}>
                            <span>Continue shopping</span>
                            <GrFormNextLink />
                        </Link>
                    </div>
                    <div className="d-flex align-items-end">
                        <span className="text-uppercase fs-5 fw-semibold">Subtotal:</span>
                        <div className="ms-3">
                            <span className="d-block text-end fs-6 fw-normal">{formatCurrencyVND(total)}</span>
                            <span className="d-block text-end fs-6 fw-light text-black-50">
                                -{formatCurrencyVND(discountAmount)}
                            </span>
                            <span className="d-block text-end fs-5">{formatCurrencyVND(total - discountAmount)}</span>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
