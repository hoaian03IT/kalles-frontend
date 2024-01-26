import classNames from "classnames/bind";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CiHeart, CiShoppingCart, CiRead } from "react-icons/ci";

import styles from "~/styles/CardProduct.module.scss";
import { memo, useEffect, useState } from "react";

const cx = classNames.bind(styles);

type typeProduct = { id: string; image1: string; image2: string };

type Props = {
    nameProduct: string;
    price: number;
    types: Array<typeProduct>;
    discount?: number;
    favorite?: boolean;
};

export const CardProduct = memo(({ types, nameProduct, price, discount, favorite = false }: Props) => {
    const [favoriteStatus, setFavoriteStatus] = useState(favorite);
    const [typeProduct, setTypeProduct] = useState(0);
    const [moneyAfterDiscount] = useState(discount && discount <= 100 ? price * (1 - discount / 100) : null);

    const handleSelectType = (index: number) => {
        setTypeProduct(index);
    };

    const handleToggleFavorite = () => {
        setFavoriteStatus(!favoriteStatus);
    };

    // update favorite
    useEffect(() => {
        setFavoriteStatus(favorite);
    }, [favorite]);

    return (
        <div className={cx("wrapper")}>
            <Link to={"/"} className={cx("img")}>
                <Image loading="lazy" draggable="false" className={cx("first")} src={types[typeProduct].image1} />
                <Image loading="lazy" draggable="false" className={cx("second")} src={types[typeProduct].image2} />
                <div className={cx("action-btns")}>
                    <button className={cx("action-btn", "watch-btn")}>
                        <CiRead />
                    </button>
                    <button className={cx("action-btn", "add-cart-btn")}>
                        <CiShoppingCart />
                    </button>
                    <button
                        className={cx("action-btn", "add-whitelist-btn", favoriteStatus ? "active" : "")}
                        onClick={handleToggleFavorite}>
                        <CiHeart />
                    </button>
                </div>
                <div className={cx("discount")}>-{discount}%</div>
            </Link>
            <div className={cx("details")}>
                <Link to={"/"} className="mb-1 text-decoration-none text-black">
                    {nameProduct}
                </Link>
                {/* price without discount */}
                <span className={`text-black-50 ${moneyAfterDiscount !== null ? "text-decoration-line-through" : ""}`}>
                    {price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
                </span>
                {/* price with discount */}
                {moneyAfterDiscount !== null && (
                    <span className="text-danger ms-2">
                        {moneyAfterDiscount.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </span>
                )}
            </div>
            <div className={cx("types")}>
                {types.map((type, index) => (
                    <div
                        className={cx("type", index === typeProduct ? "active" : "")}
                        key={index}
                        onMouseEnter={() => handleSelectType(index)}
                        onClick={() => handleSelectType(index)}>
                        <div className={cx("type-img")}>
                            <Image src={type.image1} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});
