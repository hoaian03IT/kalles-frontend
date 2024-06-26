import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { bgBanner1 } from "~/assets/images/background-banner";
import { FilterProduct } from "~/components/FilterProduct";
import { Loading } from "~/components/Loading";
import { Pagination, PaginationItem, PaginationNext, PaginationPrevious } from "~/components/pagination";

import classNames from "classnames/bind";
import styles from "~/styles/ProductScreen.module.scss";

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

type FilterProductStateType = {
    order: number;
    category: string;
    stock: string;
    price: string;
    page: number;
    sex: string;
};

export type FilterProductContextType = {
    filter: FilterProductStateType;
    setFilter: Dispatch<SetStateAction<FilterProductStateType>>;
};

export const ProductScreenContext = createContext<FilterProductContextType | null>(null);

export default function ProductScreen() {
    const { products, loading, pages } = useAppSelector((state) => state.products);

    const { search } = useLocation();

    const query = new URLSearchParams(search);
    const categoryQuery = query.get("category") || "all";
    const orderQuery = Number(query.get("order")) || 0;
    const stockQuery = query.get("stock") || "all";
    const priceQuery = query.get("price") || "all";
    const sexQuery = query.get("sex") || "all";

    const [layout, setLayout] = useState(4); // default is 2 cols per row

    // state filter
    const [filter, setFilter] = useState<FilterProductStateType>({
        order: orderQuery,
        category: categoryQuery,
        stock: stockQuery,
        price: priceQuery,
        page: 1,
        sex: sexQuery,
    });

    // state modals
    const [showOrderProduct, setShowOrderProduct] = useState(false);
    const [showFilterProduct, setShowFilterProduct] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        navigate(
            pathname.product +
                `?order=${orderProducts[filter.order].key}&category=${filter.category}&stock=${filter.stock}&price=${
                    filter.price
                }&sex=${filter.sex}`
        );
        setFilter({ ...filter, page: 1 }); // set lại page 1
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter.category, filter.order, filter.price, filter.stock, navigate, filter.sex]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await fetchListProductApi(
                    `order=${orderProducts[filter.order].key}&category=${filter.category}&stock=${filter.stock}&price=${
                        filter.price
                    }&sex=${filter.sex}&pageSize=${8}&page=${filter.page}`,
                    dispatch
                );
                // close all modals when fetch products successfully
                setShowFilterProduct(false);
                setShowOrderProduct(false);
            } catch (error) {}
        };
        fetchProducts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, filter.page]);

    const handleChangeOrderProduct = (value: number) => {
        setFilter({ ...filter, order: value });
    };

    const handleNextPage = () => {
        setFilter({ ...filter, page: filter.page + 1 });
    };
    const handlePreviousPage = () => {
        setFilter({ ...filter, page: filter.page - 1 });
    };

    const handleFilterPage = (value: number) => {
        setFilter({ ...filter, page: value });
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
                <HeaderBanner img={bgBanner1} title="product" />
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
                                            productId={product._id}
                                            nameProduct={product.name}
                                            previewImages={product.previewImages}
                                            price={product.price}
                                            discount={product.discount}
                                            link={pathname.detailProduct.split(":")[0] + product._id}
                                        />
                                    </Col>
                                ))}
                                <Pagination>
                                    <PaginationPrevious disabled={filter.page === 1} onClick={handlePreviousPage} />
                                    {Array.from(Array(pages).keys()).map((item) => {
                                        const page = item + 1;
                                        return (
                                            <PaginationItem
                                                key={page}
                                                value={page}
                                                isActive={page === filter.page}
                                                onClick={() => handleFilterPage(page)}
                                            />
                                        );
                                    })}
                                    <PaginationNext disabled={filter.page === pages} onClick={handleNextPage} />
                                </Pagination>
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
