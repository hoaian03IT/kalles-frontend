import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Col, OverlayTrigger, Popover, Row } from "react-bootstrap";
import classNames from "classnames/bind";
import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { BsList } from "react-icons/bs";
import { LoginSlide } from "./slides/LoginSlide";
import { CartSlide } from "./cart/CartSlide";
import { SearchSlide } from "./slides/SearchSlide";
import { MenuSlideMobile } from "./slides/MenuSlideMobile";
import { navbar } from "~/data";

import styles from "~/styles/components/Header.module.scss";
import { CheckLoggedContext } from "./CheckLogged";
import { pathname } from "~/configs/pathname";
import { useAppSelector } from "~/app/hooks";
import { textLogo } from "~/assets/images/logo";

const cx = classNames.bind(styles);

type Props = {
    type: "sticky" | "fixed";
};

export const Header = ({ type }: Props) => {
    const [whiteBgColorHeader, setWhiteBgColorHeader] = useState(false);
    const [showLoginSlide, setShowLoginSlide] = useState(false);
    const [showCartSlide, setShowCartSlide] = useState(false);
    const [showSearchSlide, setShowSearchSlide] = useState(false);
    const [showMenuSlide, setShowMenuSlide] = useState(false);

    const { isLogged, handleLogout } = useContext(CheckLoggedContext);
    const { user, cart } = useAppSelector((state) => state.persist);
    const { whitelist } = useAppSelector((state) => state.whitelist);

    const headerRef = useRef(null);

    const navigate = useNavigate();

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
        <header ref={headerRef} className={cx("wrapper", whiteBgColorHeader ? "bg-white" : "", type)}>
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
                        <BsList className={cx("menu-icon")} onClick={() => setShowMenuSlide(true)} />
                    </div>
                </Col>
                <Col className="text-center">
                    <Link to="/">
                        <img src={textLogo} alt="kalles" />
                    </Link>
                </Col>
                <Col className={cx("interact")}>
                    <button className={cx("item-group", "mobile")} onClick={() => setShowSearchSlide(true)}>
                        <CiSearch className={cx("item")} />
                    </button>
                    <button className={cx("item-group")} onClick={() => navigate(pathname.whitelist)}>
                        <CiHeart className={cx("item")} />
                        <span className={cx("bard")}>{whitelist.length > 9 ? "9+" : whitelist.length}</span>
                    </button>
                    <button className={cx("item-group", "mobile")} onClick={() => setShowCartSlide(true)}>
                        <CiShoppingCart className={cx("item")} />
                        <span className={cx("bard")}>{cart.items.length > 9 ? "9+" : cart.items.length}</span>
                    </button>
                    {isLogged ? (
                        <OverlayTrigger
                            trigger="click"
                            placement="bottom-start"
                            overlay={
                                <Popover className={cx("popover-user")}>
                                    <Popover.Body className={cx("body")}>
                                        <button
                                            className={cx("btn-interact")}
                                            onClick={() => navigate(pathname.dashboard())}>
                                            Dashboard
                                        </button>
                                        <button
                                            className={cx("btn-interact")}
                                            onClick={() => navigate(pathname.address())}>
                                            Address
                                        </button>
                                        <button className={cx("btn-interact")} onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </Popover.Body>
                                </Popover>
                            }>
                            <div className={cx("item-group")}>
                                <img
                                    className={cx("item", "avatar")}
                                    onClick={() => setShowLoginSlide(true)}
                                    src={user.avatar}
                                    alt="avatar"
                                />
                            </div>
                        </OverlayTrigger>
                    ) : (
                        <div className={cx("item-group")}>
                            <CiUser className={cx("item")} onClick={() => setShowLoginSlide(true)} />
                        </div>
                    )}
                </Col>
            </Row>
            <LoginSlide show={showLoginSlide && !isLogged} onHide={() => setShowLoginSlide(false)} />
            <CartSlide show={showCartSlide} onHide={() => setShowCartSlide(false)} />
            <SearchSlide show={showSearchSlide} onHide={() => setShowSearchSlide(false)} />
            <MenuSlideMobile show={showMenuSlide} onHide={() => setShowMenuSlide(false)} />
        </header>
    );
};
