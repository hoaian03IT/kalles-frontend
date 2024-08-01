import classNames from "classnames/bind";
import styles from "~/styles/FeatureProducts.module.scss";
import { CardProduct } from "./CardProduct";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { OrderFilterType, SubProduct } from "~/types";
import { fetchFilteredProductApi } from "~/api";
import { Loading } from "./Loading";

const cx = classNames.bind(styles);

const categories: Array<{ label: string; keyFilter: OrderFilterType }> = [
    { label: "best-sellers", keyFilter: "featured" },
    { label: "top-rated", keyFilter: "top-rated" },
    { label: "sales", keyFilter: "sales" },
];

const convertUpperFirstText = (text: string) => {
    let texts = text.split("-");
    let newText = texts.reduce((acc, text) => acc + " " + text[0].toUpperCase() + text.slice(1), "");
    return newText;
};

export default function TrendingProducts() {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [products, setProducts] = useState<SubProduct[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const products = await fetchFilteredProductApi({
                page: 1,
                pageSize: 12,
                order: selectedCategory.keyFilter,
            });
            setProducts(products);
            setLoading(false);
        };
        fetchProducts();
    }, [selectedCategory]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <h2>Trending Products</h2>
            </div>
            <div className={cx("categories")}>
                {categories.map((category, index) => (
                    <button
                        className={cx("btn-category", selectedCategory.label === category.label ? "active" : "")}
                        key={index}
                        onClick={() => setSelectedCategory(category)}>
                        {convertUpperFirstText(category.label)}
                    </button>
                ))}
            </div>
            <Container className={`px-md-5 ${cx("products")}`}>
                {loading ? (
                    <div className="my-5">
                        <Loading />
                    </div>
                ) : (
                    <Row xs={{ cols: 2 }} md={{ cols: 3 }} lg={{ cols: 4 }} className={cx("tab-product", "show")}>
                        {products.map((product) => (
                            <Col key={product._id}>
                                <CardProduct info={product} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
}
