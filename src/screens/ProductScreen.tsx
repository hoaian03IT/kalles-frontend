import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { MdOutlineFilterList } from "react-icons/md";
import { TfiLayoutColumn2Alt, TfiLayoutColumn3Alt, TfiLayoutColumn4Alt } from "react-icons/tfi";

import { HeaderBanner } from "~/components/HeaderBanner";
import { CardProduct } from "~/components/CardProduct";
import { IoMdArrowDropdown } from "react-icons/io";
import { SortProductModal } from "~/components/SortProductModal";
import { ProductDetail } from "~/components/ProductDetail";

import styles from "~/styles/ProductScreen.module.scss";

const cx = classNames.bind(styles);

const categories = ["Decor", "Denim", "Dress", "Sale", "Shoes", "Men", "Women"];
const orderProducts = ["featured", "best selling", "a-z", "z-a", "price, low to hight", "price, hight to low"];

export default function ProductScreen() {
    const [orderProductSelected, setOrderProductSelected] = useState(orderProducts[0]);
    const [layout, setLayout] = useState(2); // default is 2 cols per row
    const [showOrderProduct, setShowOrderProduct] = useState(false);

    const handleChangeOrderProduct = (value: string) => {
        setOrderProductSelected(value);
    };

    useEffect(() => {
        console.log(orderProductSelected);
    }, [orderProductSelected]);

    return (
        <div className={cx("wrapper")}>
            <div className="d-flex align-items-center justify-content-center w-100 overflow-x-auto">
                {categories.map((item, index) => (
                    <Link to="/" key={index} className={cx("category")}>
                        <h6 className={cx("title")}>{item}</h6>
                    </Link>
                ))}
            </div>
            <HeaderBanner
                img="https://demo-kalles-4-3.myshopify.com/cdn/shop/files/shop-banner_1296x_01f220ac-becc-43e3-b2cc-9f6d90b92a94.jpg"
                title="product"
            />
            <Container className="my-4">
                <div className={cx("actions")}>
                    <Row xs={{ cols: 3 }}>
                        <Col className={cx("filter", "justify-content-start")}>
                            <MdOutlineFilterList className="fs-5" />
                            <span>Filter</span>
                        </Col>
                        <Col className={cx("layouts", "justify-content-center")}>
                            <button
                                className={cx("layout-button", layout === 2 ? "active" : "")}
                                onClick={() => setLayout(2)}>
                                <TfiLayoutColumn2Alt className="fs-4" />
                            </button>
                            <button
                                className={cx("layout-button", layout === 3 ? "active" : "")}
                                onClick={() => setLayout(3)}>
                                <TfiLayoutColumn3Alt className="fs-4" />
                            </button>
                            <button
                                className={cx("layout-button", layout === 4 ? "active" : "")}
                                onClick={() => setLayout(4)}>
                                <TfiLayoutColumn4Alt className="fs-4" />
                            </button>
                        </Col>
                        <Col className={cx("ordered", "d-flex justify-content-end")}>
                            <Form.Select
                                className={cx("selected")}
                                value={orderProductSelected}
                                onChange={(e) => handleChangeOrderProduct(e.target.value)}>
                                {orderProducts.map((order, index) => (
                                    <option key={index} value={order}>
                                        {order[0].toUpperCase() + order.slice(1)}
                                    </option>
                                ))}
                            </Form.Select>
                            <button
                                className={cx("selected-mobile", "align-items-center")}
                                onClick={() => setShowOrderProduct(true)}>
                                <span>Sort</span>
                                <IoMdArrowDropdown />
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className={cx("products")}>
                    <Row xs={{ cols: layout }}>
                        <Col>
                            <CardProduct
                                nameProduct="Minimalist Croc Embossed Baguette Bag"
                                types={[
                                    {
                                        id: "brown",
                                        image1: "https://demo-kalles-4-3.myshopify.com/cdn/shop/products/66649955_070_d.jpg",
                                        image2: "https://demo-kalles-4-3.myshopify.com/cdn/shop/products/66649955_070_b.jpg",
                                    },
                                    {
                                        id: "red",
                                        image1: "https://demo-kalles-4-3.myshopify.com/cdn/shop/products/63733695_220_b_96a804e9-eaf0-44e7-a652-e4bf7bf36978.jpg",
                                        image2: "https://demo-kalles-4-3.myshopify.com/cdn/shop/products/66649955_070_b.jpg",
                                    },
                                ]}
                                price={3000000}
                                // discount={1}
                                favorite={false}
                                link="/"
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
            <SortProductModal
                orders={orderProducts}
                current={orderProductSelected}
                onSelected={handleChangeOrderProduct}
                show={showOrderProduct}
                onHide={() => setShowOrderProduct(false)}
            />
        </div>
    );
}
