import { CustomOffCanvas } from "./CustomOffCanvas";
import { navbar } from "~/data";
import { NavLink } from "react-router-dom";
import { CiHeart, CiUser, CiLogout, CiMail, CiPhone } from "react-icons/ci";

import styles from "~/styles/MenuSlideMobile.module.scss";
import classNames from "classnames/bind";
import { useContext } from "react";
import { CheckLoggedContext } from "../CheckLogged";
import { pathname } from "~/configs/pathname";

type Props = {
    show: boolean;
    onHide: () => void;
};

const cx = classNames.bind(styles);

export const MenuSlideMobile = ({ onHide, show }: Props) => {
    const { isLogged, handleLogout } = useContext(CheckLoggedContext);
    const handleLogoutAndHideSlide = () => {
        handleLogout();
        onHide();
    };
    return (
        <CustomOffCanvas onHide={onHide} titleHeader="menu" show={show}>
            <>
                {navbar.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive ? cx("item", "navbar-item", "active") : cx("item", "navbar-item")
                        }
                        onClick={onHide}>
                        {item.label}
                    </NavLink>
                ))}
                <NavLink
                    to={"/whitelist"}
                    className={({ isActive }) =>
                        isActive ? cx("item", "navbar-item", "active") : cx("item", "navbar-item")
                    }
                    onClick={onHide}>
                    <CiHeart className="fs-1 me-2" />
                    <span>Whitelist</span>
                </NavLink>
                {isLogged ? (
                    <button className={cx("item")} onClick={handleLogoutAndHideSlide}>
                        <CiLogout className="fs-1 me-2" />
                        <span>Log out</span>
                    </button>
                ) : (
                    <NavLink
                        to={pathname.login}
                        className={({ isActive }) =>
                            isActive ? cx("item", "navbar-item", "active") : cx("item", "navbar-item")
                        }
                        onClick={onHide}>
                        <CiUser className="fs-1 me-2" />
                        <span>Login/Register</span>
                    </NavLink>
                )}
                <div className={cx("item", "help")}>
                    <p>Need help?</p>
                    <div>
                        <CiPhone className="fs-3 me-2" />
                        <a href="tel:+01 23456789" className="text-black-50 text-decoration-none">
                            +01 23456789
                        </a>
                    </div>
                    <div>
                        <CiMail className="fs-3 me-2" />
                        <span>kalles@domain.com</span>
                    </div>
                </div>
            </>
        </CustomOffCanvas>
    );
};
