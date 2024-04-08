import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { QuantityEditor } from "../QuantityEditor";
import { pathname } from "~/configs/pathname";
import {
    CartItem,
    removeProductFromCartRequest,
    removeProductFromCartSuccess,
    uploadQuantityProductFromCartFailed,
    uploadQuantityProductFromCartRequest,
    uploadQuantityProductFromCartSuccess,
} from "~/app/features/cart/cartReducer";

import classNames from "classnames/bind";
import styles from "~/styles/CartSlideItem.module.scss";
import { useAppDispatch } from "~/app/hooks";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

const MAX_ITEMS = 10;
const MIN_ITEMS = 1;

export const ItemCardProduct = ({ product, quantity }: CartItem) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const linkProduct = pathname.detailProduct.split(":")[0] + product._id;

    const dispatch = useAppDispatch();

    const handleUploadQuantityProduct = (quantity: number) => {
        try {
            if (quantity >= MIN_ITEMS && quantity <= MAX_ITEMS) {
                dispatch(uploadQuantityProductFromCartRequest());
                setCurrentQuantity(quantity);
                dispatch(uploadQuantityProductFromCartSuccess({ product, quantity: quantity }));
            }
        } catch {
            dispatch(uploadQuantityProductFromCartFailed({ message: "Oops! Something went wrong!" }));
        }
    };

    const handleRemoveProductItem = () => {
        dispatch(removeProductFromCartRequest());
        try {
            dispatch(
                removeProductFromCartSuccess({
                    product,
                    quantity: currentQuantity,
                })
            );
            toast.success("Remove product from cart successfully");
        } catch {
            dispatch(uploadQuantityProductFromCartFailed({ message: "Oops! Something went wrong!" }));
        }
    };

    return (
        <div className={cx("wrapper", "w-100")}>
            <Link to={linkProduct} className={cx("wrapper-image")}>
                <img
                    className="h-100 w-100 user-select-none"
                    src={product.colors[0].sizes[0].image}
                    alt={product.name}
                />
            </Link>
            <div className="ms-4 flex-grow-1">
                <Link className={cx("name-product")} to={linkProduct}>
                    {product.name}
                </Link>
                <p className="fw-light text-black-50 mb-0">
                    {((product.price - (product.price * product.discount) / 100) * currentQuantity).toLocaleString(
                        "it-IT",
                        {
                            style: "currency",
                            currency: "VND",
                        }
                    )}
                </p>
                <div className="d-flex align-items-center fw-light">
                    {product.colors[0] && <span>Color: {product.colors[0].name}</span>}
                    {product.colors[0].sizes[0] && (
                        <span className="ms-2">Size: {product.colors[0].sizes[0].name}</span>
                    )}
                </div>
                <div className="my-1">
                    <QuantityEditor
                        handleInCrease={() => handleUploadQuantityProduct(currentQuantity + 1)}
                        handleInDecrease={() => handleUploadQuantityProduct(currentQuantity - 1)}
                        value={currentQuantity}
                    />
                </div>
                <button className={cx("btn-delete")} onClick={handleRemoveProductItem}>
                    <IoTrashOutline className="fs-6" />
                </button>
            </div>
        </div>
    );
};
