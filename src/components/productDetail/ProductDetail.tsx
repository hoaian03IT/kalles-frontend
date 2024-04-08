import classNames from "classnames/bind";
import { Col, OverlayTrigger, Popover, PopoverBody, Row, Tooltip } from "react-bootstrap";

import { Link } from "react-router-dom";
import styles from "~/styles/ProductDetail.module.scss";
import { formatCurrencyVND } from "~/utils";
import { QuantityEditor } from "../QuantityEditor";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { SocialNetworks } from "../SocialNetWorks";
import listSafeCheckout from "~/assets/images/list-safe-checkout.png";
import { ColorProduct, Product, SizeProduct } from "~/app/features/products/productReducer";
import { pathname } from "~/configs/pathname";
import { RateProduct } from "../RateProduct";
import { ImageSlider } from "../ImageSlider";
import { useAppDispatch } from "~/app/hooks";
import {
    addProductToCartFailed,
    addProductToCartRequest,
    addProductToCartSuccess,
} from "~/app/features/cart/cartReducer";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

type Props = {
    product: Product;
    preview?: boolean;
};

export const ProductDetail = ({ product, preview = false }: Props) => {
    const [quantityBuy, setQuantityBuy] = useState<number>(1);
    const [isWhitelist, setIsWhitelist] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<ColorProduct>(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState<SizeProduct>(selectedColor?.sizes[0]);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [listImages, setListImages] = useState<Array<string>>([]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const images = selectedColor?.sizes.map((size) => size.image);
        setListImages(images);
    }, [selectedColor]);

    const handleAddOneItem = () => {
        setQuantityBuy((prev) => (prev >= 10 ? prev : prev + 1));
    };
    const handleRemoveOneItem = () => {
        setQuantityBuy((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleSelectedColor = (color: ColorProduct) => {
        setSelectedColor(color);
        setSelectedSize(color.sizes[0]);
        setSelectedImage(0);
    };

    const handleSelectedSize = (size: SizeProduct, indexSize: number) => {
        setSelectedSize(size);
        setSelectedImage(indexSize);
    };

    const handleNextImageSlider = () => setSelectedImage((prev) => (prev === listImages.length - 1 ? 0 : prev + 1));
    const handlePreviousImageSlider = () => setSelectedImage((prev) => (prev === 0 ? listImages.length - 1 : prev - 1));

    const handleAddToCard = () => {
        try {
            dispatch(addProductToCartRequest());
            dispatch(
                addProductToCartSuccess({
                    product: { ...product, colors: [{ ...selectedColor, sizes: [selectedSize] }] },
                    quantity: quantityBuy,
                })
            );
            toast.success("Add to cart successfully");
        } catch (error) {
            dispatch(addProductToCartFailed({ message: "Oops! Something went wrong!" }));
        }
    };

    const priceAfterDiscount =
        product.discount > 0 ? product.price - (product.price * product.discount) / 100 : product.price;
    return (
        <div className={cx("wrapper", "w-100 h-100")}>
            <Row xs={{ cols: 1 }} md={{ cols: 2 }}>
                <Col className={preview ? "d-flex align-items-center" : ""}>
                    {preview ? (
                        <div className="w-100">
                            <ImageSlider
                                handleNextImage={handleNextImageSlider}
                                handlePreviousImage={handlePreviousImageSlider}
                                images={listImages}
                                selectedIndexImage={selectedImage}
                            />
                        </div>
                    ) : (
                        <Row>
                            <Col lg={2}>
                                {listImages?.map((image, index) => (
                                    <img
                                        key={index}
                                        className={cx("preview-image", index === selectedImage ? "active" : "")}
                                        src={image}
                                        alt=""
                                        draggable={false}
                                        loading="lazy"
                                        onClick={() => setSelectedImage(index)}
                                    />
                                ))}
                            </Col>
                            <Col lg={10}>
                                <ImageSlider
                                    handleNextImage={handleNextImageSlider}
                                    handlePreviousImage={handlePreviousImageSlider}
                                    images={listImages}
                                    selectedIndexImage={selectedImage}
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
                <Col>
                    <div className={cx("content", "px-4")}>
                        <Row>
                            <Col>
                                <h6 className={cx("name-product")}>{product.name}</h6>
                                <div className={cx("price")}>
                                    <span className={cx("current-price")}>{formatCurrencyVND(priceAfterDiscount)}</span>
                                    {product.discount > 0 && (
                                        <span
                                            className={cx(
                                                "origin-price",
                                                "ms-2 text-danger text-decoration-line-through"
                                            )}>
                                            {formatCurrencyVND(product.price)}
                                        </span>
                                    )}
                                </div>
                            </Col>
                            {!preview && (
                                <Col>
                                    <div className={cx("rating", "d-flex align-items-center justify-content-end")}>
                                        <span className="fw-light">Sold: {product.sold}</span>
                                        <span className="ms-4 d-flex align-items-center">
                                            <RateProduct rating={product.rate} />
                                            <span className="ms-1 fw-light">({product.rate})</span>
                                        </span>
                                    </div>
                                </Col>
                            )}
                        </Row>
                        <p className={cx("description", "text-black-50 mt-4 limit-line-4")}>{product.description}</p>
                        <div className={cx("color-product")}>
                            <h6 className={cx("label", "fw-normal text-uppercase")}>Color: {selectedColor?.name}</h6>
                            <div className={cx("colors")}>
                                {product.colors.map((color) => (
                                    <OverlayTrigger
                                        key={color._id}
                                        overlay={
                                            <Popover className={cx("popover")}>
                                                <PopoverBody className={cx("popover-body")}>{color.name}</PopoverBody>
                                            </Popover>
                                        }>
                                        <span
                                            className={cx("color", selectedColor._id === color._id ? "active" : "")}
                                            style={{ backgroundColor: color.hex }}
                                            onClick={() => handleSelectedColor(color)}></span>
                                    </OverlayTrigger>
                                ))}
                            </div>
                        </div>
                        <div className={cx("size-product", "mt-4")}>
                            <h6 className={cx("label", "fw-normal text-uppercase")}>Size: {selectedSize?.name}</h6>
                            <div className={cx("sizes")}>
                                {selectedColor?.sizes.map((size, index) => (
                                    <span
                                        key={size._id}
                                        className={cx("size", selectedSize._id === size._id ? "active" : "")}
                                        onClick={() => handleSelectedSize(size, index)}>
                                        {size.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                            <Row className="g-2 w-100 align-items-center">
                                <Col md={4}>
                                    <QuantityEditor
                                        handleInCrease={handleAddOneItem}
                                        handleInDecrease={handleRemoveOneItem}
                                        value={quantityBuy}
                                    />
                                </Col>
                                <Col md={8}>
                                    <Row className="g-2">
                                        <Col xs={8}>
                                            <button className={cx("btn-buy", "w-100")} onClick={handleAddToCard}>
                                                {product.stock === 0 ? "Out of stock" : "Add to cart"}
                                            </button>
                                        </Col>
                                        <Col xs={4}>
                                            <OverlayTrigger overlay={<Tooltip>Browse Whitelist</Tooltip>} delay={400}>
                                                <button
                                                    className={cx(
                                                        "whitelist",
                                                        isWhitelist ? "active" : "",
                                                        "d-flex align-items-center justify-content-center"
                                                    )}
                                                    onClick={() => setIsWhitelist(!isWhitelist)}>
                                                    <IoHeartOutline className={cx("icon", "icon-not-active", "fs-4")} />
                                                    <IoHeartSharp className={cx("icon", "icon-active", "fs-4")} />
                                                </button>
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                </Col>
                                <div className={cx("guaranteed-checkout")}>
                                    <p className="text-uppercase text-black fs-5">guaranteed safe checkout</p>
                                    <img className="w-100" src={listSafeCheckout} alt="safe checkout" />
                                </div>
                                <div>
                                    <div className="fw-light">
                                        <span className="text-black-50">Availability:&nbsp;</span>
                                        <span>{product.stock > 0 ? `In Stock (${product.stock})` : "Out Stock"}</span>
                                    </div>
                                    <div className="fw-light">
                                        <span className="text-black-50">Categories:&nbsp;</span>
                                        <span>
                                            <Link to={pathname.product + `?category=${product.category._id}`}>
                                                {product.category.name}
                                            </Link>
                                            ,&nbsp;
                                            <Link to={pathname.product + `?category=${product.category._id}`}>
                                                {product.sex[0]?.toUpperCase() +
                                                    product.sex.slice(1, product.sex.length)}
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <SocialNetworks type="border" colorHover="red" />
                                </div>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
