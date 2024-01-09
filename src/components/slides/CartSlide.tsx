import { SetStateAction, useId, useState } from "react";
import { Button } from "react-bootstrap";
import classNames from "classnames/bind";
import { BsCartX } from "react-icons/bs";
import { CustomOffCanvas } from "./CustomOffCanvas";
import { ItemProduct } from "./ItemProduct";

import styles from "~/styles/CartSlide.module.scss";

const cx = classNames.bind(styles);

const totalPrice = 5000000;

type Props = {
    show: boolean;
    setShow: React.Dispatch<SetStateAction<boolean>>;
};

export const CartSlide = ({ show, setShow }: Props) => {
    const [isEmpty] = useState(false);
    const [checkedTerms, setCheckedTerms] = useState(false);

    const checkboxId = useId();
    return (
        <CustomOffCanvas titleHeader="shopping cart" show={show} setShow={setShow} placement="end">
            {isEmpty ? (
                <div className="p-5 m-5 text-center">
                    <BsCartX className={cx("icon-empty-cart")} />
                    <p className="mt-2 text-black-50">Your cart is empty</p>
                    <Button className="w-100 text-uppercase">return to shop</Button>
                </div>
            ) : (
                <div className={cx("list-item")}>
                    <div className="overflow-y-auto">
                        <ItemProduct
                            imageProduct="https://cdn.shopify.com/s/files/1/0641/8690/8910/products/hatta3044814a9b_1637360792172_2-0._QL90_1703d3a7-3b28-4599-b389-84e123169139.jpg"
                            nameProduct="Hat Attack Selena Bag"
                            linkDetails="/"
                            quantity={2}
                            price={12000}
                        />
                        <ItemProduct
                            imageProduct="https://cdn.shopify.com/s/files/1/0641/8690/8910/products/hatta3044814a9b_1637360792172_2-0._QL90_1703d3a7-3b28-4599-b389-84e123169139.jpg"
                            nameProduct="Hat Attack Selena Bag"
                            linkDetails="/"
                            quantity={2}
                            price={12000}
                        />
                        <ItemProduct
                            imageProduct="https://cdn.shopify.com/s/files/1/0641/8690/8910/products/hatta3044814a9b_1637360792172_2-0._QL90_1703d3a7-3b28-4599-b389-84e123169139.jpg"
                            nameProduct="Hat Attack Selena Bag"
                            linkDetails="/"
                            quantity={2}
                            price={12000}
                        />
                    </div>
                    <div className={cx("checkout")}>
                        <div className="d-flex align-items-center justify-content-between fs-4">
                            <span>Subtotal:</span>
                            <span>{totalPrice.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</span>
                        </div>
                        <p className="my-2 fw-light text-black-50">Taxes shipping calculated at checkout</p>
                        <div className="d-flex align-items-center">
                            <input
                                id={checkboxId}
                                className="me-3"
                                type="checkbox"
                                checked={checkedTerms}
                                onChange={(e) => setCheckedTerms(e.target.checked)}
                            />
                            <label className="text-black-50 fw-light cursor-pointer" htmlFor={checkboxId}>
                                I agree with the terms and conditions.
                            </label>
                        </div>
                        <div className="my-4">
                            <Button variant="secondary" className="w-100 text-uppercase">
                                check out
                            </Button>
                        </div>
                        <div className="my-4">
                            <Button
                                variant="primary"
                                disabled={checkedTerms ? false : true}
                                className="w-100 text-uppercase">
                                view cart
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </CustomOffCanvas>
    );
};
