import { useEffect, useId, useState } from "react";
import { CustomOffCanvas } from "./CustomOffCanvas";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import classNames from "classnames/bind";
import { CiSearch } from "react-icons/ci";

import styles from "~/styles/components/SearchSlide.module.scss";
import { ItemCardProduct } from "../cart/ItemCartProduct";
import { useAppSelector } from "~/app/hooks";
import { useDebounce } from "~/hooks";
import axios from "axios";
import { formatCurrency } from "~/utils";
import { Link } from "react-router-dom";
import { pathname } from "~/configs/pathname";
import { Product } from "~/types";

type Props = {
    show: boolean;
    onHide: () => void;
};

const cx = classNames.bind(styles);

// const categories = ["All Categories", "Accessories", "Arts & Entertainments", "Bag"];
const searchItems = [
    {
        id: 0,
        image: "https://cdn.shopify.com/s/files/1/0641/8690/8910/products/hatta3044814a9b_1637360792172_2-0._QL90_1703d3a7-3b28-4599-b389-84e123169139.jpg",
        nameProduct: "Hat Attack Selena Bag",
        path: "/",
        quantity: 2,
        price: 200000,
    },
    {
        id: 1,
        image: "https://cdn.shopify.com/s/files/1/0641/8690/8910/products/hatta3044814a9b_1637360792172_2-0._QL90_1703d3a7-3b28-4599-b389-84e123169139.jpg",
        nameProduct: "Hat Attack Selena Bag",
        path: "/",
        quantity: 2,
        price: 200000,
    },
    {
        id: 2,
        image: "https://cdn.shopify.com/s/files/1/0641/8690/8910/products/hatta3044814a9b_1637360792172_2-0._QL90_1703d3a7-3b28-4599-b389-84e123169139.jpg",
        nameProduct: "Hat Attack Selena Bag",
        path: "/",
        quantity: 2,
        price: 200000,
    },
    {
        id: 3,
        image: "https://cdn.shopify.com/s/files/1/0641/8690/8910/products/hatta3044814a9b_1637360792172_2-0._QL90_1703d3a7-3b28-4599-b389-84e123169139.jpg",
        nameProduct: "Hat Attack Selena Bag",
        path: "/",
        quantity: 2,
        price: 200000,
    },
    {
        id: 4,
        image: "https://cdn.shopify.com/s/files/1/0641/8690/8910/products/hatta3044814a9b_1637360792172_2-0._QL90_1703d3a7-3b28-4599-b389-84e123169139.jpg",
        nameProduct: "Hat Attack Selena Bag",
        path: "/",
        quantity: 2,
        price: 200000,
    },
];

export const SearchSlide = ({ show, onHide }: Props) => {
    const { categories } = useAppSelector((state) => state.persist.category);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchValue, setSearchValue] = useState("");
    const [searchedProducts, setSearchedProducts] = useState<Array<Product>>([]);

    const debouncedSearch = useDebounce(searchValue, 1000);

    useEffect(() => {
        const fetchSearchProduct = async (queryString: string) => {
            const res = await axios.get(queryString);
            setSearchedProducts(res.data.products);
        };

        fetchSearchProduct(
            `/product/filter?category=${selectedCategory}&query=${debouncedSearch}&page-size=${10}&order=featured`
        );
    }, [debouncedSearch, selectedCategory]);

    const searchId = useId();

    return (
        <CustomOffCanvas show={show} onHide={onHide} titleHeader="search out site" placement="end">
            <div className={cx("group-search")}>
                <FormGroup>
                    <Form.Select
                        className={cx("input-search", "categories-selection")}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="all">All</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Select>
                </FormGroup>
                <FormGroup className="position-relative">
                    <FormControl
                        id={searchId}
                        className={cx("input-search")}
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search"
                    />
                    <label htmlFor={searchId} className={cx("wrap-search-icon")}>
                        <CiSearch className="fs-4" />
                    </label>
                </FormGroup>
            </div>
            <div className={cx("result")}>
                <div className={cx("label")}>Search result</div>
                <div className={cx("result-list")}>
                    {searchedProducts.length > 0 ? (
                        searchedProducts.map((product) => {
                            const linkProduct = pathname.detailProduct.split(":")[0] + product._id;
                            return (
                                <div
                                    key={product._id}
                                    className={cx("item-searched-product", "p-4 d-flex align-items-center")}>
                                    <Link to={linkProduct} className={cx("wrapper-image")}>
                                        <img src={product.previewImages[0]} alt="" />
                                    </Link>
                                    <div className={cx("description", "ps-3")}>
                                        <Link to={linkProduct} className="text-decoration-none">
                                            <h6 className={cx("product-name", "limit-line-1")}>{product.name}</h6>
                                        </Link>
                                        <div>
                                            <span
                                                className={cx(
                                                    "discount-price",
                                                    product.discount > 0 ? "highlight" : "",
                                                    "fw-light"
                                                )}>
                                                {formatCurrency(
                                                    product.price - (product.price * product.discount) / 100
                                                )}
                                            </span>
                                            {product.discount > 0 && (
                                                <span
                                                    className={cx(
                                                        "origin-price",

                                                        "ms-2 fw-light text-black-50 text-decoration-line-through"
                                                    )}>
                                                    {formatCurrency(product.price)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="fw-light m-0">Sold: {product.totalSold}</p>
                                        <p className="fw-light m-0">Discount: {product.discount}%</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center pt-5">Sorry! There are no products</p>
                    )}
                </div>
                <div className={cx("search-value-label")}>
                    {searchValue ? `Search for "${searchValue}"` : "Suggested products"}
                </div>
            </div>
        </CustomOffCanvas>
    );
};
