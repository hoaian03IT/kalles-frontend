import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { QuantityEditor } from "../QuantityEditor";
import { pathname } from "~/configs/pathname";
import {
    addProductToCartFailed,
    addProductToCartRequest,
    addProductToCartSuccess,
    destroyProductFromCart,
    removeProductFromCartFailed,
    removeProductFromCartRequest,
    removeProductFromCartSuccess,
} from "~/app/features/cart/cartReducer";

import classNames from "classnames/bind";
import styles from "~/styles/components/CartSlideItem.module.scss";
import { useAppDispatch } from "~/app/hooks";
import { toast } from "react-toastify";
import { CartItem } from "~/types";
import { formatCurrency } from "~/utils";
const cx = classNames.bind(styles);

export const ItemCardProduct = ({ product, quantity }: CartItem) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const linkProduct = pathname.detailProduct.split(":")[0] + product._id;

    const dispatch = useAppDispatch();

    const handleAddMoreQuantityProduct = () => {
        dispatch(addProductToCartRequest());
        try {
            setCurrentQuantity((prev) => prev + 1);
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
            setCurrentQuantity((prev) => (prev > 1 ? prev - 1 : 1));
        } catch {
            dispatch(removeProductFromCartFailed({ message: "Oops! Something went wrong!" }));
        }
    };

    const handleDestroyProductItem = (item: CartItem) => {
        dispatch(destroyProductFromCart(item));
    };

    return (
        <div className={cx("wrapper", "w-100")}>
            <Link to={linkProduct} className={cx("wrapper-image")}>
                <img
                    draggable={false}
                    className="h-100 w-100 user-select-none"
                    src={product.color.images[0]}
                    alt={product.name}
                />
            </Link>
            <div className="ms-4 flex-grow-1">
                <Link className={cx("name-product")} to={linkProduct}>
                    {product.name}
                </Link>
                <p className="fw-light text-black-50 mb-0">
                    {formatCurrency((product.price - (product.price * product.discount) / 100) * currentQuantity)}
                </p>
                <div className={cx("type-product", "d-flex align-items-center fw-light")}>
                    {product.color && <span>Color: {product.color.name}</span>}
                    {product.size && <span className="ms-2">Size: {product.size.name}</span>}
                </div>
                <div className="my-1">
                    <QuantityEditor
                        handleInCrease={handleAddMoreQuantityProduct}
                        handleInDecrease={handleRemoveProductItem}
                        value={currentQuantity}
                    />
                </div>
                <button className={cx("btn-delete")} onClick={() => handleDestroyProductItem({ product, quantity })}>
                    <IoTrashOutline className="fs-5" />
                </button>
            </div>
        </div>
    );
};
