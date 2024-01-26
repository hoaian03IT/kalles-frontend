import classNames from "classnames/bind";
import styles from "~/styles/FeatureProducts.module.scss";
import { CardProduct } from "./CardProduct";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaArrowDownLong } from "react-icons/fa6";

const cx = classNames.bind(styles);

export default function NewArrivalProducts() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <h2>New Arrival Products</h2>
            </div>
            <Container fluid className="5 px-md-5 text-center">
                <Row xs={{ cols: 2 }} md={{ cols: 3 }} lg={{ cols: 5 }} className="justify-content-center">
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
                            discount={1}
                            favorite={true}
                        />
                    </Col>
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
                            discount={1}
                            favorite={true}
                        />
                    </Col>
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
                            discount={1}
                            favorite={true}
                        />
                    </Col>
                </Row>
                <Button className="btn-size-lg mt-5">
                    Load More <FaArrowDownLong />
                </Button>
            </Container>
        </div>
    );
}
