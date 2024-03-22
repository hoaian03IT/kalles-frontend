import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import { Col, Container, Form, Row } from "react-bootstrap";
import { MdOutlineFilterList } from "react-icons/md";
import { TfiLayoutColumn2Alt, TfiLayoutColumn3Alt, TfiLayoutColumn4Alt } from "react-icons/tfi";
import { HeaderBanner } from "~/components/HeaderBanner";
import { CardProduct } from "~/components/CardProduct";
import { IoMdArrowDropdown } from "react-icons/io";
import { SortProductModal } from "~/components/SortProductModal";
import { fetchListProductApi } from "~/api";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { pathname } from "~/configs/pathname";

import styles from "~/styles/ProductScreen.module.scss";
import { FilterProduct } from "~/components/FilterProduct";
import { Loading } from "~/components/Loading";

const cx = classNames.bind(styles);

const categories = ["Decor", "Denim", "Dress", "Sale", "Shoes", "Men", "Women"];
const orderProducts = [
    {
        label: "A -> Z",
        key: "asc",
    },
    {
        label: "Z -> A",
        key: "desc",
    },
    {
        label: "Best Selling",
        key: "sales",
    },
    {
        label: "Featured",
        key: "featured",
    },
    {
        label: "Price, low to hight",
        key: "lowest",
    },
    {
        label: "Price, high to low",
        key: "highest",
    },
    {
        label: "Newest",
        key: "newest",
    },
];

type FilterProductStateType = { order: number; category: string; stock: string; price: string };

export type FilterProductContextType = {
    filter: FilterProductStateType;
    setFilter: Dispatch<SetStateAction<FilterProductStateType>>;
};

export const ProductScreenContext = createContext<FilterProductContextType | null>(null);

export default function ProductScreen() {
    const { products, loading } = useAppSelector((state) => state.products);

    const { search } = useLocation();

    const query = new URLSearchParams(search);
    const categoryQuery = query.get("category") || "all";
    const orderQuery = Number(query.get("order")) || 0;
    const stockQuery = query.get("stock") || "all";
    const priceQuery = query.get("price") || "all";

    const [layout, setLayout] = useState(4); // default is 2 cols per row

    // state filter
    const [filter, setFilter] = useState<FilterProductStateType>({
        order: orderQuery,
        category: categoryQuery,
        stock: stockQuery,
        price: priceQuery,
    });

    // state modals
    const [showOrderProduct, setShowOrderProduct] = useState(false);
    const [showFilterProduct, setShowFilterProduct] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await fetchListProductApi(
                    `order=${orderProducts[filter.order].key}&category=${filter.category}&stock=${filter.stock}&price=${
                        filter.price
                    }&pageSize=${4}`,
                    dispatch
                );
                // close all modals when fetch products successfully
                setShowFilterProduct(false);
                setShowOrderProduct(false);
            } catch (error) {}
        };
        fetchProducts();
    }, [dispatch, filter.category, filter.order, filter.price, filter.stock]);

    const handleChangeOrderProduct = (value: number) => {
        setFilter({ ...filter, order: value });
    };

    return (
        <ProductScreenContext.Provider value={{ filter, setFilter }}>
            <div className={cx("wrapper")}>
                <div className="d-flex align-items-center justify-content-center w-100 overflow-x-auto">
                    {categories.map((item, index) => (
                        <Link to="/" key={index} className={cx("category")}>
                            <h6 className={cx("title")}>{item}</h6>
                        </Link>
                    ))}
                </div>
                <HeaderBanner
                    img="https://demo-kalles-4-3.myshopify.com/cdn/shop/files/shop-banner_1296x_01f220ac-becc-43e3-b2cc-9f6d90b92a94.jpg"
                    title="product"
                />
                <Container className="my-4">
                    <div className={cx("actions")}>
                        <Row xs={{ cols: 3 }}>
                            <Col className={cx("filter", "justify-content-start")}>
                                <button onClick={() => setShowFilterProduct(true)}>
                                    <MdOutlineFilterList className="fs-5" />
                                    <span>Filter</span>
                                </button>
                            </Col>
                            <Col className={cx("layouts", "justify-content-center")}>
                                <button
                                    className={cx("layout-button", layout === 2 ? "active" : "")}
                                    onClick={() => setLayout(2)}>
                                    <TfiLayoutColumn2Alt className="fs-4" />
                                </button>
                                <button
                                    className={cx("layout-button", layout === 3 ? "active" : "")}
                                    onClick={() => setLayout(3)}>
                                    <TfiLayoutColumn3Alt className="fs-4" />
                                </button>
                                <button
                                    className={cx("layout-button", layout === 4 ? "active" : "")}
                                    onClick={() => setLayout(4)}>
                                    <TfiLayoutColumn4Alt className="fs-4" />
                                </button>
                            </Col>
                            <Col className={cx("ordered", "d-flex justify-content-end")}>
                                <Form.Select
                                    className={cx("selected")}
                                    value={filter.order}
                                    onChange={(e) => setFilter({ ...filter, order: Number(e.target.value) })}>
                                    {orderProducts.map((order, index) => (
                                        <option key={order.key} value={index}>
                                            {order.label}
                                        </option>
                                    ))}
                                </Form.Select>
                                <button
                                    className={cx("selected-mobile", "align-items-center")}
                                    onClick={() => setShowOrderProduct(true)}>
                                    <span>Sort</span>
                                    <IoMdArrowDropdown />
                                </button>
                            </Col>
                        </Row>
                    </div>
                    <div className={cx("products")}>
                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <Loading />
                            </div>
                        ) : products.length > 0 ? (
                            <Row xs={{ cols: layout }}>
                                {products.map((product) => (
                                    <Col key={product._id}>
                                        <CardProduct
                                            nameProduct={product.name}
                                            previewImages={product.previewImages}
                                            price={product.price}
                                            discount={product.discount}
                                            link={pathname.detailProduct.split(":")[0] + product._id}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <div className="text-center my-5">
                                <p className="fs-1 text-black-50">Sorry! Current we don't have products</p>
                            </div>
                        )}
                    </div>
                </Container>
                <FilterProduct show={showFilterProduct} onHide={() => setShowFilterProduct(false)} />
                <SortProductModal
                    orders={orderProducts}
                    current={filter.order}
                    onSelected={handleChangeOrderProduct}
                    show={showOrderProduct}
                    onHide={() => setShowOrderProduct(false)}
                />
            </div>
        </ProductScreenContext.Provider>
    );
}
