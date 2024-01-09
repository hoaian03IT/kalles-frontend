import classNames from "classnames/bind";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import styles from "~/styles/CartSlideItem.module.scss";

const cx = classNames.bind(styles);

type Props = {
    imageProduct: string;
    nameProduct: string;
    quantity: number;
    price: number;
    linkDetails: string;
};

export const ItemProduct = ({ imageProduct, nameProduct, price, quantity, linkDetails }: Props) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const handleAddOneItem = () => {
        setCurrentQuantity((prev) => prev + 1);
    };
    const handleRemoveOneItem = () => {
        setCurrentQuantity((prev) => prev - 1);
    };
    return (
        <div className={cx("wrapper")}>
            <Link to={linkDetails} className={cx("wrapper-image")}>
                <Image className="h-100 w-100 user-select-none" src={imageProduct} alt={nameProduct} />
            </Link>
            <div className="ms-4">
                <Link className={cx("name-product")} to={linkDetails}>
                    {nameProduct}
                </Link>
                <p className="fw-light text-black-50">
                    {price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
                </p>
                <div className={cx("quantity")}>
                    <FaMinus className="cursor-pointer" onClick={handleRemoveOneItem} />
                    <span className="user-select-none">{currentQuantity}</span>
                    <FaPlus className="cursor-pointer" onClick={handleAddOneItem} />
                </div>
                <IoTrashOutline className="cursor-pointer" />
            </div>
        </div>
    );
};
