import { Button, Col, FormControl, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP } from "react-icons/fa6";

import styles from "~/styles/Footer.module.scss";
import { useState } from "react";

const links = [
    {
        title: "about",
        children: [
            { title: "Our History", path: "/" },
            { title: "Sourcing & Ingredients", path: "/" },
            { title: "Packaging philosophy", path: "/" },
            { title: "Customer reviews", path: "/" },
            { title: "The Newest List", path: "/" },
        ],
    },
    {
        title: "help",
        children: [
            { title: "Newsletter", path: "/" },
            { title: "Community Guidelines", path: "/" },
            { title: "Advertise Online", path: "/" },
            { title: "Privacy Notice", path: "/" },
            { title: "Terms & Conditions", path: "/" },
        ],
    },
    {
        title: "quick links",
        children: [
            { title: "Latest News", path: "/" },
            { title: "My Account", path: "/" },
            { title: "Size Guide", path: "/" },
            { title: "FAQs", path: "/" },
        ],
    },
];

const socialNetworks = [
    { name: "Facebook", icon: FaFacebookF, href: "https://www.facebook.com/" },
    { name: "Twitter", icon: FaXTwitter, href: "https://www.twitter.com" },
    { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com" },
    { name: "Linkedin", icon: FaLinkedinIn, href: "https://www.linkedin.com" },
    { name: "Pinterest", icon: FaPinterestP, href: "https://www.pinterest.com" },
];

export const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubmitSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <footer className={styles.wrapper}>
            <Row className={`g-0 ${styles.footer}`}>
                <Col sm={12} lg={9}>
                    <Row>
                        {links.map((link, index) => (
                            <Col key={index} xs={6} md={4} className="d-flex flex-column py-4">
                                <p className="fs-6 text-black fw-normal text-uppercase">{link.title}</p>
                                {link.children.map((item, index) => (
                                    <Link key={index} to={item.path} className={styles["item-link"]}>
                                        {item.title}
                                    </Link>
                                ))}
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col sm={12} lg={3} className="py-4">
                    <p className="fs-6 text-black fw-normal text-uppercase">follow us</p>
                    <div className={styles["social-networks"]}>
                        {socialNetworks.map((item) => {
                            const Icon = item.icon;
                            return (
                                <OverlayTrigger
                                    key={item.name}
                                    placement="top"
                                    delay={{ show: 300, hide: 200 }}
                                    overlay={<Tooltip>Follow on {item.name}</Tooltip>}>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        className={styles["icon-wrapper"]}
                                        rel="noreferrer">
                                        <Icon />
                                    </a>
                                </OverlayTrigger>
                            );
                        })}
                    </div>
                    <p className="fs-6 text-black-50 pt-4">
                        Subscribe to our newsletter & get 10% off on your first order.
                    </p>
                    <form className={styles["form-subscribe"]} onSubmit={(e) => handleSubmitSubscribe(e)}>
                        <FormControl
                            type="text"
                            placeholder="Your email address"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* add email validation after times */}
                        <Button type="submit" disabled={email ? false : true} className={styles.button}>
                            Subscribe
                        </Button>
                    </form>
                </Col>
            </Row>
            <div className="text-black-50 fw-light text-center p-3">
                All Rights Reserved © 2024
                <a
                    className="text-black text-decoration-none"
                    href="https://themeforest.net/item/kalles-clean-versatile-shopify-theme/26320622?irgwc=1&clickid=V%3AXXeFW96xyPR50wq8ybryFIUkH2hzUB7xSw100&iradid=275988&irpid=1288411&iradtype=ONLINE_TRACKING_LINK&irmptype=mediapartner&mp_value1=&utm_campaign=af_impact_radius_1288411&utm_medium=affiliate&utm_source=impact_radius">
                    &nbsp;Kalles&nbsp;
                </a>
                store - Developed by
                <a
                    className="text-black text-decoration-none"
                    href="https://the4.co/?utm_source=Kalles-Demo&utm_medium=Copyright">
                    &nbsp;The4&nbsp;
                </a>
            </div>
        </footer>
    );
};
