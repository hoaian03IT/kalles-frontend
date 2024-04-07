import { useState } from "react";

import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { QuantityEditor } from "../QuantityEditor";
import { Product } from "~/app/features/products/productReducer";
import { pathname } from "~/configs/pathname";

import classNames from "classnames/bind";
import styles from "~/styles/CartSlideItem.module.scss";
const cx = classNames.bind(styles);

type Props = {
    product: Product;
};

export const ItemProduct = ({ product }: Props) => {
    const [currentQuantity, setCurrentQuantity] = useState(product.stock);
    const linkProduct = pathname.detailProduct.split(":")[0] + product._id;

    const handleAddOneItem = () => {
        setCurrentQuantity((prev) => (prev >= 10 ? prev : prev + 1));
    };
    const handleRemoveOneItem = () => {
        setCurrentQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    };
    return (
        <div className={cx("wrapper")}>
            <Link to={linkProduct} className={cx("wrapper-image")}>
                <img className="h-100 w-100 user-select-none" src={product.previewImages[0]} alt={product.name} />
            </Link>
            <div className="ms-4">
                <Link className={cx("name-product")} to={linkProduct}>
                    {product.name}
                </Link>
                <p className="fw-light text-black-50">
                    {product.price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
                </p>
                <QuantityEditor
                    handleInCrease={handleAddOneItem}
                    handleInDecrease={handleRemoveOneItem}
                    value={currentQuantity}
                />
                <IoTrashOutline className="cursor-pointer" />
            </div>
        </div>
    );
};
