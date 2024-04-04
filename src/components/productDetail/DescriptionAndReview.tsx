import { ChangeEvent, useContext, useEffect, useState } from "react";
import { fetchReviewsApi, fetchTotalRateApi } from "~/api/review";
import { ReviewProduct } from "~/app/features/products/productReducer";
import { Loading } from "../Loading";
import { WriteReviewModal } from "../WriteReviewModal";
import { useAppSelector } from "~/app/hooks";
import { RateProduct } from "../RateProduct";
import { Button } from "react-bootstrap";
import { CheckLoggedContext } from "../CheckLogged";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

import classNames from "classnames/bind";
import styles from "~/styles/ProductDetailScreen.module.scss";
const cx = classNames.bind(styles);

type Sort = "newest" | "oldest";

const INITIAL_NPAGE = 4;

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
    const { isLogged } = useContext(CheckLoggedContext);

    const [activeTab, setActiveTab] = useState<string>(tabs[0].value);
    const [loadingReviews, setLoadingReviews] = useState<boolean>(false);
    const [reviews, setReviews] = useState<Array<ReviewProduct>>([]);
    const [totalRate, setTotalRate] = useState<Array<{ rate: number }>>([]);
    const [pageReview, setPageReview] = useState({
        page: 1,
        pages: 0,
    });
    const [nPage, setNPage] = useState(INITIAL_NPAGE);
    const [filterRate, setFilterRate] = useState<number>(-1);
    const [sort, setSort] = useState<Sort>("newest");

    // modal state
    const [showWriteReviewModal, setShowWriteReviewModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchTotalRate = async () => {
            const res = await fetchTotalRateApi(product._id);
            setTotalRate(res.totalRate);
        };

        if (activeTab === "reviews") {
            fetchTotalRate();
        }
    }, [activeTab, product._id]);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoadingReviews(true);
            const res = await fetchReviewsApi(
                `product=${product._id}&nPage=${nPage}&sort=${sort}&skip=${false}&rate=${filterRate}`
            );
            setLoadingReviews(false);
            if (res) {
                setPageReview({
                    page: Number(res.page),
                    pages: Number(res.pages),
                });
                setReviews(res.reviews);
            }
        };

        if (activeTab === "reviews") {
            fetchReviews();
        }
    }, [activeTab, nPage, product._id, sort, filterRate]);

    const handleOpenWriteReviewModal = () => {
        if (!isLogged) {
            toast.warn("You must login to review");
            return;
        }
        if (!showWriteReviewModal) setShowWriteReviewModal(true);
    };

    const handleCloseWriteReviewModal = () => {
        if (showWriteReviewModal) setShowWriteReviewModal(false);
    };

    const handleChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value as Sort;
        setSort(value);
    };

    const handleLoadMoreReviews = () => {
        if (pageReview.page === pageReview.pages) {
            return;
        }
        setNPage((prev) => prev + 1);
    };

    const handleSelectRate = (rate: number) => {
        if (filterRate === rate) setFilterRate(-1);
        else setFilterRate(rate);
        setNPage(INITIAL_NPAGE);
    };

    useEffect(() => {
        console.log(pageReview);
    }, [pageReview]);

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
                            Be the first to&nbsp;
                            <button onClick={handleOpenWriteReviewModal} className={cx("btn-write-review", "fw-light")}>
                                Write a review
                            </button>
                        </p>
                    ) : (
                        <div>
                            <div className={cx("reviews-summary", "d-flex")}>
                                <div className="text-center">
                                    <h1 className={cx("rate", "fw-semibold")}>{product.rate}</h1>
                                    <div className="d-flex justify-content-center">
                                        <RateProduct rating={product.rate} size="medium" />
                                    </div>
                                    <p className="fw-light">
                                        {reviews.length + ` ${reviews.length > 1 ? "reviews" : "review"}`}
                                    </p>
                                    <Button
                                        className={cx("btn-write-review", "fw-light")}
                                        onClick={handleOpenWriteReviewModal}>
                                        Write a review
                                    </Button>
                                </div>
                                <table className={cx("table-rate-percent", "mx-5")}>
                                    <tbody>
                                        {Array.from(Array(5).keys())
                                            .reverse()
                                            .map((item) => {
                                                const quantity = totalRate.filter(
                                                    (oneRate) => oneRate.rate === item + 1
                                                ).length;
                                                const percent = (quantity / totalRate.length) * 100;
                                                return (
                                                    <tr className={cx("rate-bar")} key={item}>
                                                        <th className={cx("rate-name")}>
                                                            <div className="d-flex align-items-start">
                                                                <FaStar className={cx("ic-star", "fs-5")} />
                                                                <span className="ms-1 fw-light text-black-50">
                                                                    {item + 1}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th className="w-100 px-2">
                                                            <div
                                                                className={cx(
                                                                    "total-bar-default",
                                                                    percent === 0 ? "disabled" : ""
                                                                )}
                                                                onClick={() => handleSelectRate(item + 1)}>
                                                                <span
                                                                    className={cx("percent")}
                                                                    style={{ width: `${percent}%` }}></span>
                                                            </div>
                                                        </th>
                                                        <th>
                                                            <div
                                                                className={cx(
                                                                    "quantity",
                                                                    "fw-light d-flex align-items-center justify-content-center",
                                                                    filterRate === item + 1 ? "active" : ""
                                                                )}
                                                                style={{}}>
                                                                {quantity}
                                                            </div>
                                                        </th>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx("review-details")}>
                                <div
                                    className={cx(
                                        "control",
                                        "px-2 mt-4 d-flex align-items-center justify-content-between"
                                    )}>
                                    <h5>Reviews</h5>
                                    <select
                                        className={cx("btn-sort", "fw-light")}
                                        value={sort}
                                        onChange={handleChangeSort}>
                                        <option value="newest" className="fw-light">
                                            Newest
                                        </option>
                                        <option value="oldest" className="fw-light">
                                            Oldest
                                        </option>
                                    </select>
                                </div>
                                <div className={cx("review-list", "m-2")}>
                                    {reviews.map((review) => (
                                        <div
                                            key={review._id}
                                            className={cx("review-item", "p-2 d-flex align-items-start")}>
                                            <div className={cx("wrapper-image")}>
                                                <img
                                                    loading="lazy"
                                                    src={review.owner?.avatar}
                                                    alt={review.owner?.firstName + " " + review.owner?.lastName}
                                                />
                                            </div>
                                            <div className={cx("feedback-content", "ms-4")}>
                                                <RateProduct rating={review.rate} size="small" />
                                                <h6 className={cx("title")}>{review.title}</h6>
                                                <div className={cx("photos", "d-flex align-items-center")}>
                                                    {review.photos?.map(
                                                        (photo, index) =>
                                                            index < 3 && (
                                                                <div className={cx("wrapper-photo")} key={index}>
                                                                    <img
                                                                        loading="lazy"
                                                                        key={index}
                                                                        src={photo}
                                                                        alt="img"
                                                                    />
                                                                    <button className="text-white fw-light">
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
                                    ))}
                                </div>
                                {pageReview.page < pageReview.pages && (
                                    <button
                                        className={cx("btn-more-review", "d-flex align-items-center")}
                                        onClick={handleLoadMoreReviews}>
                                        {loadingReviews ? (
                                            <Loading />
                                        ) : (
                                            <>
                                                <span>More</span>
                                                <MdOutlineKeyboardDoubleArrowDown />
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
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
