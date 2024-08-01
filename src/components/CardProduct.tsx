import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { CiHeart, CiShoppingCart, CiRead } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

import styles from "~/styles/CardProduct.module.scss";
import { memo, useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ProductDetail } from "./productDetail/ProductDetail";
import { formatCurrency } from "~/utils";
import { fetchProductDetailApi } from "~/api";
import { useAppDispatch } from "~/app/hooks";
import {
    addProductToCartFailed,
    addProductToCartRequest,
    addProductToCartSuccess,
} from "~/app/features/cart/cartReducer";
import { toast } from "react-toastify";
import { Product, SubProduct } from "~/types";
import { pathname } from "~/configs/pathname";

const cx = classNames.bind(styles);

type Props = {
    info: SubProduct;
};

export const CardProduct = memo(({ info }: Props) => {
    const [showQuickView, setShowQuickView] = useState(false);
    const [productInfo, setProductInfo] = useState<Product>();

    const dispatch = useAppDispatch();
    const linkToDetailedProduct = pathname.detailProduct.split(":")[0] + info._id;

    const moneyAfterDiscount = info.discount && info.discount <= 100 ? info.price * (1 - info.discount / 100) : null;

    const handleQuickView = useCallback(async () => {
        const detailed = await fetchProductDetailApi(info._id);
        if (detailed) {
            setProductInfo(detailed);
            setShowQuickView(true);
        }
    }, [info._id]);

    const handleAddToFavorite = () => {};

    const handleAddToCard = async () => {
        // const res = await fetchProductDetailApi(productId);
        // const product = res.product as Product;
        // dispatch(addProductToCartRequest());
        // if (product && product.colors.length === 1 && product.colors[0].sizes.length === 1) {
        //     dispatch(addProductToCartSuccess({ product: product, quantity: 1 }));
        //     toast.success("Add the product successfully!");
        // } else {
        //     const message = "The product have many types! Please select a type";
        //     dispatch(addProductToCartFailed({ message: message }));
        //     toast.warning(message);
        //     handleQuickView();
        //     setShowQuickView(true);
        // }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("img")}>
                <Link to={linkToDetailedProduct}>
                    <img loading="lazy" draggable="false" className={cx("first")} src={info.previewImages[0]} alt="" />
                </Link>
                <Link to={linkToDetailedProduct}>
                    <img loading="lazy" draggable="false" className={cx("second")} src={info.previewImages[1]} alt="" />
                </Link>
                <div className={cx("action-btns")}>
                    <button className={cx("action-btn", "watch-btn")} onClick={handleQuickView}>
                        <CiRead />
                    </button>
                    <button className={cx("action-btn", "add-cart-btn")} onClick={handleAddToCard}>
                        <CiShoppingCart />
                    </button>
                    <button className={cx("action-btn", "add-whitelist-btn")} onClick={handleAddToFavorite}>
                        <CiHeart />
                    </button>
                </div>
                {info.discount && <div className={cx("discount")}>-{info.discount}%</div>}
            </div>
            <div className={cx("details")}>
                <Link to={linkToDetailedProduct} className="fs-6 mb-1 text-decoration-none text-black">
                    {info.name}
                </Link>
                {/* price without discount */}
                <div className="d-flex align-items-center flex-wrap justify-content-center">
                    <span
                        className={`text-black-50 ${
                            moneyAfterDiscount !== null ? "text-decoration-line-through" : "fs-6"
                        }`}>
                        {formatCurrency(info.price)}
                    </span>
                    {/* price with discount */}
                    {moneyAfterDiscount !== null && (
                        <span className="text-danger ms-2">{formatCurrency(moneyAfterDiscount)}</span>
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
});
