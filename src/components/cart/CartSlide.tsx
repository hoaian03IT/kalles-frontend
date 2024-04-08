import { useEffect, useId, useState } from "react";
import { Button } from "react-bootstrap";
import classNames from "classnames/bind";
import { BsCartX } from "react-icons/bs";
import { CustomOffCanvas } from "../slides/CustomOffCanvas";
import { ItemCardProduct } from "./ItemCartProduct";

import styles from "~/styles/CartSlide.module.scss";
import { useAppSelector } from "~/app/hooks";

const cx = classNames.bind(styles);

type Props = {
    show: boolean;
    onHide: () => void;
};

export const CartSlide = ({ show, onHide }: Props) => {
    const { items } = useAppSelector((state) => state.persist.cart);

    const [totalPrice, setTotalPrice] = useState(0);
    const [isEmpty] = useState(false);
    const [checkedTerms, setCheckedTerms] = useState(false);

    const checkboxId = useId();

    useEffect(() => {
        const total = items.reduce((acc, cur) => {
            const discountPrice = cur.product.price - (cur.product.price * cur.product.discount) / 100;
            return acc + discountPrice;
        }, 0);
        setTotalPrice(total);
    }, [items]);

    return (
        <CustomOffCanvas titleHeader="shopping cart" show={show} onHide={onHide} placement="end">
            {isEmpty ? (
                <div className="p-5 m-5 text-center">
                    <BsCartX className={cx("icon-empty-cart")} />
                    <p className="mt-2 text-black-50">Your cart is empty</p>
                    <Button className="w-100 text-uppercase">return to shop</Button>
                </div>
            ) : (
                <div className={cx("list-item")}>
                    <div className="overflow-y-auto">
                        {items?.map((item, index) => (
                            <ItemCardProduct key={index} product={item.product} quantity={item.quantity} />
                        ))}
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
                            <Button variant="secondary" className="w-100 text-uppercase btn-round-border">
                                view cart
                            </Button>
                        </div>
                        <div className="my-4">
                            <Button
                                variant="primary"
                                disabled={checkedTerms ? false : true}
                                className="w-100 text-uppercase btn-round-border">
                                check out
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </CustomOffCanvas>
    );
};
