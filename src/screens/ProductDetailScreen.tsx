import classNames from "classnames/bind";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchProductDetailApi } from "~/api";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { BreadCrumb } from "~/components/BreadCrumb";
import { Loading } from "~/components/Loading";
import { ProductDetail } from "~/components/ProductDetail";
import { pathname } from "~/configs/pathname";
import styles from "~/styles/ProductDetailScreen.module.scss";
const cx = classNames.bind(styles);

export default function ProductDetailScreen() {
    const { product, loading } = useAppSelector((state) => state.product);

    const { id: idProduct = "" } = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            await fetchProductDetailApi(idProduct, dispatch);
        };
        fetchProduct();
    }, [idProduct, dispatch]);

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
            <Container className="p-4">
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
                        feedback={product.feedback}
                        sex={product.sex}
                        sold={product.sold}
                    />
                )}
            </Container>
        </div>
    );
}
