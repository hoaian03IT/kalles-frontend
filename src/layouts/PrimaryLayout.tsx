import { LazyReact } from "~/components/LazyReact";

type Props = {
    children: JSX.Element | JSX.Element[] | string;
};

export default function PrimaryLayout({ children }: Props) {
    return <LazyReact>{children}</LazyReact>;
}
