import { Button, FormGroup, Modal, Spinner } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { RateProduct } from "./RateProduct";
import { FormEvent, useId, useState } from "react";

import classNames from "classnames/bind";
import styles from "~/styles/components/WriteReviewModal.module.scss";
import { getBase64, validateRules } from "~/utils";
import { toast } from "react-toastify";
import { createReviewApi } from "~/api";
import { axiosInstance } from "~/https/axiosInstance";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { useNavigate } from "react-router-dom";
import { cameraPlaceholder } from "~/assets/images/placeholder";
import { Product } from "~/types";
const cx = classNames.bind(styles);

type Props = {
    show: boolean;
    handleClose: () => void;
    product: Product;
    numberReviews: number;
};

const LIMIT_PHOTO = 5;

function WriteReviewModal({ handleClose, show, product, numberReviews }: Props) {
    const { user } = useAppSelector((state) => state.persist);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        rate: 5,
        email: "",
        title: "",
        content: "",
        file: null,
    });
    const [errMsg, setErrMsg] = useState({ email: "" });
    const [handledPhotos, setHandledPhotos] = useState<Array<string>>([]);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const inputEmailId = useId();
    const inputTitleId = useId();
    const inputContentId = useId();
    const inputFileId = useId();

    const axiosJWT = axiosInstance(user, dispatch, navigate);

    const handleSelectRate = (rate: number) => {
        setInputs({ ...inputs, rate: rate });
    };

    const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (handledPhotos.length === LIMIT_PHOTO) {
            toast.warn(`You are just allow to upload maximum ${LIMIT_PHOTO} photos`);
            return;
        }
        try {
            const files = e.currentTarget.files;

            if (files?.length) {
                if (files[0].size / 1024 / 1024 > 10) {
                    toast.warning("Your photo is over 10mb!!");
                    return;
                }
                const base64 = (await getBase64(files[0])) as string;
                !handledPhotos.includes(base64) && setHandledPhotos([...handledPhotos, base64]);
            }
        } catch (error) {
            toast.error("Oops! Something went wrong");
            console.error(error);
        }
    };

    const handleRemoveSelectedPhoto = (photo: string) => {
        setHandledPhotos((prev) => prev.filter((p) => p !== photo));
    };

    const handleSubmitReview = async (e: FormEvent) => {
        e.preventDefault();
        setLoadingSubmit(true);
        let canSubmit = true;
        if (validateRules.email(inputs.email)) {
            setErrMsg({ email: validateRules.email(inputs.email) });
            canSubmit = false;
        } else if (validateRules.required(inputs.email)) {
            setErrMsg({ email: validateRules.required(inputs.email) });
            canSubmit = false;
        } else {
            setErrMsg({ email: "" });
        }

        if (canSubmit) {
            const handler = await createReviewApi(
                {
                    content: inputs.content,
                    email: inputs.email,
                    productId: product._id,
                    rate: inputs.rate,
                    title: inputs.title,
                    photos: handledPhotos,
                },
                axiosJWT
            );
            if (handler) handleClose();
        }
        setLoadingSubmit(false);
    };

    return (
        <Modal show={show} centered={true} onHide={handleClose} size="sm">
            <Modal.Body className={cx("wrapper", "py-3 px-0")}>
                <div className={cx("header", "px-3 d-flex align-items-center justify-content-between")}>
                    <span className="fw-semibold">Rate Us</span>
                    <button className={cx("btn-close")} onClick={handleClose}>
                        <IoMdClose className={cx("ic-close", "fs-4")} />
                    </button>
                </div>
                <div className={cx("content")}>
                    <div className={cx("preview-product", "mx-3 mb-3 p-3 d-flex align-items-center")}>
                        <div className={cx("wrapper-image")}>
                            <img src={product.previewImages[0]} alt="" />
                        </div>
                        <div className="ms-3">
                            <h6 className="limit-line-1 text-secondary">{product.name}</h6>
                            <div className="d-flex align-items-center">
                                <RateProduct rating={product.rate} size="small" />
                                <span className="ms-1 fw-light">
                                    {numberReviews + ` ${numberReviews > 1 ? "reviews" : "review"}`}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx("form", "p-3")}>
                        <form onSubmit={handleSubmitReview}>
                            <FormGroup className={cx("form-group", "d-flex align-items-center")}>
                                <label>Quality</label>
                                <div className="ms-3">
                                    <RateProduct
                                        rating={inputs.rate}
                                        justShow={false}
                                        size="large"
                                        maxStar={5}
                                        handleSelect={handleSelectRate}
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup className={cx("form-group", errMsg.email ? "error" : "")}>
                                <label htmlFor={inputEmailId}>Your email*</label>
                                <input
                                    id={inputEmailId}
                                    type="text"
                                    placeholder="example@domain.com"
                                    value={inputs.email}
                                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                />
                                <span className={cx("err-msg", "limit-line-1")}>{errMsg.email}</span>
                            </FormGroup>
                            <FormGroup className={cx("form-group")}>
                                <label htmlFor={inputTitleId}>Review Title</label>
                                <input
                                    id={inputTitleId}
                                    type="text"
                                    placeholder="Look great"
                                    value={inputs.title}
                                    onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className={cx("form-group")}>
                                <label htmlFor={inputContentId}>Review Content</label>
                                <textarea
                                    rows={3}
                                    id={inputContentId}
                                    placeholder="Write something"
                                    value={inputs.content}
                                    onChange={(e) => setInputs({ ...inputs, content: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className={cx("form-group", handledPhotos.length > 0 ? "d-block" : "d-none")}>
                                <div className={cx("photos-shown")}>
                                    {handledPhotos.map((photo, index) => (
                                        <div key={index} className={cx("wrapper-image")}>
                                            <img key={index} src={photo} alt="" />
                                            <button
                                                className={cx("btn-remove")}
                                                onClick={() => handleRemoveSelectedPhoto(photo)}>
                                                <IoMdClose className="fs-5 text-white" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </FormGroup>
                            <FormGroup className={cx("form-group", "upload-photos", "d-flex align-items-center")}>
                                <label htmlFor={inputFileId} className={cx("wrapper-image")}>
                                    <img src={cameraPlaceholder} alt="" />
                                </label>
                                <label htmlFor={inputFileId} className="ms-2">
                                    <p className="m-0 text-black">Upload Photos</p>
                                    <p className={cx("note", "m-0 text-black-50 fw-light fst-italic")}>
                                        Accept .jpg, .png and max 10MB each
                                        <br />
                                        Limit: 5 photos
                                    </p>
                                </label>
                                <input
                                    id={inputFileId}
                                    onChange={handleSelectFile}
                                    type="file"
                                    className="d-none"
                                    accept=".png, .jpg"
                                    multiple={true}
                                />
                            </FormGroup>
                        </form>
                        <Button className={cx("btn-submit", "mt-4 ms-auto")} onClick={handleSubmitReview}>
                            {loadingSubmit ? (
                                <Spinner size="sm" animation="border" variant="light" />
                            ) : (
                                <span>Submit Your Review</span>
                            )}
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export { WriteReviewModal };
