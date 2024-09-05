import styles from "~/styles/screens/CheckoutScreen.module.scss";
import classNames from "classnames/bind";
import { Accordion, Button, Col, FormGroup, Row } from "react-bootstrap";
import { useAppSelector } from "~/app/hooks";
import { CheckLoggedContext } from "~/components/CheckLogged";
import { useContext, useState } from "react";
import { CustomInput } from "~/components/form/CustomInput";
import { formatCurrency } from "~/utils";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

const cx = classNames.bind(styles);

const shippingMethodsFake = [
    { name: "Standard", price: 20 },
    { name: "Express", price: 40 },
    { name: "Economical", price: 10 },
];

const PAYMENT_CASH = "Cash";
const PAYMENT_BANKING = "Banking";

export default function CheckoutScreen() {
    const { user: userState, cart: cartState } = useAppSelector((state) => state.persist);
    const { email, firstName: fn, lastName: ln, phoneNumber, gender } = userState;
    const { items: cartItems, total, discountAmount } = cartState;
    const { handleLogout } = useContext(CheckLoggedContext);

    const [country, setCountry] = useState("Viet Nam");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [postCode, setPostCode] = useState("");
    const [address, setAddress] = useState("");
    const [firstName, setFirstName] = useState(fn);
    const [lastName, setLastName] = useState(ln);
    const [shippingMethod, setShippingMethod] = useState("");
    const [payment, setPayment] = useState("");

    return (
        <div className={cx("wrapper")}>
            <div className="d-flex flex-wrap-reverse min-vh-100">
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
                            <form className={cx("form-info")}>
                                <FormGroup>
                                    <div>
                                        <p className="mt-3 mb-2 fs-4">Delivery</p>
                                        <Row className="my-2">
                                            <Col>
                                                <CustomInput
                                                    label="First Name"
                                                    value={firstName}
                                                    type="text"
                                                    setValue={setFirstName}
                                                    roundBordered={true}
                                                />
                                            </Col>
                                            <Col>
                                                <CustomInput
                                                    label="Last Name"
                                                    value={lastName}
                                                    type="text"
                                                    setValue={setLastName}
                                                    roundBordered={true}
                                                />
                                            </Col>
                                        </Row>
                                        <CustomInput
                                            label="Country/Region"
                                            value={country}
                                            type="text"
                                            setValue={setCountry}
                                            roundBordered={true}
                                            disabled={true}
                                        />
                                        <Row className="my-2 gx-2">
                                            <Col>
                                                <div className={cx("select-group")}>
                                                    <label className={cx(province ? "focus" : "")}>Province</label>
                                                    <select
                                                        value={province}
                                                        onChange={(e) => setProvince(e.target.value)}>
                                                        <option value="" selected></option>
                                                        <option value="1">Option 1</option>
                                                        <option value="2">Option 2</option>
                                                        <option value="3">Option 3</option>
                                                    </select>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className={cx("select-group")}>
                                                    <label className={cx(district ? "focus" : "")}>District</label>
                                                    <select
                                                        value={district}
                                                        onChange={(e) => setDistrict(e.target.value)}>
                                                        <option value="" selected></option>
                                                        <option value="1">Option 1</option>
                                                        <option value="2">Option 2</option>
                                                        <option value="3">Option 3</option>
                                                    </select>
                                                </div>
                                            </Col>
                                            <Col>
                                                <CustomInput
                                                    label="Post code"
                                                    value={postCode}
                                                    type="text"
                                                    setValue={() => {}}
                                                    roundBordered={true}
                                                    disabled={true}
                                                />
                                            </Col>
                                        </Row>
                                        <CustomInput
                                            label="Address"
                                            value={address}
                                            type="text"
                                            setValue={setAddress}
                                            roundBordered={true}
                                        />
                                    </div>
                                    <div className="my-2">
                                        <p className="mt-4 mb-2">Shipping method</p>
                                        {!country || !province || !district || !address ? (
                                            <div className={cx("error", "px-4 py-2 d-flex align-items-start")}>
                                                <div className="mx-1">
                                                    <MdOutlineReportGmailerrorred className={cx("icon-error")} />
                                                </div>
                                                <div className="mt-1">
                                                    <p className={cx("title")}>Shipping not available</p>
                                                    <p className={cx("description")}>
                                                        Your order cannot be shipped to the selected address. Review
                                                        your address to ensure it's correct and try again, or select a
                                                        different address
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            shippingMethodsFake.map((method) => (
                                                <div
                                                    className={cx(
                                                        "radio-item",
                                                        "shipping-method-item",
                                                        method.name === shippingMethod ? "active" : "",
                                                        "mb-2 px-2 py-3 d-flex align-items-center"
                                                    )}
                                                    onClick={() => setShippingMethod(method.name)}>
                                                    <input
                                                        className="me-2"
                                                        type="radio"
                                                        name="shipping methods"
                                                        checked={shippingMethod === method.name}
                                                    />
                                                    <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                                                        <p className={cx("name", "m-0")}>{method.name}</p>
                                                        <p className={cx("price", "m-0")}>
                                                            {formatCurrency(method.price)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="my-2">
                                        <p className="mt-3 mb-2 fs-4">Payment</p>
                                        {shippingMethod ? (
                                            <div>
                                                <div
                                                    className={cx(
                                                        "radio-item",
                                                        "shipping-method-item",
                                                        payment === PAYMENT_CASH ? "active" : "",
                                                        "mb-2 px-2 py-3 d-flex align-items-center"
                                                    )}
                                                    onClick={() => setPayment(PAYMENT_CASH)}>
                                                    <input
                                                        className="me-2"
                                                        type="radio"
                                                        name="payment type"
                                                        checked={payment === PAYMENT_CASH}
                                                    />
                                                    <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                                                        <p className={cx("name", "m-0")}>
                                                            {PAYMENT_CASH} - Cash on Delivery
                                                        </p>
                                                        <p className={cx("price", "m-0")}>{formatCurrency(100)}</p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={cx(
                                                        "radio-item",
                                                        "shipping-method-item",
                                                        payment === PAYMENT_BANKING ? "active" : "",
                                                        "mb-2 px-2 py-3 d-flex align-items-center"
                                                    )}
                                                    onClick={() => setPayment(PAYMENT_BANKING)}>
                                                    <input
                                                        className="me-2"
                                                        type="radio"
                                                        name="payment type"
                                                        checked={payment === PAYMENT_BANKING}
                                                    />
                                                    <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                                                        <p className={cx("name", "m-0")}>
                                                            {PAYMENT_BANKING} -{" "}
                                                            <span className="text-danger">Unpaid</span>
                                                        </p>
                                                        <p className={cx("price", "m-0")}>{formatCurrency(100)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={cx("error", "px-4 py-2 d-flex align-items-start")}>
                                                <div className="mx-1">
                                                    <MdOutlineReportGmailerrorred className={cx("icon-error")} />
                                                </div>
                                                <div className="mt-1">
                                                    <p className={cx("title")}>Payment not available</p>
                                                    <p className={cx("description")}>
                                                        Your order cannot be paid. Review your shipping method to ensure
                                                        it's correct and try again
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-3 float-end">
                                        <Button variant="secondary" className="me-2 px-3 btn-size-md">
                                            Cancel
                                        </Button>
                                        {payment === PAYMENT_CASH ? (
                                            <Button variant="primary" className="px-5 btn-size-md">
                                                Pay now
                                            </Button>
                                        ) : (
                                            <Button variant="primary" className="px-5 btn-size-md">
                                                Order
                                            </Button>
                                        )}
                                    </div>
                                </FormGroup>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={cx("right-part", "py-4")}>
                    <div className={cx("show-orders", "px-5 py-4 col-md-5")}>
                        {cartItems.map((cartItem) => (
                            <div className={cx("cart-item")}>
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
                                    <span>{formatCurrency(100)}</span>
                                </div>
                            </div>
                        ))}
                        <div className={cx("prices", "mt-2")}>
                            <div className={cx("subtotal")}>
                                <span className={cx("title")}>Subtotal</span>
                                <span className={cx("cost")}>{formatCurrency(20)}</span>
                            </div>
                            <div className={cx("shipping-cost")}>
                                <span className={cx("title")}>Shipping</span>
                                <span className={cx("cost")}>{formatCurrency(20)}</span>
                            </div>
                            <div className={cx("total")}>
                                <span className={cx("title")}>Total</span>
                                <span className={cx("cost")}>
                                    <span className="px-2 fw-light fs-6">USD</span>
                                    {formatCurrency(20)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}