import styles from "~/styles/screens/WhitelistScreen.module.scss";
import classNames from "classnames/bind";
import { HeaderBanner } from "~/components/HeaderBanner";
import { bgBanner3 } from "~/assets/images/background-banner";
import { Container, Row } from "react-bootstrap";
import { ChangeLayoutProductBtns } from "~/components/ChangeLayoutProductBtns";
import { useEffect, useState } from "react";
import { SubProduct } from "~/types";
import { useAppSelector } from "~/app/hooks";
import { CardProduct } from "~/components/CardProduct";
import emptyImg from "~/assets/images/emptypng.png";

const cx = classNames.bind(styles);

function WhitelistScreen() {
    const whitelistState = useAppSelector((state) => state.whitelist);
    const [layout, setLayout] = useState<2 | 3 | 4>(4);
    const [products, setProducts] = useState<SubProduct[]>([]);

    return (
        <div className={cx("wrapper")}>
            <HeaderBanner img={bgBanner3} title="your whitelist" />
            <Container className="mt-4">
                {whitelistState.whitelist.length > 0 ? (
                    <>
                        <Row>
                            <ChangeLayoutProductBtns layout={layout} setLayout={setLayout} />
                        </Row>
                        <Row className="py-5">
                            {whitelistState.whitelist.map((product) => (
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
