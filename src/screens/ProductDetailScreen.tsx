import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchProductDetailApi } from "~/api";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { BreadCrumb } from "~/components/BreadCrumb";
import { Loading } from "~/components/Loading";
import { DescriptionAndReview } from "~/components/productDetail/DescriptionAndReview";
import { ProductDetail } from "~/components/productDetail/ProductDetail";
import { pathname } from "~/configs/pathname";
import { fetchSuggestedProductApi } from "~/api/product";

import classNames from "classnames/bind";
import styles from "~/styles/ProductDetailScreen.module.scss";
import { CardProduct } from "~/components/CardProduct";
import { Product } from "~/types";
const cx = classNames.bind(styles);

export default function ProductDetailScreen() {
    const { product, loading } = useAppSelector((state) => state.product);
    const [suggestedProduct, setSuggestedProduct] = useState<Array<Product>>([]);

    const { id: productId = "" } = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            await fetchProductDetailApi(productId, dispatch);
        };
        fetchProduct();
    }, [productId, dispatch]);

    useEffect(() => {
        const fetchSuggestedProduct = async (categoryId: string) => {
            const resData = await fetchSuggestedProductApi(categoryId);
            setSuggestedProduct(resData.products);
        };

        if (product.category._id) fetchSuggestedProduct(product.category._id);
    }, [product.category._id]);

    return (
        <div className={cx("wrapper")}>
            <BreadCrumb
                links={[
                    { label: "Home", value: "/", isCurrent: false },
                    {
                        label: product.category?.name || "",
                        value: pathname.product + `?category=${product.category._id}`,
                        isCurrent: false,
                    },
                    { label: product.name, value: pathname.detailProduct.split(":")[0] + product._id, isCurrent: true },
                ]}
            />
            <div className={cx("detail-product")}>{loading ? <Loading /> : <ProductDetail product={product} />}</div>
            <div className={cx("description-reviews-part")}>
                <Container>
                    <DescriptionAndReview />
                </Container>
            </div>
            <div className={cx("suggested-products", "py-4")}>
                <Container>
                    <p className="text-center fs-3 mb-0">You may also like</p>
                    <Row md={{ cols: 6 }} className="overflow-hidden flex-nowrap">
                        {suggestedProduct?.map((product) => (
                            <Col key={product._id}>
                                <CardProduct info={product} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
}
