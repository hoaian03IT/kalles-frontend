import classNames from "classnames/bind";
import { Carousel, CarouselItem, Col, OverlayTrigger, Popover, PopoverBody, Row, Tooltip } from "react-bootstrap";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import styles from "~/styles/ProductDetail.module.scss";
import { formatCurrencyVND } from "~/utils";
import { QuantityEditor } from "./QuantityEditor";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { SocialNetworks } from "./SocialNetWorks";
import listSafeCheckout from "~/assets/images/list-safe-checkout.png";
import { ColorProduct, FeedBackProduct, SizeProduct } from "~/app/features/products/productReducer";
import { Category } from "~/app/features/category/categoryReducer";
import { pathname } from "~/configs/pathname";

const cx = classNames.bind(styles);

type Props = {
    images: string[];
    nameProduct: string;
    price: number;
    discount: number;
    description: string;
    stock: number;
    colors: Array<ColorProduct>;
    sold: number;
    sex: string;
    feedback: Array<FeedBackProduct>;
    category: Category;
};

const PrevControl = ({ onClick }: { onClick: () => void }) => (
    <div className={cx("control-icon")} onClick={onClick}>
        <IoIosArrowBack className={cx("icon")} />
    </div>
);

const NextControl = ({ onClick }: { onClick: () => void }) => (
    <div className={cx("control-icon")} onClick={onClick}>
        <IoIosArrowForward className={cx("icon")} />
    </div>
);

export const ProductDetail = ({
    images,
    nameProduct,
    price,
    description,
    discount,
    stock,
    category,
    colors,
    feedback,
    sex,
    sold,
}: Props) => {
    const [quantityBuy, setQuantityBuy] = useState<number>(1);
    const [isWhitelist, setIsWhitelist] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<ColorProduct>(colors[0]);
    const [selectedSize, setSelectedSize] = useState<SizeProduct>(selectedColor?.sizes[0]);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [listImages, setListImages] = useState<Array<string>>([]);

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

    const priceAfterDiscount = discount > 0 ? price - price * discount : price;
    return (
        <div className={cx("wrapper", "w-100 h-100")}>
            <Row xs={{ cols: 1 }} md={{ cols: 2 }}>
                <Col>
                    <Row>
                        <Col lg={2}>
                            {listImages.map((image, index) => (
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
                            <Carousel
                                className={cx("carousel")}
                                fade={true}
                                prevIcon={
                                    <PrevControl
                                        onClick={() =>
                                            setSelectedImage((prev) => (prev === 0 ? listImages.length - 1 : prev - 1))
                                        }
                                    />
                                }
                                nextIcon={
                                    <NextControl
                                        onClick={() =>
                                            setSelectedImage((prev) => (prev === listImages.length - 1 ? 0 : prev + 1))
                                        }
                                    />
                                }
                                activeIndex={selectedImage}>
                                {listImages.map((img, index) => (
                                    <CarouselItem key={index}>
                                        <img
                                            loading="eager"
                                            draggable={false}
                                            className={cx("img", "w-100")}
                                            src={img}
                                            alt=""
                                        />
                                    </CarouselItem>
                                ))}
                            </Carousel>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <div className={cx("content", "px-4")}>
                        <h6 className={cx("name-product")}>{nameProduct}</h6>
                        <div className={cx("price")}>
                            <span className={cx("current-price")}>{formatCurrencyVND(priceAfterDiscount)}</span>
                            {discount > 0 && (
                                <span className={cx("origin-price", "ms-2 text-danger text-decoration-line-through")}>
                                    {formatCurrencyVND(price)}
                                </span>
                            )}
                        </div>
                        <p className={cx("description", "text-black-50 mt-4 limit-line-4")}>{description}</p>
                        <div className={cx("color-product")}>
                            <h6 className={cx("label", "fw-normal text-uppercase")}>Color: {selectedColor?.name}</h6>
                            <div className={cx("colors")}>
                                {colors.map((color) => (
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
                                    <Row>
                                        <Col xs={8}>
                                            <button className={cx("btn-buy", "w-100")}>
                                                {stock === 0 ? "Out of stock" : "Add to cart"}
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
                                        <span>{stock > 0 ? `In Stock (${stock})` : "Out Stock"}</span>
                                    </div>
                                    <div className="fw-light">
                                        <span className="text-black-50">Categories:&nbsp;</span>
                                        <span>
                                            <Link to={pathname.product + `?category=${category._id}`}>
                                                {category.name}
                                            </Link>
                                            ,&nbsp;
                                            <Link to={pathname.product + `?category=${category._id}`}>
                                                {sex[0].toUpperCase() + sex.slice(1, sex.length)}
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
