import classNames from "classnames/bind";
import styles from "~/styles/screens/ProductDetailScreen.module.scss";
import { RateProduct } from "../RateProduct";
import { getTimeAgo } from "~/utils";
import { ReviewProduct } from "~/types";
const cx = classNames.bind(styles);

type Props = {
    review: ReviewProduct;
    handleGroupPhoto: (photos: Array<string>, current: number) => void;
};

export const ReviewItem = ({ review, handleGroupPhoto }: Props) => {
    const dateModified = getTimeAgo(new Date(review.updatedAt));

    return (
        <div key={review._id} className={cx("review-item", "p-2 d-flex align-items-start")}>
            <div className={cx("wrapper-image")}>
                <img
                    loading="lazy"
                    src={review.owner?.avatar}
                    alt={review.owner?.firstName + " " + review.owner?.lastName}
                />
            </div>
            <div className={cx("feedback-content", "ms-4")}>
                <div className="d-flex align-items-end">
                    <RateProduct rating={review.rate} size="small" />
                    <span className={cx("time-ago", "ms-2")}>{dateModified}</span>
                </div>
                <h6 className={cx("title")}>{review.title}</h6>
                <div className={cx("photos", "d-flex align-items-center")}>
                    {review.photos?.map(
                        (photo, index) =>
                            index < 3 && (
                                <div className={cx("wrapper-photo")} key={index}>
                                    <img loading="lazy" key={index} src={photo} alt="img" />
                                    <button
                                        className="text-white fw-light"
                                        onClick={() => handleGroupPhoto(review.photos, index)}>
                                        {index === 2 && "More"}
                                    </button>
                                </div>
                            )
                    )}
                </div>
                <p className={cx("content", "fw-light")}>
                    {!review.title && !review.content ? "No feedback" : review.content}
                </p>
            </div>
        </div>
    );
};
