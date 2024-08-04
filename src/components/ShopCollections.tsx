import classNames from "classnames/bind";
import { Badge, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CardSlider } from "./CardSlider";

import styles from "~/styles/components/ShopCollections.module.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { fetchCategoriesApi } from "~/api";
import { pathname } from "~/configs/pathname";

const cx = classNames.bind(styles);

export default function ShopCollections() {
    const { categories } = useAppSelector((state) => state.persist.category);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchCategories = async () => {
            await fetchCategoriesApi(dispatch);
        };

        fetchCategories();
    }, [dispatch]);

    return (
        <div>
            <div className={cx("header")}>
                <h2>Shop The Collections</h2>
                <span>Shop the latest products from the most popular collections</span>
            </div>
            <CardSlider>
                {categories.slice(0, 6).map((item, index) => (
                    <Link key={index} to={pathname.product + "?category=" + item._id} className={cx("item")}>
                        <div className={cx("img-wrapper")}>
                            <Image draggable="false" loading="eager" roundedCircle src={item.img} alt={item.name} />
                        </div>
                        <div className={cx("content")}>
                            <div className="position-relative">
                                <h5 className={cx("title")}>{item.name}</h5>
                                <Badge bg="dark" className="text-white position-absolute top-0 start-100">
                                    {item.productCount}
                                </Badge>
                            </div>
                        </div>
                    </Link>
                ))}
            </CardSlider>
        </div>
    );
}
