import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { pathname } from "~/configs/pathname";
import { formatCurrency } from "~/utils";
import { QuantityEditor } from "~/components/QuantityEditor";

import classNames from "classnames/bind";
import styles from "~/styles/screens/CartScreen.module.scss";
import {
    addProductToCartFailed,
    addProductToCartRequest,
    addProductToCartSuccess,
    destroyProductFromCart,
    removeProductFromCartFailed,
    removeProductFromCartRequest,
    removeProductFromCartSuccess,
} from "~/app/features/cart/cartReducer";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useAppDispatch } from "~/app/hooks";
import { CartItem } from "~/types";

const cx = classNames.bind(styles);

type Props = {
    cartItem: CartItem;
};

export const CartScreenItem = ({ cartItem }: Props) => {
    const product = cartItem.product;
    const [quantity, setQuantity] = useState<number>(cartItem.quantity);
    const dispatch = useAppDispatch();

    const discountedPrice = product.price - (product.price * product.discount) / 100;

    const handleAddMoreQuantityProduct = () => {
        dispatch(addProductToCartRequest());
        try {
            setQuantity((prev) => prev + 1);
            dispatch(addProductToCartSuccess({ product, quantity: 1 }));
        } catch {
            dispatch(addProductToCartFailed({ message: "Oops! Something went wrong!" }));
        }
    };

    const handleRemoveProductItem = () => {
        dispatch(removeProductFromCartRequest());
        try {
            dispatch(
                removeProductFromCartSuccess({
                    product,
                    quantity: 1,
                })
            );
            setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
        } catch {
            dispatch(removeProductFromCartFailed({ message: "Oops! Something went wrong!" }));
        }
    };

    const handleDestroyProductItem = (item: CartItem) => {
        dispatch(destroyProductFromCart(item));
    };

    return (
        <div className={cx("cart-item")}>
            <Row className="align-items-center">
                <Col md={6} className="d-flex align-items-center">
                    <div className={cx("wrapper-image")}>
                        <img src={product.color.images[0]} alt={product.name} />
                    </div>
                    <div className="ms-2">
                        <Link className={cx("product-name")} to={pathname.detailProduct.split(":")[0] + product._id}>
                            <h6>{product.name}</h6>
                        </Link>
                        <div className={cx("color-and-size", "fw-light")}>
                            <div className={cx("color", "d-flex align-items-center")}>
                                <span>Color:</span>
                                <span
                                    className={cx("color-present", "ms-1")}
                                    style={{ backgroundColor: product.color.hex }}></span>
                                &nbsp;<span>- {product.color.name}</span>
                            </div>
                            <div>
                                <span>Size:</span>&nbsp;
                                <span>{product.size.name}</span>
                            </div>
                        </div>
                        <button className={cx("btn-delete")} onClick={() => handleDestroyProductItem(cartItem)}>
                            <IoTrashOutline className="fs-5" />
                        </button>
                    </div>
                </Col>
                <Col md={2} className="text-center">
                    <div className={cx("product-price", "mx-auto")}>
                        <span className={cx("discounted-price", "d-block")}>{formatCurrency(discountedPrice)}</span>
                        {product.discount && (
                            <span className={cx("origin-price", "d-block")}>{formatCurrency(product.price)}</span>
                        )}
                    </div>
                </Col>
                <Col md={2}>
                    <div className="w-50 mx-auto">
                        <QuantityEditor
                            value={quantity}
                            handleInCrease={handleAddMoreQuantityProduct}
                            handleInDecrease={handleRemoveProductItem}
                        />
                    </div>
                </Col>
                <Col md={2} className="text-end">
                    <span>{formatCurrency(discountedPrice * quantity)}</span>
                </Col>
            </Row>
        </div>
    );
};
