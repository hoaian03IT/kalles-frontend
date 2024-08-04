import classNames from "classnames/bind";
import { Button, Carousel } from "react-bootstrap";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { GoArrowRight } from "react-icons/go";

import styles from "~/styles/components/Banner.module.scss";
import { slider1, slider2, slider3 } from "~/assets/images/background-slider";
import { useNavigate } from "react-router-dom";
import { pathname } from "~/configs/pathname";

const cx = classNames.bind(styles);

export const Banner = () => {
    const navigate = useNavigate();
    const navigateToShop = () => {
        navigate(pathname.shop);
    };
    return (
        <Carousel touch={true} fade={true} pause="hover" prevIcon={<SlArrowLeft />} nextIcon={<SlArrowRight />}>
            <Carousel.Item className="position-relative">
                <img draggable={false} className={cx("img")} src={slider1} alt="" />
                <div className={cx("caption")}>
                    <p className="animation-slide-down">Hot Deal</p>
                    <h1 className="animation-slide-rl">Bohemia Collection</h1>
                    <Button
                        className="animation-slide-up btn-size-lg d-flex align-items-center btn-round-border"
                        onClick={navigateToShop}>
                        <span>Shop Now</span>
                        <GoArrowRight className="ms-2" />
                    </Button>
                </div>
            </Carousel.Item>
            <Carousel.Item className="position-relative">
                <img draggable={false} className={cx("img")} src={slider2} alt="" />
                <div className={cx("caption")}>
                    <p className="animation-slide-down">New Arrivals</p>
                    <h1 className="animation-slide-rl">Active Wear Collection</h1>
                    <Button
                        className="animation-slide-up btn-size-lg d-flex align-items-center btn-round-border"
                        onClick={navigateToShop}>
                        <span>Shop Now</span>
                        <GoArrowRight className="ms-2" />
                    </Button>
                </div>
            </Carousel.Item>
            <Carousel.Item className="position-relative">
                <img draggable={false} className={cx("img")} src={slider3} alt="" />
                <div className={cx("caption")}>
                    <p className="animation-slide-rl">Hot Deal</p>
                    <h1 className="animation-slide-down">Spring Collection 2023</h1>
                    <Button
                        className="animation-slide-up btn-size-lg d-flex align-items-center btn-round-border"
                        onClick={navigateToShop}>
                        <span>Shop Now</span>
                        <GoArrowRight className="ms-2" />
                    </Button>
                </div>
            </Carousel.Item>
        </Carousel>
    );
};
