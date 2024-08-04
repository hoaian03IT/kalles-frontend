import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import { MdOutlineFilterList } from "react-icons/md";
import { TfiLayoutColumn2Alt, TfiLayoutColumn3Alt, TfiLayoutColumn4Alt } from "react-icons/tfi";
import { HeaderBanner } from "~/components/HeaderBanner";
import { CardProduct } from "~/components/CardProduct";
import { IoMdArrowDropdown } from "react-icons/io";
import { SortProductModal } from "~/components/SortProductModal";
import { fetchFilteredProductApi } from "~/api";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { pathname } from "~/configs/pathname";
import { bgBanner1 } from "~/assets/images/background-banner";
import { FilterProduct } from "~/components/FilterProduct";
import { Loading } from "~/components/Loading";
import { Pagination, PaginationItem, PaginationNext, PaginationPrevious } from "~/components/pagination";

import classNames from "classnames/bind";
import styles from "~/styles/screens/ProductScreen.module.scss";
import { ProductFilterType, OrderFilterType, StockFilterType, PriceFilterType, SexFilterType } from "~/types";
import { useMediaQueries } from "~/hooks";
import { ChangeLayoutProductBtns } from "~/components/ChangeLayoutProductBtns";

const cx = classNames.bind(styles);

const NUMBER_PRODUCTS_PER_PAGE = 8;
const orderProducts: Array<{ label: string; key: OrderFilterType }> = [
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

type ProductsPerRow = 2 | 3 | 4;

export type FilterProductContextType = {
    filter: ProductFilterType;
    setFilter: Dispatch<SetStateAction<ProductFilterType>>;
};

export const ProductScreenContext = createContext<FilterProductContextType | null>(null);

export default function ProductScreen() {
    const { products, loading, pages } = useAppSelector((state) => state.products);
    const { categories } = useAppSelector((state) => state.persist.category);

    const { search } = useLocation();
    const query = new URLSearchParams(search);

    const categoryQuery = query.get("category") as string;
    const orderQuery = query.get("order") as OrderFilterType;
    const stockQuery = query.get("stock") as StockFilterType;
    const priceQuery = query.get("price") as PriceFilterType;
    const sexQuery = query.get("sex") as SexFilterType;
    const pageQuery = Number(query.get("page")) || 1;

    // state filter
    const [filter, setFilter] = useState<ProductFilterType>({
        order: orderQuery,
        category: categoryQuery,
        stock: stockQuery,
        price: priceQuery,
        page: pageQuery,
        sex: sexQuery,
        pageSize: NUMBER_PRODUCTS_PER_PAGE,
    });

    const [layout, setLayout] = useState<ProductsPerRow>(4); // default is 4 cols per row

    // state modals
    const [showOrderProduct, setShowOrderProduct] = useState(false);
    const [showFilterProduct, setShowFilterProduct] = useState(false);

    const deviceType = useMediaQueries();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (deviceType === "mobile") {
            setLayout(2);
        }
    }, [deviceType]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await fetchFilteredProductApi(
                    {
                        order: filter.order,
                        category: filter.category,
                        stock: filter.stock,
                        price: filter.price,
                        sex: filter.sex,
                        pageSize: filter.pageSize,
                        page: filter.page,
                    },
                    dispatch
                );
                // close all modals when fetch products successfully
                setShowFilterProduct(false);
                setShowOrderProduct(false);
            } catch (error) {}
        };
        fetchProducts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, filter]);

    const handleChangeOrderProduct = (value: OrderFilterType) => {
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
                        <Link
                            to={pathname.product + `?category=${item._id}`}
                            onClick={() => setFilter((prev) => ({ ...prev, category: item._id }))}
                            key={index}
                            className={cx("category")}>
                            <h6 className={cx("title")}>{item.name}</h6>
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
                            <Col>
                                <ChangeLayoutProductBtns layout={layout} setLayout={setLayout} />
                            </Col>
                            <Col className={cx("ordered", "d-flex justify-content-end")}>
                                <Form.Select
                                    className={cx("selected")}
                                    value={filter.order}
                                    onChange={(e) =>
                                        setFilter({ ...filter, order: e.target.value as OrderFilterType })
                                    }>
                                    {orderProducts.map((order, index) => (
                                        <option key={order.key} value={order.key}>
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
                                        <CardProduct info={product} />
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
                                <p className="fs-1 text-black-50">Sorry! Currently we don't have products</p>
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
