import styles from "~/styles/components/ProductDetail.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type Props = {
    images: Array<string>;
    onSelectImage: (index: number) => void;
    active: number;
};

export const VerticalImageList = ({ images = [], active = 0, onSelectImage }: Props) => {
    return (
        <div className={cx("vertical-image-list")}>
            {images.map((image, index) => {
                return (
                    <img
                        draggable={false}
                        onClick={() => onSelectImage(index)}
                        className={cx("image", active === index ? "active" : "")}
                        key={index}
                        src={image}
                        alt=""
                    />
                );
            })}
        </div>
    );
};
