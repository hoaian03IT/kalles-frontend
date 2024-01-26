import classNames from "classnames/bind";
import { Banner } from "~/components/Banner";
import { lazy } from "react";
import { LazyReact } from "~/components/LazyReact";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { GoArrowRight } from "react-icons/go";
import { IoCarOutline, IoDiamondOutline, IoGiftOutline } from "react-icons/io5";

import styles from "~/styles/HomeScreen.module.scss";

const ShopCollections = lazy(() => import("~/components/ShopCollections"));
const NewArrivalProducts = lazy(() => import("~/components/NewArrivalProducts"));
const TrendingProducts = lazy(() => import("~/components/TrendingProducts"));

const cx = classNames.bind(styles);

const moreData = [
    {
        Icon: IoCarOutline,
        title: "safe shipping",
        description: "Whether it's a sofa or a sheet set, delivery's on the house.",
    },
    {
        Icon: IoDiamondOutline,
        title: "premium design",
        description: "Shop zillions of finds, with new arrivals added daily.",
    },
    {
        Icon: IoGiftOutline,
        title: "beautiful gift wrapping",
        description: "Use the Credit Card to save on your first order over $250.",
    },
];

export default function HomeScreen() {
    return (
        <div className={cx("wrapper")}>
            <Banner />
            <LazyReact>
                <ShopCollections />
            </LazyReact>
            <LazyReact>
                <NewArrivalProducts />
            </LazyReact>
            <Container className={cx("look-book-collections")}>
                <Row xs={{ cols: 1 }} xl={{ cols: 2 }}>
                    <Col className={cx("content")}>
                        <h1>LOOKBOOK COLLECTIONS</h1>
                        <article className="text-black-50 fw-light">
                            Cepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                            id est laborum. consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
                            accumsan
                        </article>
                        <Button className="btn-size-lg">
                            <span>Shop now</span>
                            <GoArrowRight className="ms-2" />
                        </Button>
                    </Col>
                    <Col sx className={cx("images")}>
                        <Image loading="lazy" src="https://demo-kalles-4-3.myshopify.com/cdn/shop/files/image-3.png" />
                        <Image loading="lazy" src="https://demo-kalles-4-3.myshopify.com/cdn/shop/files/image-2.png" />
                        <Image loading="lazy" src="https://demo-kalles-4-3.myshopify.com/cdn/shop/files/image-1.png" />
                    </Col>
                </Row>
            </Container>
            <LazyReact>
                <TrendingProducts />
            </LazyReact>
            <Container>
                <Row xs={{ cols: 1 }} md={{ cols: 3 }}>
                    {moreData.map((item, index) => {
                        const { Icon, description, title } = item;
                        return (
                            <Col key={index} className="text-center">
                                <Icon className="fs-1" />
                                <h5 className="text-uppercase my-3">{title}</h5>
                                <p className="fs-6 text-black-50 fw-light">{description}</p>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}
