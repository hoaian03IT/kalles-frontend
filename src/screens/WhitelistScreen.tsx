import styles from "~/styles/screens/WhitelistScreen.module.scss";
import classNames from "classnames/bind";
import { HeaderBanner } from "~/components/HeaderBanner";
import { bgBanner3 } from "~/assets/images/background-banner";
import { Container, Row } from "react-bootstrap";
import { ChangeLayoutProductBtns } from "~/components/ChangeLayoutProductBtns";
import { useEffect, useState } from "react";
import { SubProduct } from "~/types";
import { addNewToWhitelistApi, fetchAllWhitelistApi, removeFromWhitelistApi } from "~/api/whitelist";
import { axiosInstance } from "~/https/axiosInstance";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { useNavigate } from "react-router-dom";
import { CardProduct } from "~/components/CardProduct";
import emptyImg from "~/assets/images/emptypng.png";

const cx = classNames.bind(styles);

function WhitelistScreen() {
    const userState = useAppSelector((state) => state.persist.user);

    const [layout, setLayout] = useState<2 | 3 | 4>(4);
    const [products, setProducts] = useState<SubProduct[]>([]);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const axiosJWT = axiosInstance(userState, dispatch, navigate);

    useEffect(() => {
        getWhitelist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getWhitelist = async () => {
        const products = await fetchAllWhitelistApi(axiosJWT);
        setProducts(products);
    };

    const removeNewFromWhitelist = async (productId: string) => {
        await removeFromWhitelistApi(axiosJWT, productId);
    };

    return (
        <div className={cx("wrapper")}>
            <HeaderBanner img={bgBanner3} title="your whitelist" />
            <Container className="mt-4">
                {products.length > 0 ? (
                    <>
                        <Row>
                            <ChangeLayoutProductBtns layout={layout} setLayout={setLayout} />
                        </Row>
                        <Row className="py-5">
                            {products.map((product) => (
                                <CardProduct info={product} favoriteStatus={true} />
                            ))}
                        </Row>
                    </>
                ) : (
                    <div className={cx("empty", "py-5")}>
                        <p>Sorry! Your whitelist is empty</p>
                        <img draggable={false} src={emptyImg} alt="" />
                    </div>
                )}
            </Container>
        </div>
    );
}

export default WhitelistScreen;
