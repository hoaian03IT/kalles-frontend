import { Link, NavLink } from "react-router-dom";
import { Col, Image, Row } from "react-bootstrap";
import classNames from "classnames/bind";
import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { BsList } from "react-icons/bs";

import logoImage from "~/assets/images/text-logo.png";

import styles from "~/styles/Header.module.scss";
import { useEffect, useRef, useState } from "react";
import { LoginSlide } from "./slides/LoginSlide";
import { CartSlide } from "./slides/CartSlide";
import { SearchSlide } from "./slides/SearchSlide";

const cx = classNames.bind(styles);

const navbar = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Product", path: "/product" },
    { label: "Blog", path: "/blog" },
];

export const Header = () => {
    const [whiteBgColorHeader, setWhiteBgColorHeader] = useState(false);
    const [showLoginSlide, setShowLoginSlide] = useState(false);
    const [showCartSlide, setShowCartSlide] = useState(false);
    const [showSearchSlide, setShowSearchSlide] = useState(true);

    const headerRef = useRef(null);

    useEffect(() => {
        const handler = () => {
            if (25 - window.scrollY > 0) {
                setWhiteBgColorHeader(false);
            } else {
                setWhiteBgColorHeader(true);
            }
        };
        document.addEventListener("scroll", handler);
        return () => document.removeEventListener("scroll", handler);
    }, [whiteBgColorHeader]);

    return (
        <header ref={headerRef} className={cx("wrapper", whiteBgColorHeader ? "bg-white" : "")}>
            <Row className="d-flex align-items-center justify-content-between">
                <Col className={cx("navbar")}>
                    <div className={cx("navbar-pc")}>
                        {navbar.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive ? cx("navbar-item", "active") : cx("navbar-item")
                                }>
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                    <div className={cx("navbar-mobile")}>
                        <BsList className={cx("menu-icon")} />
                    </div>
                </Col>
                <Col className="text-center">
                    <Link to="/">
                        <Image src={logoImage} alt="kalles" />
                    </Link>
                </Col>
                <Col className={cx("interact")}>
                    <div className={cx("item-group", "mobile")}>
                        <CiSearch className={cx("item")} onClick={() => setShowSearchSlide(true)} />
                    </div>
                    <div className={cx("item-group")}>
                        <CiUser className={cx("item")} onClick={() => setShowLoginSlide(true)} />
                    </div>
                    <div className={cx("item-group")}>
                        <CiHeart className={cx("item")} />
                        <span className={cx("bard")}>{"9+"}</span>
                    </div>
                    <div className={cx("item-group", "mobile")}>
                        <CiShoppingCart className={cx("item")} onClick={() => setShowCartSlide(true)} />
                        <span className={cx("bard")}>{"9+"}</span>
                    </div>
                </Col>
            </Row>
            <LoginSlide show={showLoginSlide} setShow={setShowLoginSlide} />
            <CartSlide show={showCartSlide} setShow={setShowCartSlide} />
            <SearchSlide show={showSearchSlide} setShow={setShowSearchSlide} />
        </header>
    );
};
