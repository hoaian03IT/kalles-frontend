import classNames from "classnames/bind";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchProductDetailApi } from "~/api";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { BreadCrumb } from "~/components/BreadCrumb";
import { Loading } from "~/components/Loading";
import { DescriptionAndReview } from "~/components/productDetail/DescriptionAndReview";
import { ProductDetail } from "~/components/productDetail/ProductDetail";
import { pathname } from "~/configs/pathname";
import styles from "~/styles/ProductDetailScreen.module.scss";
const cx = classNames.bind(styles);

export default function ProductDetailScreen() {
    const { product, loading } = useAppSelector((state) => state.product);

    const { id: productId = "" } = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            await fetchProductDetailApi(productId, dispatch);
        };
        fetchProduct();
    }, [productId, dispatch]);

    return (
        <div className={cx("wrapper")}>
            <BreadCrumb
                links={[
                    { label: "Home", value: "/", isCurrent: false },
                    {
                        label: product.category.name,
                        value: pathname.product + `?category=${product.category._id}`,
                        isCurrent: false,
                    },
                    { label: product.name, value: pathname.detailProduct.split(":")[0] + product._id, isCurrent: true },
                ]}
            />
            <div className="py-5">
                <Container>
                    {loading ? (
                        <Loading />
                    ) : (
                        <ProductDetail
                            description={product.description}
                            discount={product.discount}
                            images={product.previewImages}
                            nameProduct={product.name}
                            price={product.price}
                            stock={product.stock}
                            category={product.category}
                            colors={product.colors}
                            sex={product.sex}
                            sold={product.sold}
                            rate={product.rate}
                        />
                    )}
                </Container>
            </div>
            <div className={cx("description-reviews-part")}>
                <Container>
                    <DescriptionAndReview />
                </Container>
            </div>
        </div>
    );
}
