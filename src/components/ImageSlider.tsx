import { Carousel, CarouselItem } from "react-bootstrap";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import classNames from "classnames/bind";
import styles from "~/styles/ImageSlider.module.scss";
const cx = classNames.bind(styles);

type Props = {
    images: Array<string>;
    selectedIndexImage: number;
    handleNextImage: () => void;
    handlePreviousImage: () => void;
    fadeAnimation?: boolean;
};

const PrevControl = ({ onClick }: { onClick: () => void }) => (
    <div className={cx("control-icon")} onClick={onClick}>
        <IoIosArrowBack className={cx("icon")} />
    </div>
);

const NextControl = ({ onClick }: { onClick: () => void }) => (
    <div className={cx("control-icon")} onClick={onClick}>
        <IoIosArrowForward className={cx("icon")} />
    </div>
);

export const ImageSlider = ({
    handleNextImage,
    images,
    selectedIndexImage,
    handlePreviousImage,
    fadeAnimation = true,
}: Props) => {
    return (
        <Carousel
            className={cx("carousel")}
            fade={fadeAnimation}
            prevIcon={images?.length > 1 ? <PrevControl onClick={handlePreviousImage} /> : <></>}
            nextIcon={images?.length > 1 ? <NextControl onClick={handleNextImage} /> : <></>}
            activeIndex={selectedIndexImage}>
            {images?.map((img, index) => (
                <CarouselItem className={cx("carousel-item")} key={index}>
                    <img loading="eager" draggable={false} className={cx("img", "h-100")} src={img} alt="" />
                </CarouselItem>
            ))}
        </Carousel>
    );
};
