import classNames from "classnames/bind";
import { Button, Carousel } from "react-bootstrap";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { GoArrowRight } from "react-icons/go";

import styles from "~/styles/Banner.module.scss";
import banner1 from "~/assets/images/slider1.jpg";
import banner2 from "~/assets/images/slider2.png";
import banner3 from "~/assets/images/slider3.jpg";

const cx = classNames.bind(styles);

export const Banner = () => {
    return (
        <Carousel touch={true} fade={true} pause="hover" prevIcon={<SlArrowLeft />} nextIcon={<SlArrowRight />}>
            <Carousel.Item className="position-relative">
                <img draggable={false} className={cx("img")} src={banner1} alt="" />
                <div className={cx("caption")}>
                    <p className="animation-slide-down">Hot Deal</p>
                    <h1 className="animation-slide-rl">Bohemia Collection</h1>
                    <Button className="animation-slide-up btn-size-lg d-flex align-items-center btn-round-border">
                        <span>Shop Now</span>
                        <GoArrowRight className="ms-2" />
                    </Button>
                </div>
            </Carousel.Item>
            <Carousel.Item className="position-relative">
                <img draggable={false} className={cx("img")} src={banner2} alt="" />
                <div className={cx("caption")}>
                    <p className="animation-slide-down">New Arrivals</p>
                    <h1 className="animation-slide-rl">Active Wear Collection</h1>
                    <Button className="animation-slide-up btn-size-lg d-flex align-items-center btn-round-border">
                        <span>Shop Now</span>
                        <GoArrowRight className="ms-2" />
                    </Button>
                </div>
            </Carousel.Item>
            <Carousel.Item className="position-relative">
                <img draggable={false} className={cx("img")} src={banner3} alt="" />
                <div className={cx("caption")}>
                    <p className="animation-slide-rl">Hot Deal</p>
                    <h1 className="animation-slide-down">Spring Collection 2023</h1>
                    <Button className="animation-slide-up btn-size-lg d-flex align-items-center btn-round-border">
                        <span>Shop Now</span>
                        <GoArrowRight className="ms-2" />
                    </Button>
                </div>
            </Carousel.Item>
        </Carousel>
    );
};
