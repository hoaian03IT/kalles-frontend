import classNames from "classnames/bind";
import styles from "~/styles/components/HeaderBanner.module.scss";

const cx = classNames.bind(styles);

type Props = {
    img: string;
    title: string;
};

export const HeaderBanner = ({ img, title }: Props) => {
    return (
        <div className={cx("header-banner")}>
            <img draggable={false} loading="eager" src={img} alt="header-banner" />
            <h5 className={cx("title")}>{title}</h5>
        </div>
    );
};
