import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";

type Props = {
    children: JSX.Element | JSX.Element[] | string;
};

export default function PrimaryLayout({ children }: Props) {
    return (
        <div className="vh-100 d-flex flex-column justify-content-between">
            <Header type="sticky" />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
