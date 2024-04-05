import { useEffect, useId, useState } from "react";
import { CustomOffCanvas } from "./CustomOffCanvas";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import classNames from "classnames/bind";
import { CiSearch } from "react-icons/ci";

import styles from "~/styles/SearchSlide.module.scss";
import { ItemProduct } from "./ItemProduct";
import { useAppSelector } from "~/app/hooks";
import { useDebounce } from "~/hooks";
import axios from "axios";

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

    const debouncedSearch = useDebounce(searchValue, 1000);

    useEffect(() => {
        const fetchSearchProduct = async () => {
            const res = await axios.get(
                `/product/filter?category=${selectedCategory}&query=${debouncedSearch}&pageSize=${10}&order=featured`
            );
            console.log(res.data.products);
        };
        if (debouncedSearch) {
            fetchSearchProduct();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

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
                    {searchItems.map((item) => (
                        <ItemProduct
                            key={item.id}
                            imageProduct={item.image}
                            nameProduct={item.nameProduct}
                            linkDetails={item.path}
                            quantity={item.quantity}
                            price={item.price}
                        />
                    ))}
                </div>
                {/* {searchValue && <div className={cx("search-value-label")}>Search for "{searchValue}"</div>} */}
                <div className={cx("search-value-label")}>Search for "{searchValue}"</div>
            </div>
        </CustomOffCanvas>
    );
};
