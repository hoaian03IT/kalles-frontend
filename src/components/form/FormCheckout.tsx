import styles from "~/styles/screens/CheckoutScreen.module.scss";
import classNames from "classnames/bind";
import { Dispatch, SetStateAction } from "react";
import { Button, Col, FormGroup, Row } from "react-bootstrap";
import { useAppDispatch } from "~/app/hooks";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CustomInput } from "~/components/form/CustomInput";
import { formatCurrency } from "~/utils";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { createOrderApi, getDistrictApi, getProvinceApi, getShippingCostApi } from "~/api";

import { District, Province, Shipping } from "~/types";
import { useDebounce } from "~/hooks";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "~/https/axiosInstance";
import { Id, toast } from "react-toastify";
import { pathname } from "~/configs/pathname";
import { CartState, cleanAllCart } from "~/app/features/cart/cartReducer";
import { UserState } from "~/app/features/user/userReducer";
import { ModalBanking } from "../ModalBanking";

const cx = classNames.bind(styles);

const PAYMENT_CASH = "Cash";
const PAYMENT_BANKING = "Banking";

type Props = {
    userState: UserState;
    cartState: CartState;
    firstName: string;
    setFirstName: Dispatch<SetStateAction<string>>;
    lastName: string;
    setLastName: Dispatch<SetStateAction<string>>;
    shippingMethod: Shipping | null;
    setShippingMethod: Dispatch<SetStateAction<Shipping | null>>;
};

