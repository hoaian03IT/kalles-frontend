import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { CiHeart, CiShoppingCart, CiRead } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

import styles from "~/styles/CardProduct.module.scss";
import { memo, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ProductDetail } from "./productDetail/ProductDetail";
import { formatCurrencyVND } from "~/utils";

const cx = classNames.bind(styles);

type Props = {
    nameProduct: string;
    previewImages: string[];
    price: number;
    discount?: number;
    favorite?: boolean;
    link: string;
};

export const CardProduct = memo(({ nameProduct, price, discount, favorite = false, link, previewImages }: Props) => {
    const [favoriteStatus, setFavoriteStatus] = useState(favorite);
    const [showQuickView, setShowQuickView] = useState(false);

    const moneyAfterDiscount = discount && discount <= 100 ? price * (1 - discount / 100) : null;

    const handleToggleFavorite = () => {
        setFavoriteStatus(!favoriteStatus);
    };

    // update favorite
    useEffect(() => {
        setFavoriteStatus(favorite);
    }, [favorite]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("img")}>
                <Link to={link}>
                    <img loading="lazy" draggable="false" className={cx("first")} src={previewImages[0]} alt="" />
                </Link>
                <Link to={link}>
                    <img loading="lazy" draggable="false" className={cx("second")} src={previewImages[1]} alt="" />
                </Link>
                <div className={cx("action-btns")}>
                    <button className={cx("action-btn", "watch-btn")} onClick={() => setShowQuickView(true)}>
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
                {discount && <div className={cx("discount")}>-{discount}%</div>}
            </div>
            <div className={cx("details")}>
                <Link to={link} className="mb-1 text-decoration-none text-black">
                    {nameProduct}
                </Link>
                {/* price without discount */}
                <div className="d-flex align-items-center flex-wrap justify-content-center">
                    <span
                        className={`text-black-50 ${
                            moneyAfterDiscount !== null ? "text-decoration-line-through" : ""
                        }`}>
                        {formatCurrencyVND(price)}
                    </span>
                    {/* price with discount */}
                    {moneyAfterDiscount !== null && (
                        <span className="text-danger ms-2">{formatCurrencyVND(moneyAfterDiscount)}</span>
                    )}
                </div>
            </div>
            <div className={cx("quick-view-modal")}>
                <Modal show={showQuickView} size="lg" centered onHide={() => setShowQuickView(false)}>
                    <button className={cx("close-btn")} onClick={() => setShowQuickView(false)}>
                        <IoCloseOutline className="fs-3" />
                    </button>
                    {/* <ProductDetail
                        images={[
                            "https://demo-kalles-4-3.myshopify.com/cdn/shop/products/KIC_144-2169-1329-900_prod1.jpg",
                            "https://demo-kalles-4-3.myshopify.com/cdn/shop/products/KIC_144-2169-1329-900_prod2.jpg",
                            "https://demo-kalles-4-3.myshopify.com/cdn/shop/products/KIC_144-2169-1329-900_prod3.jpg",
                        ]}
                        nameProduct="Lanvin Paris Hoodie"
                        price={2423000}
                        discount={0}
                        description="Go kalles this summer with this vintage navy and white striped v-neck t-shirt from the Nike. Perfect for pairing with denim and white kicks for a stylish kalles vibe."
                        remainQuantity={1}
                        whitelist={false}
                    /> */}
                </Modal>
            </div>
        </div>
    );
});
