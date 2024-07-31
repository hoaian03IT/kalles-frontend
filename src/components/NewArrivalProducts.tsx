import classNames from "classnames/bind";
import styles from "~/styles/FeatureProducts.module.scss";
import { CardProduct } from "./CardProduct";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaArrowDownLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { SubProduct } from "~/types";
import { fetchNewArrivalProductApi } from "~/api/product";
import { pathname } from "~/configs/pathname";
import { BsHandIndexFill } from "react-icons/bs";
import { useMediaQueries } from "~/hooks";

const cx = classNames.bind(styles);

export default function NewArrivalProducts() {
    const [products, setProducts] = useState<Array<SubProduct>>([]);
    const [quantityProductShown, setQuantityProductShown] = useState<{ showMore: boolean; number: number }>({
        showMore: false,
        number: 8,
    });
    const deviceType = useMediaQueries();

    useEffect(() => {
        const fetchNewArrivalProducts = async () => {
            const products = await fetchNewArrivalProductApi();
            setProducts(products);
        };

        fetchNewArrivalProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!quantityProductShown.showMore) {
            let number = deviceType === "mobile" ? 4 : deviceType === "tablet" ? 6 : 8;
            setQuantityProductShown((prev) => ({ ...prev, number: number }));
        } else {
            setQuantityProductShown((prev) => ({ ...prev, number: quantityProductShown.number * 2 }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deviceType]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <h2>New Arrival Products</h2>
            </div>
            <Container className="px-md-5 text-center">
                <Row xs={{ cols: 2 }} md={{ cols: 3 }} lg={{ cols: 4 }} className="justify-content-center">
                    {products.slice(0, quantityProductShown.number).map((product, index) => (
                        <Col key={index}>
                            <CardProduct
                                link={pathname.detailProduct.split(":")[0] + product._id}
                                nameProduct={product.name}
                                previewImages={product.previewImages}
                                price={product.price}
                                productId={product._id}
                                discount={product.discount}
                            />
                        </Col>
                    ))}
                </Row>
                {!quantityProductShown.showMore && (
                    <Button
                        className="btn-size-lg mt-5 btn-round-border"
                        onClick={() => setQuantityProductShown((prev) => ({ ...prev, showMore: true }))}>
                        Load More <FaArrowDownLong />
                    </Button>
                )}
            </Container>
        </div>
    );
}
