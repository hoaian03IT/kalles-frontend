import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HeaderBanner } from "~/components/HeaderBanner";
import { bgBanner1 } from "~/assets/images/background-banner";
import { img1, img2, img3, img4, img5, img6 } from "~/assets/images/shop-screen";

import classNames from "classnames/bind";
import styles from "~/styles/screens/ShopScreen.module.scss";
import { pathname } from "~/configs/pathname";

const cx = classNames.bind(styles);

const collectionShop = [
    { img: img1, name: "Women", link: `${pathname.product}?sex=women` },
    { img: img2, name: "Men", link: `${pathname.product}?sex=men` },
    { img: img3, name: "Accessories", link: pathname.product },
    { img: img4, name: "Footwear", link: pathname.product },
    { img: img5, name: "Tops", link: pathname.product },
    { img: img6, name: "Sale", link: pathname.product },
];

export default function ShopScreen() {
    return (
        <div>
            <HeaderBanner img={bgBanner1} title="Shop" />
            <Container className="mt-4 mb-5">
                <Row xs={{ cols: 2 }} md={{ cols: 3 }}>
                    {collectionShop.map((item, index) => (
                        <Col key={index} className="mt-4">
                            <Link to={item.link} className={cx("shop-item")}>
                                <img
                                    loading="eager"
                                    draggable={false}
                                    className={cx("img")}
                                    src={item.img}
                                    alt={item.name}
                                />
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
