import classNames from "classnames/bind";
import styles from "~/styles/FeatureProducts.module.scss";
import { CardProduct } from "./CardProduct";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";

const cx = classNames.bind(styles);

const categories = ["best-sellers", "top-rated", "sales"];

export default function TrendingProducts() {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const convertUpperFirstText = (text: string) => {
        let texts = text.split("-");
        let newText = texts.reduce((acc, text) => acc + " " + text[0].toUpperCase() + text.slice(1), "");
        return newText;
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <h2>New Arrival Products</h2>
            </div>
            <div className={cx("categories")}>
                {categories.map((category, index) => (
                    <button
                        className={cx("btn-category", selectedCategory === category ? "active" : "")}
                        key={index}
                        onClick={() => setSelectedCategory(category)}>
                        {convertUpperFirstText(category)}
                    </button>
                ))}
            </div>
            <Container fluid className={`px-md-5 ${cx("products")}`}>
                <Row
                    xs={{ cols: 2 }}
                    md={{ cols: 3 }}
                    lg={{ cols: 5 }}
                    className={cx("tab-product", selectedCategory === categories[0] ? "show" : "")}>
                    {[1, 2, 3, 4, 5, 7, 89].map((item) => (
                        <Col key={item}>
                            {/* <CardProduct
                                link="/"
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
                                discount={1}
                                favorite={true}
                            /> */}
                        </Col>
                    ))}
                </Row>
                <Row
                    xs={{ cols: 2 }}
                    md={{ cols: 3 }}
                    lg={{ cols: 5 }}
                    className={cx("tab-product", selectedCategory === categories[1] ? "show" : "")}>
                    {[1, 2, 3, 4].map((item) => (
                        <Col key={item}>
                            {/* <CardProduct
                                link="/"
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
                                discount={1}
                                favorite={true}
                            /> */}
                        </Col>
                    ))}
                </Row>
                <Row
                    xs={{ cols: 2 }}
                    md={{ cols: 3 }}
                    lg={{ cols: 5 }}
                    className={cx("tab-product", selectedCategory === categories[2] ? "show" : "")}>
                    {[1, 2, 3].map((item) => (
                        <Col key={item}>
                            {/* <CardProduct
                                link="/"
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
                                discount={1}
                                favorite={true}
                            /> */}
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
