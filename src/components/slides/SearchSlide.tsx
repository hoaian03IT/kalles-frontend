import { SetStateAction, useId, useState } from "react";
import { CustomOffCanvas } from "./CustomOffCanvas";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import classNames from "classnames/bind";
import { CiSearch } from "react-icons/ci";

import styles from "~/styles/SearchSlide.module.scss";
import { ItemProduct } from "./ItemProduct";

type Props = {
    show: boolean;
    setShow: React.Dispatch<SetStateAction<boolean>>;
};

const cx = classNames.bind(styles);

const categories = ["All Categories", "Accessories", "Arts & Entertainments", "Bag"];

export const SearchSlide = ({ show, setShow }: Props) => {
    const [selectedCategory, setSelectedCategory] = useState("option1");
    const [searchValue, setSearchValue] = useState("");

    const searchId = useId();

    return (
        <CustomOffCanvas show={show} setShow={setShow} titleHeader="search out site" placement="end">
            <div className={cx("group-search")}>
                <FormGroup>
                    <Form.Select
                        className={cx("input-search", "categories-selection")}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}>
                        {categories.map((category, index) => (
                            <option key={index} value={index}>
                                {category}
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
                    <ItemProduct
                        imageProduct="https://cdn.shopify.com/s/files/1/0641/8690/8910/products/hatta3044814a9b_1637360792172_2-0._QL90_1703d3a7-3b28-4599-b389-84e123169139.jpg"
                        nameProduct="Hat Attack Selena Bag"
                        linkDetails="/"
                        quantity={2}
                        price={12000}
                    />
                    <ItemProduct
                        imageProduct="https://cdn.shopify.com/s/files/1/0641/8690/8910/products/hatta3044814a9b_1637360792172_2-0._QL90_1703d3a7-3b28-4599-b389-84e123169139.jpg"
                        nameProduct="Hat Attack Selena Bag"
                        linkDetails="/"
                        quantity={2}
                        price={12000}
                    />
                    <ItemProduct
                        imageProduct="https://cdn.shopify.com/s/files/1/0641/8690/8910/products/hatta3044814a9b_1637360792172_2-0._QL90_1703d3a7-3b28-4599-b389-84e123169139.jpg"
                        nameProduct="Hat Attack Selena Bag"
                        linkDetails="/"
                        quantity={2}
                        price={12000}
                    />
                    <ItemProduct
                        imageProduct="https://cdn.shopify.com/s/files/1/0641/8690/8910/products/hatta3044814a9b_1637360792172_2-0._QL90_1703d3a7-3b28-4599-b389-84e123169139.jpg"
                        nameProduct="Hat Attack Selena Bag"
                        linkDetails="/"
                        quantity={2}
                        price={12000}
                    />
                    <ItemProduct
                        imageProduct="https://cdn.shopify.com/s/files/1/0641/8690/8910/products/hatta3044814a9b_1637360792172_2-0._QL90_1703d3a7-3b28-4599-b389-84e123169139.jpg"
                        nameProduct="Hat Attack Selena Bag"
                        linkDetails="/"
                        quantity={2}
                        price={12000}
                    />
                    <ItemProduct
                        imageProduct="https://cdn.shopify.com/s/files/1/0641/8690/8910/products/hatta3044814a9b_1637360792172_2-0._QL90_1703d3a7-3b28-4599-b389-84e123169139.jpg"
                        nameProduct="Hat Attack Selena Bag"
                        linkDetails="/"
                        quantity={2}
                        price={12000}
                    />
                </div>
                {searchValue && <div className={cx("search-value-label")}>Search for "{searchValue}"</div>}
            </div>
        </CustomOffCanvas>
    );
};
