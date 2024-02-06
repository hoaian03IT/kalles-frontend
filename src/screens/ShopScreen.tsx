import classNames from "classnames/bind";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HeaderBanner } from "~/components/HeaderBanner";

import styles from "~/styles/ShopScreen.module.scss";

const cx = classNames.bind(styles);

const collectionShop = [
    { img: "https://demo-kalles-4-3.myshopify.com/cdn/shop/files/cat-01.jpg", name: "Women", link: "/" },
    { img: "https://demo-kalles-4-3.myshopify.com/cdn/shop/files/cat-02.jpg", name: "Men", link: "/" },
    { img: "https://demo-kalles-4-3.myshopify.com/cdn/shop/files/cat-03.jpg", name: "Accessories", link: "/" },
    { img: "https://demo-kalles-4-3.myshopify.com/cdn/shop/files/cat-04.jpg", name: "Footwear", link: "/" },
    { img: "https://demo-kalles-4-3.myshopify.com/cdn/shop/files/cat-05.jpg", name: "Tops", link: "/" },
    { img: "https://demo-kalles-4-3.myshopify.com/cdn/shop/files/cat-06.jpg", name: "Sale", link: "/" },
];

export default function ShopScreen() {
    return (
        <div>
            <HeaderBanner
                img="https://demo-kalles-4-3.myshopify.com/cdn/shop/files/shop-banner_1296x_266a9d0e-ecdd-48d6-a592-5279374199a9.jpg"
                title="Shop"
            />
            <Container className="mt-4 mb-5">
                <Row xs={{ cols: 2 }} md={{ cols: 3 }}>
                    {collectionShop.map((item, index) => (
                        <Col key={index} className="mt-4">
                            <Link to={item.link} className={cx("shop-item")}>
                                <img draggable={false} className={cx("img")} src={item.img} alt={item.name} />
                                <Button variant="secondary" className={cx("action-btn")}>
                                    {item.name}
                                </Button>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
