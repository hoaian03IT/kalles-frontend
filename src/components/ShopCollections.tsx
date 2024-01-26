import classNames from "classnames/bind";
import { Badge, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CardSlider } from "./CardSlider";

import styles from "~/styles/ShopCollections.module.scss";

const cx = classNames.bind(styles);

const data = [
    { img: "https://demo-kalles-4-3.myshopify.com/cdn/shop/files/top.png", title: "Tops", quantity: 18 },
    { img: "https://demo-kalles-4-3.myshopify.com/cdn/shop/files/bottom.png", title: "Bottoms", quantity: 18 },
    { img: "https://demo-kalles-4-3.myshopify.com/cdn/shop/files/bags.png", title: "Bags", quantity: 18 },
    { img: "https://demo-kalles-4-3.myshopify.com/cdn/shop/files/shoes.png", title: "Shoes", quantity: 18 },
    {
        img: "https://demo-kalles-4-3.myshopify.com/cdn/shop/files/coat_jacket.png",
        title: "Coats & Jackets",
        quantity: 18,
    },
    { img: "https://demo-kalles-4-3.myshopify.com/cdn/shop/files/accessories.png", title: "Accessories", quantity: 18 },
];

export default function ShopCollections() {
    return (
        <div>
            <div className={cx("header")}>
                <h2>Shop The Collections</h2>
                <span>Shop the latest products from the most popular collections</span>
            </div>
            <CardSlider>
                {data.map((item, index) => (
                    <Link key={index} to="/" className={cx("item")}>
                        <div className={cx("img-wrapper")}>
                            <Image draggable="false" loading="eager" roundedCircle src={item.img} alt={item.title} />
                        </div>
                        <div className={cx("content")}>
                            <div className="position-relative">
                                <h5 className={cx("title")}>{item.title}</h5>
                                <Badge bg="dark" className="text-white position-absolute top-0 start-100">
                                    {item.quantity}
                                </Badge>
                            </div>
                        </div>
                    </Link>
                ))}
            </CardSlider>
        </div>
    );
}
