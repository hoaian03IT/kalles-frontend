import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { CiHeart, CiShoppingCart, CiRead } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

import styles from "~/styles/CardProduct.module.scss";
import { memo, useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ProductDetail } from "./productDetail/ProductDetail";
import { formatCurrencyVND } from "~/utils";
import { Product } from "~/app/features/products/productReducer";
import { fetchProductDetailApi } from "~/api";
import { useAppDispatch } from "~/app/hooks";
import {
    addProductToCartFailed,
    addProductToCartRequest,
    addProductToCartSuccess,
} from "~/app/features/cart/cartReducer";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

type Props = {
    productId: string;
    nameProduct: string;
    previewImages: string[];
    price: number;
    discount?: number;
    favorite?: boolean;
    link: string;
};

export const CardProduct = memo(
    ({ productId, nameProduct, price, discount, favorite = false, link, previewImages }: Props) => {
        const [favoriteStatus, setFavoriteStatus] = useState(favorite);
        const [showQuickView, setShowQuickView] = useState(false);
        const [productInfo, setProductInfo] = useState<Product>();

        const dispatch = useAppDispatch();

        const moneyAfterDiscount = discount && discount <= 100 ? price * (1 - discount / 100) : null;

        // update favorite
        useEffect(() => {
            setFavoriteStatus(favorite);
        }, [favorite]);

        const handleToggleFavorite = () => {
            setFavoriteStatus(!favoriteStatus);
        };

        const handleQuickView = useCallback(async () => {
            const res = await fetchProductDetailApi(productId);
            if (res.product) {
                setProductInfo(res.product);
                setShowQuickView(true);
            }
        }, [productId]);

        const handleAddToCard = async () => {
            const res = await fetchProductDetailApi(productId);
            const product = res.product as Product;

            dispatch(addProductToCartRequest());
            if (product && product.colors.length === 1 && product.colors[0].sizes.length === 1) {
                dispatch(addProductToCartSuccess({ product: product, quantity: 1 }));
                toast.success("Add the product successfully!");
            } else {
                const message = "The product have many types! Please select a type";
                dispatch(addProductToCartFailed({ message: message }));
                toast.warning(message);
                handleQuickView();
                setShowQuickView(true);
            }
        };

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
                        <button className={cx("action-btn", "watch-btn")} onClick={handleQuickView}>
                            <CiRead />
                        </button>
                        <button className={cx("action-btn", "add-cart-btn")} onClick={handleAddToCard}>
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
                        {productInfo && <ProductDetail preview={true} product={productInfo} />}
                    </Modal>
                </div>
            </div>
        );
    }
);
