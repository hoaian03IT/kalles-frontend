import { CustomOffCanvas } from "./slides/CustomOffCanvas";
import { MyCheckbox } from "./MyCheckbox";
import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "~/styles/FilterProduct.module.scss";
import { InputRangeDoubleSlide } from "./InputRangeDoubleSlide";
import axios from "axios";
import { formatCurrencyVND } from "~/utils";
import { Button } from "react-bootstrap";
import { useAppSelector } from "~/app/hooks";
import { ProductScreenContext } from "~/screens/ProductScreen";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

type Props = {
    show: boolean;
    onHide: () => void;
};

const availabilityOptions = [
    { label: "In Stock", value: "in-stock" },
    { label: "Out of Stock", value: "out-stock" },
];

const sexOptions = [
    { label: "Men", key: "men" },
    { label: "Women", key: "women" },
    { label: "Unisex", key: "unisex" },
];

const defaultMaxPrice = 50000000;

export const FilterProduct = ({ show, onHide }: Props) => {
    const { categories } = useAppSelector((state) => state.persist.category);

    // context
    const productScreenContext = useContext(ProductScreenContext);

    const [limitPrice, setLimitPrice] = useState({ min: 0, max: defaultMaxPrice });
    const [filterPrice, setFilterPrice] = useState({ min: 0, max: 100 });

    useEffect(() => {
        const fetchHighestPriceProduct = async () => {
            try {
                const res = await axios.get("/product/highest-price");
                setLimitPrice({ ...limitPrice, max: Number(res.data.price) || defaultMaxPrice });
                setFilterPrice({ ...filterPrice, max: Number(res.data.price) || defaultMaxPrice });
            } catch (error) {}
        };
        fetchHighestPriceProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeAvailabilityOption = (value: string) => {
        if (value === productScreenContext?.filter.stock)
            productScreenContext.setFilter({ ...productScreenContext.filter, stock: "all" });
        else productScreenContext?.setFilter({ ...productScreenContext.filter, stock: value });
    };

    const handleChangeFilterCategory = (id: string) => {
        if (id === productScreenContext?.filter.category) {
            productScreenContext.setFilter({ ...productScreenContext.filter, category: "all" });
        } else {
            productScreenContext?.setFilter({ ...productScreenContext.filter, category: id });
        }
    };

    const handleChangeFilterGender = (key: string) => {
        if (key === productScreenContext?.filter.sex) {
            productScreenContext.setFilter({ ...productScreenContext.filter, sex: "all" });
        } else {
            productScreenContext?.setFilter({ ...productScreenContext.filter, sex: key });
        }
    };

    const handleClickFilterPriceBtn = async () => {
        const min = Number(productScreenContext?.filter.price.split("-")[0]);
        const max = Number(productScreenContext?.filter.price.split("-")[1]);
        if (filterPrice.min !== min && filterPrice.max !== max) {
            productScreenContext?.setFilter({
                ...productScreenContext.filter,
                price: filterPrice.min + "-" + filterPrice.max,
            });
        } else {
            toast.warn("Please filter for a different price range");
        }
    };

    useEffect(() => {});

    return (
        <CustomOffCanvas titleHeader="Filter" show={show} onHide={onHide} placement="start">
            <div className={cx("wrapper")}>
                <div className={cx("filter", "availability")}>
                    <h5 className={cx("title-header")}>Availability</h5>
                    <div className={cx("body")}>
                        {availabilityOptions.map((option) => (
                            <MyCheckbox
                                key={option.value}
                                label={option.label}
                                checked={productScreenContext?.filter.stock === option.value}
                                onChange={() => handleChangeAvailabilityOption(option.value)}
                            />
                        ))}
                    </div>
                </div>
                <div className={cx("filter", "price")}>
                    <h5 className={cx("title-header")}>Price</h5>
                    <div className={cx("body")}>
                        <div>
                            <InputRangeDoubleSlide
                                value={filterPrice}
                                setValue={setFilterPrice}
                                min={limitPrice.min}
                                max={limitPrice.max}
                                step={(limitPrice.max - limitPrice.min) / 100}
                                gap={0}
                            />
                        </div>
                        <div className={cx("price-filter")}>
                            <span className={cx("label")}>Price:</span>
                            <span className="ms-2">
                                {formatCurrencyVND(filterPrice.min)} - {formatCurrencyVND(filterPrice.max)}
                            </span>
                        </div>
                        <Button className="mt-2" variant="secondary" onClick={handleClickFilterPriceBtn}>
                            Filter
                        </Button>
                    </div>
                </div>
                <div className={cx("filter", "category")}>
                    <h5 className={cx("title-header")}>Product type</h5>
                    <div className={cx("body")}>
                        {categories.map((category) => (
                            <div key={category.key} className="my-2">
                                <MyCheckbox
                                    checked={productScreenContext?.filter.category === category._id}
                                    label={category.name}
                                    onChange={() => handleChangeFilterCategory(category._id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx("filter", "category")}>
                    <h5 className={cx("title-header")}>Gender</h5>
                    <div className={cx("body")}>
                        {sexOptions.map((sex) => (
                            <div key={sex.key} className="my-2">
                                <MyCheckbox
                                    checked={productScreenContext?.filter.sex === sex.key}
                                    label={sex.label}
                                    onChange={() => handleChangeFilterGender(sex.key)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CustomOffCanvas>
    );
};
