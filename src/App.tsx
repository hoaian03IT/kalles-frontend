import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./configs/routes";
import { LazyReact } from "./components/LazyReact";
import { ToastContainer } from "react-toastify";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";
import { ScrollToTop } from "./components/ScrollToTop";

import "react-toastify/dist/ReactToastify.css";
import "~/styles/animations.scss";
import "~/styles/GlobalStyles.scss";
import { Fragment } from "react";

function App() {
    return (
        <div>
            <Routes>
                {publicRoutes.map((route) => {
                    const Component = route.component;
                    const Layout = route.layout !== null ? route.layout : Fragment;

                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <Layout>
                                    <PublicRoute>
                                        <LazyReact>
                                            <ScrollToTop />
                                            <Component />
                                        </LazyReact>
                                    </PublicRoute>
                                </Layout>
                            }
                        />
                    );
                })}
                {/* {privateRoutes.map((route) => {
                    const Component = route.component;
                    const Layout = route.layout;

                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <Layout>
                                    <PrivateRoute>
                                        <LazyReact>
                                            <Component />
                                        </LazyReact>
                                    </PrivateRoute>
                                </Layout>
                            }
                        />
                    );
                })} */}
            </Routes>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
}

export default App;
