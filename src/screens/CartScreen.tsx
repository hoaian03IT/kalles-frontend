import { HeaderBanner } from "~/components/HeaderBanner";
import { Col, Container, Row } from "react-bootstrap";
import { useAppSelector } from "~/app/hooks";
import { CartScreenItem } from "~/components/cart/CartScreenItem";
import { GrFormNextLink } from "react-icons/gr";

import classNames from "classnames/bind";
import styles from "~/styles/screens/CartScreen.module.scss";
import { formatCurrency } from "~/utils";
import { Link, useNavigate } from "react-router-dom";
import { pathname } from "~/configs/pathname";
import { bgBanner1 } from "~/assets/images/background-banner";
import { useId, useState } from "react";

const cx = classNames.bind(styles);

export default function CartScreen() {
    const { items: cartItems, discountAmount, total } = useAppSelector((state) => state.persist.cart);

    const [acceptTerms, setAcceptTerms] = useState(false);
    const checkboxId = useId();
    const navigate = useNavigate();

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
                            <span className="d-block text-end fs-6 fw-normal">{formatCurrency(total)}</span>
                            <span className="d-block text-end fs-6 fw-light text-black-50">
                                -{formatCurrency(discountAmount)}
                            </span>
                            <span className="d-block text-end fs-5">{formatCurrency(total - discountAmount)}</span>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <span className="text-black-50 fw-light">Taxes and shipping calculated at checkout</span>
                    <div className="d-flex align-items-center">
                        <input
                            id={checkboxId}
                            className="me-3"
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                        />
                        <label className="text-black-50 fw-light cursor-pointer" htmlFor={checkboxId}>
                            I agree with the terms and conditions.
                        </label>
                    </div>
                    <button
                        disabled={!acceptTerms}
                        className={cx("btn-checkout", "btn btn-size-md", "mt-2")}
                        onClick={() => navigate(pathname.checkout)}>
                        Check out
                    </button>
                </div>
            </Container>
        </div>
    );
}
