import styles from "~/styles/screens/CheckoutScreen.module.scss";
import classNames from "classnames/bind";
import { Accordion } from "react-bootstrap";
import { useAppSelector } from "~/app/hooks";
import { CheckLoggedContext } from "~/components/CheckLogged";
import { useContext, useState } from "react";
import { formatCurrency } from "~/utils";
import EmptyCartShow from "~/components/EmptyCartShow";
import { FormCheckout } from "~/components/form/FormCheckout";
import { Shipping } from "~/types";

const cx = classNames.bind(styles);

export default function CheckoutScreen() {
    const { user: userState, cart: cartState } = useAppSelector((state) => state.persist);
    const { email, firstName: fn, lastName: ln, phoneNumber, gender } = userState;
    const { items: cartItems, total, discountAmount } = cartState;
    const { handleLogout } = useContext(CheckLoggedContext);

    const [firstName, setFirstName] = useState(fn);
    const [lastName, setLastName] = useState(ln);
    const [shippingMethod, setShippingMethod] = useState<Shipping | null>(null);

    return (
        <div className={cx("wrapper")}>
            {cartItems.length === 0 ? (
                <EmptyCartShow />
            ) : (
                <div className="min-vh-100 d-flex flex-wrap-reverse">
                    <div className={cx("left-part", "py-4")}>
                        <div className={cx("checkout-info", "px-5")}>
                            <div className={cx("account")}>
                                <Accordion>
                                    <Accordion.Item className={cx("accordion-item")} eventKey="0">
                                        <Accordion.Header className={cx("accordion-header")}>
                                            <div>
                                                <p className="fw-light text-black-50">Account</p>
                                                <p className="mb-0">{email}</p>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body className={cx("accordion-body")}>
                                            <div>
                                                <p>{`${firstName} ${lastName} - ${gender}${
                                                    phoneNumber ? " - " + phoneNumber : ""
                                                }`}</p>
                                                <span
                                                    className="text-info text-decoration-underline cursor-pointer"
                                                    onClick={handleLogout}>
                                                    Log out
                                                </span>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div>
                                <FormCheckout
                                    cartState={cartState}
                                    userState={userState}
                                    firstName={firstName}
                                    setFirstName={setFirstName}
                                    lastName={lastName}
                                    setLastName={setLastName}
                                    setShippingMethod={setShippingMethod}
                                    shippingMethod={shippingMethod}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx("right-part", "py-4")}>
                        <div className={cx("show-orders", "px-5 py-4 col-md-5")}>
                            {cartItems.map((cartItem, index) => {
                                let { price, discount } = cartItem.product;
                                let cost = price * (discount > 1 ? 100 - discount : 1 - discount) * cartItem.quantity;
                                return (
                                    <div key={index} className={cx("cart-item")}>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className={cx("img-quantity")}>
                                                    <img
                                                        draggable={false}
                                                        className={cx("img")}
                                                        src={cartItem.product.color.images[0]}
                                                        alt=""
                                                    />
                                                    <span className={cx("quantity")}>{cartItem.quantity}</span>
                                                </div>
                                                <span className="ms-3">{cartItem.product.name}</span>
                                            </div>
                                            <span>{formatCurrency(cost)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className={cx("prices", "mt-2")}>
                                <div className={cx("subtotal")}>
                                    <span className={cx("title")}>Subtotal</span>
                                    <span className={cx("cost")}>{formatCurrency(total - discountAmount)}</span>
                                </div>
                                <div className={cx("shipping-cost")}>
                                    <span className={cx("title")}>Shipping</span>
                                    <span className={cx("cost")}>
                                        {shippingMethod ? formatCurrency(shippingMethod.fee) : "Calculating..."}
                                    </span>
                                </div>
                                <div className={cx("total")}>
                                    <span className={cx("title")}>Total</span>
                                    <span className={cx("cost")}>
                                        {formatCurrency(
                                            total - discountAmount + (shippingMethod ? shippingMethod?.fee : 0)
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
