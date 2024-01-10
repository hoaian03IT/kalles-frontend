import { Suspense } from "react";
import { Loading } from "./Loading";

type Props = {
    children: JSX.Element | JSX.Element[] | string;
};

export const LazyReact = ({ children }: Props) => {
    return <Suspense fallback={<Loading />}>{children}</Suspense>;
};
