import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { fetchReviewsApi, fetchTotalRateApi } from "~/api/review";
import { Loading } from "../Loading";
import { WriteReviewModal } from "../WriteReviewModal";
import { useAppSelector } from "~/app/hooks";
import { RateProduct } from "../RateProduct";
import { Button, Modal } from "react-bootstrap";
import { CheckLoggedContext } from "../CheckLogged";
import { toast } from "react-toastify";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { TableRate } from "./TableRate";
import { ImageSlider } from "../ImageSlider";

import classNames from "classnames/bind";
import styles from "~/styles/ProductDetailScreen.module.scss";
import { ReviewItem } from "./ReviewItem";
import { ReviewProduct } from "~/types";
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

    const [groupPhotoViewModal, setGroupPhotoViewModal] = useState<{ photos: Array<string>; current: number }>({
        photos: [],
        current: 0,
    });

    // modal state
    const [showWriteReviewModal, setShowWriteReviewModal] = useState<boolean>(false);
    const [showModalViewPhoto, setShowModalViewPhoto] = useState<boolean>(false);

    const reviewEndRef = useRef<HTMLDivElement>(null);

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
                `product-id=${product._id}&nPage=${nPage}&sort=${sort}&skip=${false}&rate=${filterRate}`
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

    useEffect(() => {
        reviewEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [reviews.length]);

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
        setNPage((prev) => prev + INITIAL_NPAGE);
    };

    const handleSelectRate = (rate: number) => {
        if (filterRate === rate) setFilterRate(-1);
        else setFilterRate(rate);
        setNPage(INITIAL_NPAGE);
    };

    const handleGroupPhotoViewModal = (photos: Array<string>, current: number) => {
        if (photos.length > 0) {
            setGroupPhotoViewModal({ photos: photos, current: current });
            setShowModalViewPhoto(true);
        }
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
                            Be the first to&nbsp;
                            <button onClick={handleOpenWriteReviewModal} className={cx("btn-write-review", "fw-light")}>
                                Write a review
                            </button>
                        </p>
                    ) : (
                        <div>
                            <div className={cx("reviews-summary", "d-flex")}>
                                <div className="text-center">
                                    <h1 className={cx("rate", "fw-semibold")}>{product.avgRate}</h1>
                                    <div className="d-flex justify-content-center">
                                        <RateProduct rating={product.avgRate} size="medium" />
                                    </div>
                                    <p className="fw-light">
                                        {totalRate.length + ` ${reviews.length > 1 ? "reviews" : "review"}`}
                                    </p>
                                    <Button
                                        className={cx("btn-write-review", "fw-light")}
                                        onClick={handleOpenWriteReviewModal}>
                                        Write a review
                                    </Button>
                                </div>
                                <div className="mx-5">
                                    <TableRate
                                        filterRate={filterRate}
                                        handleSelectRate={handleSelectRate}
                                        totalRate={totalRate}
                                    />
                                </div>
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
                                        <ReviewItem
                                            key={review._id}
                                            handleGroupPhoto={handleGroupPhotoViewModal}
                                            review={review}
                                        />
                                    ))}
                                    <div ref={reviewEndRef} />
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
            <Modal show={showModalViewPhoto} onHide={() => setShowModalViewPhoto(false)} centered size="lg">
                <Modal.Body className="p-0">
                    <ImageSlider
                        images={groupPhotoViewModal.photos}
                        selectedIndexImage={groupPhotoViewModal.current}
                        handleNextImage={() => {
                            setGroupPhotoViewModal((prev) => ({
                                ...prev,
                                current: prev.current < prev.photos.length - 1 ? prev.current + 1 : 0,
                            }));
                        }}
                        handlePreviousImage={() =>
                            setGroupPhotoViewModal((prev) => ({
                                ...prev,
                                current: prev.current > 0 ? prev.current - 1 : prev.photos.length - 1,
                            }))
                        }
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};
