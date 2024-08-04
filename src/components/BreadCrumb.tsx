import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "~/styles/components/BreadCrumb.module.scss";
import { MdNavigateNext } from "react-icons/md";

const cx = classNames.bind(styles);

type Props = {
    links: Array<{ label: string; value: string; isCurrent: boolean }>;
};

export const BreadCrumb = ({ links }: Props) => {
    return (
        <div className={cx("wrapper")}>
            <Container>
                <div className={cx("links", "d-flex")}>
                    {links.map((link, index) => (
                        <div key={index} className={cx("link-wrap")}>
                            <Link className={cx("link", link.isCurrent ? "current" : "")} to={link.value}>
                                {link.label}
                            </Link>
                            {index !== links.length - 1 && <MdNavigateNext className="mx-1" />}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};
