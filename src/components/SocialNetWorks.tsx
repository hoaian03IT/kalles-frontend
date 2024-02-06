import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP } from "react-icons/fa6";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import classNames from "classnames/bind";

import styles from "~/styles/SocialNetWorks.module.scss";

const cx = classNames.bind(styles);

const socialNetworks = [
    { name: "Facebook", icon: FaFacebookF, href: "https://www.facebook.com/" },
    { name: "Twitter", icon: FaXTwitter, href: "https://www.twitter.com" },
    { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com" },
    { name: "Linkedin", icon: FaLinkedinIn, href: "https://www.linkedin.com" },
    { name: "Pinterest", icon: FaPinterestP, href: "https://www.pinterest.com" },
];

type Props = {
    type?: "border" | "borderless";
    colorHover?: "red" | "blue" | "black";
};

export const SocialNetworks = ({ colorHover = "black", type = "borderless" }: Props) => {
    return (
        <div className={cx("social-networks", type)}>
            {socialNetworks.map((item) => {
                const Icon = item.icon;
                return (
                    <OverlayTrigger
                        key={item.name}
                        placement="top"
                        delay={{ show: 300, hide: 200 }}
                        overlay={<Tooltip>Follow on {item.name}</Tooltip>}>
                        <a href={item.href} target="_blank" className={cx("icon-wrapper", colorHover)} rel="noreferrer">
                            <Icon />
                        </a>
                    </OverlayTrigger>
                );
            })}
        </div>
    );
};
