import { Suspense } from "react";
import { Loading } from "./Loading";

type Props = {
    children: JSX.Element | JSX.Element[] | string;
};

export const LazyReact = ({ children }: Props) => {
    return (
        <Suspense
            fallback={
                <div className="text-center">
                    <Loading />
                </div>
            }>
            {children}
        </Suspense>
    );
};