export const FormCheckout = ({
    userState,
    cartState,
    firstName,
    lastName,
    setFirstName,
    setLastName,
    setShippingMethod,
    shippingMethod,
}: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const axiosJWT = axiosInstance(userState, dispatch, navigate);

    const [country, setCountry] = useState("Viet Nam");
    const [province, setProvince] = useState<Province | null>(null);
    const [district, setDistrict] = useState<District | null>(null);
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState("");
    const [listProvince, setListProvince] = useState<Province[]>([]);
    const [listDistrict, setListDistrict] = useState<District[]>([]);
    const [shippingMethods, setShippingMethods] = useState<Shipping[]>([]);
    const [showModal, setShowModal] = useState(false);

    const addressDebounce = useDebounce(address, 500);

    const toastId = useRef<Id | null>(null);

    useEffect(() => {
        const getProvinces = async () => {
            const list = await getProvinceApi();
            setListProvince(list || []);
        };
        getProvinces();
    }, []);

    useEffect(() => {
        const getDistrict = async (provinceId: number) => {
            const list = await getDistrictApi(provinceId);
            setListDistrict(list || []);
        };

        if (province !== null) {
            getDistrict(province.ProvinceID);
        }
    }, [province]);

    useEffect(() => {
        const getShippingCost = async (provinceId: number) => {
            const methods = await getShippingCostApi(provinceId);
            setShippingMethods(methods || []);
        };
        if (addressDebounce && province) {
            getShippingCost(province?.ProvinceID);
        }
    }, [addressDebounce, province]);
    const handleSelectProvince = (e: ChangeEvent<HTMLSelectElement>) => {
        let province = listProvince.find((province) => province.ProvinceID + "" === e.currentTarget.value);
        setProvince(province || null);
    };

    const handleSelectDistrict = (e: ChangeEvent<HTMLSelectElement>) => {
        let district = listDistrict.find((district) => district.DistrictID + "" === e.currentTarget.value);
        setDistrict(district || null);
    };

    const handleOrder = async () => {
        if (province && district && address) {
            const handledProducts = cartState.items.map((item) => {
                let product = item.product;
                let price =
                    product.price *
                    (product.discount > 1 ? 100 - product.discount : 1 - product.discount) *
                    item.quantity;
                return {
                    productId: product._id,
                    sizeId: product.size._id,
                    colorId: product.color._id,
                    quantity: item.quantity,
                    price: price,
                    paymentMethod: payment,
                    address: {
                        country: country,
                        state: province?.ProvinceName,
                        city: district?.DistrictName,
                        street: address,
                        postalCode: district?.Code,
                    },
                };
            });
            toastId.current = toast("Loading...", { type: "default", autoClose: false });
            let result = await createOrderApi(axiosJWT, handledProducts, toastId);
            if (result) {
                let timeout = 3000;
                setTimeout(() => {
                    navigate(pathname.home);
                }, timeout);
                toast("We will redirect to home after 3s", {
                    type: "info",
                    autoClose: timeout,
                });
                dispatch(cleanAllCart());
            }
        }
    };

    return (
        <div>
            <form className={cx("form-info")}>
                <FormGroup>
                    <div>
                        <p className="mt-3 mb-2 fs-4">Delivery</p>
                        <Row className="my-2 g-2">
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
                            <Col md={4}>
                                <div className={cx("select-group")}>
                                    <label className={cx(province ? "focus" : "")}>Province</label>
                                    <select
                                        value={province?.ProvinceID}
                                        onChange={handleSelectProvince}
                                        defaultValue="">
                                        <option value=""></option>
                                        {listProvince.map((province) => (
                                            <option key={province.ProvinceID} value={province.ProvinceID}>
                                                {province.ProvinceName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className={cx("select-group")}>
                                    <label className={cx(district ? "focus" : "")}>District</label>
                                    <select
                                        value={district?.DistrictID}
                                        onChange={handleSelectDistrict}
                                        defaultValue="">
                                        <option value=""></option>
                                        {listDistrict.map((district) => (
                                            <option key={district.DistrictID} value={district.DistrictID}>
                                                {district.DistrictName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </Col>
                            <Col md={3}>
                                <CustomInput
                                    label="Post code"
                                    value={district?.Code || ""}
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
                                        Your order cannot be shipped to the selected address. Review your address to
                                        ensure it's correct and try again, or select a different address
                                    </p>
                                </div>
                            </div>
                        ) : (
                            shippingMethods.map((method) => (
                                <div
                                    key={method.id}
                                    className={cx(
                                        "radio-item",
                                        "shipping-method-item",
                                        method.id === shippingMethod?.id ? "active" : "",
                                        "mb-2 px-2 py-3 d-flex align-items-center"
                                    )}
                                    onClick={() => setShippingMethod(method)}>
                                    <input
                                        className="me-2"
                                        type="radio"
                                        name="shipping methods"
                                        checked={method.id === shippingMethod?.id}
                                        readOnly={true}
                                    />
                                    <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                                        <p className={cx("name", "m-0")}>{method.name}</p>
                                        <p className={cx("price", "m-0")}>{formatCurrency(method.fee)}</p>
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
                                        readOnly={true}
                                    />
                                    <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                                        <p className={cx("name", "m-0")}>{PAYMENT_CASH} - Cash on Delivery</p>
                                        <p className={cx("price", "m-0")}>
                                            {formatCurrency(
                                                cartState.total - cartState.discountAmount + shippingMethod.fee
                                            )}
                                        </p>
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
                                        readOnly={true}
                                    />
                                    <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                                        <p className={cx("name", "m-0")}>
                                            {PAYMENT_BANKING} - <span className="text-danger">Unpaid</span>
                                        </p>
                                        <p className={cx("price", "m-0")}>
                                            {formatCurrency(
                                                cartState.total - cartState.discountAmount + shippingMethod.fee
                                            )}
                                        </p>
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
                                        Your order cannot be paid. Review your shipping method to ensure it's correct
                                        and try again
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-3 float-end">
                        <Button variant="secondary" className="me-2 px-3 btn-size-md" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        {payment === PAYMENT_BANKING ? (
                            <Button variant="primary" className="px-5 btn-size-md" onClick={() => setShowModal(true)}>
                                Pay now
                            </Button>
                        ) : (
                            <Button variant="primary" className="px-5 btn-size-md" onClick={handleOrder}>
                                Order
                            </Button>
                        )}
                    </div>
                </FormGroup>
            </form>
            <ModalBanking
                show={showModal}
                onHide={() => setShowModal(false)}
                amount={cartState.total - cartState.discountAmount + (shippingMethod?.fee || 0)}
                cartItems={cartState.items}
            />
        </div>
    );
};
