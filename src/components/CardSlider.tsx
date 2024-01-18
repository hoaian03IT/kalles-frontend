import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import styles from "~/styles/CardSlider.module.scss";

const cx = classNames.bind(styles);

type Props = {
    children: JSX.Element[] | JSX.Element | string;
    className?: string;
};

type actionArrowBtn = "previous" | "next";

export const CardSlider = ({ children, className }: Props) => {
    const ref = useRef<any>(null);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleSlideItem = (behavior: actionArrowBtn) => {
        const scrollWidth = ref.current.scrollWidth;
        const offsetWidth = ref.current.offsetWidth;
        if (behavior === "next") {
            if (scrollLeft + offsetWidth >= scrollWidth) {
                setScrollLeft(0);
            } else {
                setScrollLeft((prev) => prev + offsetWidth);
            }
        } else {
            if (scrollLeft <= 0) {
                setScrollLeft(scrollWidth - offsetWidth);
            } else {
                setScrollLeft((prev) => prev - offsetWidth);
            }
        }
    };

    useEffect(() => {
        ref.current.scrollLeft = scrollLeft;
    }, [scrollLeft]);

    return (
        <div className={`${className ? className : ""} ${cx("wrapper")}`}>
            <button className={cx("pre-btn")} onClick={() => handleSlideItem("previous")}>
                <SlArrowLeft />
            </button>
            <button className={cx("nxt-btn")} onClick={() => handleSlideItem("next")}>
                <SlArrowRight />
            </button>
            <div ref={ref} className={cx("carousel")}>
                {children}
            </div>
        </div>
    );
};
