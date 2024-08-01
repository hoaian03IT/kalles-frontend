import classNames from "classnames/bind";
import styles from "~/styles/FeatureProducts.module.scss";
import { CardProduct } from "./CardProduct";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaArrowDownLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { ProductFilterType, SubProduct } from "~/types";
import { fetchFilteredProductApi } from "~/api/product";
import { pathname } from "~/configs/pathname";
import { useMediaQueries } from "~/hooks";
import { Loading } from "./Loading";

const cx = classNames.bind(styles);

export default function NewArrivalProducts() {
    const [products, setProducts] = useState<Array<SubProduct>>([]);
    const [quantityProductShown, setQuantityProductShown] = useState<{ showMore: boolean; number: number }>({
        showMore: false,
        number: 8,
    });
    const [loading, setLoading] = useState(false);

    const deviceType = useMediaQueries();

    useEffect(() => {
        const fetchNewArrivalProducts = async () => {
            setLoading(true);
            let filter: ProductFilterType = {
                order: "newest",
                page: 1,
                pageSize: 12,
            };
            const products = await fetchFilteredProductApi(filter);
            setProducts(products);
            setLoading(false);
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
                {loading ? (
                    <div className="my-5">
                        <Loading />
                    </div>
                ) : (
                    <>
                        <Row xs={{ cols: 2 }} md={{ cols: 3 }} lg={{ cols: 4 }} className="justify-content-center">
                            {products.slice(0, quantityProductShown.number).map((product) => (
                                <Col key={product._id}>
                                    <CardProduct info={product} />
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
                    </>
                )}
            </Container>
        </div>
    );
}
