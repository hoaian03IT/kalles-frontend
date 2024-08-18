import classNames from "classnames/bind";
import { Col, Container, OverlayTrigger, Popover, PopoverBody, Row, Tooltip } from "react-bootstrap";

import { Link } from "react-router-dom";
import styles from "~/styles/components/ProductDetail.module.scss";
import { formatCurrency } from "~/utils";
import { QuantityEditor } from "../QuantityEditor";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useCallback, useContext, useEffect, useState } from "react";
import { SocialNetworks } from "../SocialNetWorks";

import { pathname } from "~/configs/pathname";
import { RateProduct } from "../RateProduct";
import { ImageSlider } from "../ImageSlider";
import { useAppDispatch } from "~/app/hooks";
import {
    addProductToCartFailed,
    addProductToCartRequest,
    addProductToCartSuccess,
} from "~/app/features/cart/cartReducer";
import { VerticalImageList } from "./VerticalImageList";
import { toast } from "react-toastify";
import { checkoutBrands } from "~/assets/images/brands";
import { ColorProduct, Product, SizeProduct, SubProduct } from "~/types";
import { fetchQuantityAndSoldProductByColorSizeApi } from "~/api/product";
import { WhitelistContext } from "../contexts/WhitelistContext";

const cx = classNames.bind(styles);

export const ProductDetail = ({
    preview,
    favorite = false,
    product,
}: {
    preview?: boolean;
    favorite?: boolean;
    product: Product;
}) => {
    const whitelistCtx = useContext(WhitelistContext);

    const [selectedColor, setSelectedColor] = useState<ColorProduct>(product.colors[0]);
    const [selectedImage, setSelectedImage] = useState<number>(0); // the index of the selected image in a color of the product
    const [quantityBuy, setQuantityBuy] = useState<number>(1);
    const [isWhitelist, setIsWhitelist] = useState<boolean>(favorite);
    const [selectedSize, setSelectedSize] = useState<SizeProduct>(product.sizes[0]);
    const [quantityOfTypeProduct, setQuantityOfTypeProduct] = useState<number>(0);
    const [soldOfTypeProduct, setSoldOfTypeProduct] = useState<number>(0);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchQuantity = async () => {
            const data = await fetchQuantityAndSoldProductByColorSizeApi(
                product?._id,
                selectedSize?._id,
                selectedColor?._id
            );
            setQuantityOfTypeProduct(data?.quantity || 0);
            setSoldOfTypeProduct(data?.sold || 0);
        };

        product._id && fetchQuantity();
    }, [product?._id, selectedColor?._id, selectedSize?._id]);

    const handleAddOneItem = () => {
        setQuantityBuy((prev) => (prev >= 10 ? prev : prev + 1));
    };
    const handleRemoveOneItem = () => {
        setQuantityBuy((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleSelectedColor = (color: ColorProduct) => {
        setSelectedColor(color);
        setSelectedSize(product.sizes[0]); // reset to the first size
        setSelectedImage(0); // reset to the first image
    };

    const handleSelectedSize = (size: SizeProduct) => {
        setSelectedSize(size);
    };

    const handleAddToCard = () => {
        try {
            dispatch(addProductToCartRequest());
            dispatch(
                addProductToCartSuccess({
                    product: { ...product, color: selectedColor, size: selectedSize },
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

    const handleNextImageSlider = useCallback(
        () => setSelectedImage((prev) => (prev === selectedColor?.images.length - 1 ? 0 : prev + 1)),
        [selectedColor?.images.length]
    );
    const handlePreviousImageSlider = useCallback(
        () => setSelectedImage((prev) => (prev === 0 ? selectedColor?.images.length - 1 : prev - 1)),
        [selectedColor?.images.length]
    );

    const handleToggleFavorite = async () => {
        if (isWhitelist) {
            let result = await whitelistCtx?.removeOneFromWhitelist(product._id);
            result && setIsWhitelist(false);
        } else {
            let result = await whitelistCtx?.addNewToWhitelist(product as SubProduct);
            result && setIsWhitelist(true);
        }
    };

    return (
        <Container className={cx("wrapper", "py-5 h-100")}>
            <Row xs={{ cols: 1 }} md={{ cols: 2 }} className="h-100">
                <Col className={preview ? "h-100 d-flex align-items-center" : "h-100"}>
                    {preview ? (
                        <div className="w-100">
                            <ImageSlider
                                handleNextImage={handleNextImageSlider}
                                handlePreviousImage={handlePreviousImageSlider}
                                images={selectedColor?.images}
                                selectedIndexImage={selectedImage}
                            />
                        </div>
                    ) : (
                        <Row className="h-100 d-flex flex-row">
                            <Col lg={2} className="g-0 h-100">
                                <VerticalImageList
                                    active={selectedImage}
                                    images={selectedColor?.images}
                                    onSelectImage={(index: number) => setSelectedImage(index)}
                                />
                            </Col>
                            <Col lg={10} className="h-100">
                                <ImageSlider
                                    handleNextImage={handleNextImageSlider}
                                    handlePreviousImage={handlePreviousImageSlider}
                                    images={selectedColor?.images}
                                    selectedIndexImage={selectedImage}
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
                <Col className="h-100">
                    <div className={cx("content", "px-4 h-100")}>
                        <Row>
                            <Col>
                                <h6 className={cx("name-product")}>{product.name}</h6>
                                <div className={cx("price")}>
                                    <span className={cx("current-price")}>{formatCurrency(priceAfterDiscount)}</span>
                                    {product.discount > 0 && (
                                        <span
                                            className={cx(
                                                "origin-price",
                                                "ms-2 text-danger text-decoration-line-through"
                                            )}>
                                            {formatCurrency(product.price)}
                                        </span>
                                    )}
                                </div>
                            </Col>
                            {!preview && (
                                <Col>
                                    <div className={cx("rating", "d-flex align-items-center justify-content-end")}>
                                        <span className="fw-light">Sold: {product.totalSold}</span>
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
                                {product.sizes?.map((size) => (
                                    <span
                                        key={size._id}
                                        className={cx("size", selectedSize._id === size._id ? "active" : "")}
                                        onClick={() => handleSelectedSize(size)}>
                                        {size.abbreviation}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="pt-2">
                            <span className="me-1">Available: {quantityOfTypeProduct}</span>-
                            <span>Sold: {soldOfTypeProduct}</span>
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
                                                {quantityOfTypeProduct === 0 ? "Out of stock" : "Add to cart"}
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
                                                    onClick={handleToggleFavorite}>
                                                    <IoHeartOutline className={cx("icon", "icon-not-active", "fs-4")} />
                                                    <IoHeartSharp className={cx("icon", "icon-active", "fs-4")} />
                                                </button>
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                </Col>
                                <div className={cx("guaranteed-checkout")}>
                                    <p className="text-uppercase text-black fs-5">guaranteed safe checkout</p>
                                    <img className="w-100" src={checkoutBrands} alt="safe checkout" />
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
        </Container>
    );
};
