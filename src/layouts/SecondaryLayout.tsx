import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { LazyReact } from "~/components/LazyReact";

type Props = {
    children: JSX.Element | JSX.Element[] | string;
};

export default function SecondaryLayout({ children }: Props) {
    return (
        <div className="vh-100 d-flex flex-column justify-content-between">
            <Header type="fixed" />
            <main>
                <LazyReact>{children}</LazyReact>
            </main>
            <Footer />
        </div>
    );
}
