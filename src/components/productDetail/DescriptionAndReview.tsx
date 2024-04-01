import { useEffect, useState } from "react";
import { fetchReviewsApi } from "~/api/review";
import { ReviewProduct } from "~/app/features/products/productReducer";
import { Loading } from "../Loading";
import classNames from "classnames/bind";
import styles from "~/styles/ProductDetailScreen.module.scss";
import { WriteReviewModal } from "../WriteReviewModal";
import { useAppSelector } from "~/app/hooks";
const cx = classNames.bind(styles);

const tabs = [
    {
        value: "description",
        label: "Description",
    },
    {
        value: "reviews",
        label: "Reviews",
    },
];

export const DescriptionAndReview = () => {
    const { product } = useAppSelector((state) => state.product);

    const [activeTab, setActiveTab] = useState<string>(tabs[0].value);
    const [loadingReviews, setLoadingReviews] = useState<boolean>(false);
    const [reviews, setReviews] = useState<Array<ReviewProduct>>([]);

    // modal state
    const [showWriteReviewModal, setShowWriteReviewModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchReviews = async () => {
            const res = await fetchReviewsApi(`product=${product._id}`, setLoadingReviews);
            setReviews(res.reviews);
        };
        if (activeTab === "reviews") {
            fetchReviews();
        }
    }, [activeTab, product._id]);

    const handleOpenWriteReviewModal = () => {
        if (!showWriteReviewModal) setShowWriteReviewModal(true);
    };

    const handleCloseWriteReviewModal = () => {
        if (showWriteReviewModal) setShowWriteReviewModal(false);
    };

    return (
        <div className={cx("description-reviews", "pt-5")}>
            <div className={cx("tab-control", "d-flex align-items-center justify-content-center")}>
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        className={cx(
                            "btn-control",
                            activeTab === tab.value ? "active" : "",
                            "btn-round-border btn-size-md"
                        )}
                        onClick={() => setActiveTab(tab.value)}>
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className={cx("tab-content", "py-5")}>
                <div className={cx("description", "fw-light", activeTab === "description" ? "d-block" : "d-none")}>
                    {product.description}
                </div>
                <div className={cx("reviews", activeTab === "reviews" ? "d-block" : "d-none")}>
                    {loadingReviews ? (
                        <Loading />
                    ) : reviews.length === 0 ? (
                        <p className={cx("no-reviews", "fw-light text-center")}>
                            There are no reviews <br />
                            Be the first to{" "}
                            <button onClick={handleOpenWriteReviewModal} className={cx("write-review", "fw-light")}>
                                Write a review
                            </button>
                        </p>
                    ) : (
                        reviews.map((review) => <div>{review.content}</div>)
                    )}
                </div>
            </div>
            <WriteReviewModal
                show={showWriteReviewModal}
                handleClose={handleCloseWriteReviewModal}
                product={product}
                numberReviews={reviews.length}
            />
        </div>
    );
};
