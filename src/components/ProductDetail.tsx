import classNames from "classnames/bind";
import { Carousel, CarouselItem, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import styles from "~/styles/ProductDetail.module.scss";
import { formatCurrencyVND } from "~/utils";
import { QuantityEditor } from "./QuantityEditor";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useState } from "react";
import { SocialNetworks } from "./SocialNetWorks";
import listSafeCheckout from "~/assets/images/list-safe-checkout.png";

const cx = classNames.bind(styles);

type Props = {
    images: string[];
    nameProduct: string;
    price: number;
    discount: number;
    description: string;
    remainQuantity: number;
    whitelist: boolean;
};

export const ProductDetail = ({
    images,
    nameProduct,
    price,
    description,
    discount,
    remainQuantity,
    whitelist,
}: Props) => {
    const [quantityBuy, setQuantityBuy] = useState(1);
    const [isWhitelist, setIsWhitelist] = useState(whitelist);

    const handleAddOneItem = () => {
        setQuantityBuy((prev) => (prev >= 10 ? prev : prev + 1));
    };
    const handleRemoveOneItem = () => {
        setQuantityBuy((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const priceAfterDiscount = discount > 0 ? price - price * discount : price;
    return (
        <div className={cx("wrapper", "w-100 h-100")}>
            <Row xs={{ cols: 1 }} md={{ cols: 2 }} className="g-0">
                <Col>
                    <Carousel
                        className={cx("carousel")}
                        fade={true}
                        prevIcon={
                            <div className={cx("control-icon")}>
                                <IoIosArrowBack className={cx("icon")} />
                            </div>
                        }
                        nextIcon={
                            <div className={cx("control-icon")}>
                                <IoIosArrowForward className={cx("icon")} />
                            </div>
                        }>
                        {images.map((img, index) => (
                            <CarouselItem key={index}>
                                <img draggable={false} className={cx("img", "w-100")} src={img} alt="" />
                            </CarouselItem>
                        ))}
                    </Carousel>
                </Col>
                <Col>
                    <div className={cx("content", "p-4")}>
                        <Link className={cx("name-product")} to="/">
                            {nameProduct}
                        </Link>
                        <div className={cx("price")}>
                            <span className={cx("current-price")}>{formatCurrencyVND(priceAfterDiscount)}</span>
                            {discount > 0 && (
                                <span className={cx("origin-price", "ms-2 text-danger text-decoration-line-through")}>
                                    {formatCurrencyVND(price)}
                                </span>
                            )}
                        </div>
                        <article className={cx("description", "text-black-50 mt-4 limit-line-4")}>
                            {description}
                        </article>
                        <div className="d-flex align-items-center">
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
                                                {remainQuantity === 0 ? "Out of stock" : "Add to cart"}
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
