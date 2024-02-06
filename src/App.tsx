import { BrowserRouter, Route, Routes } from "react-router-dom";
import "~/styles/animations.scss";
import "~/styles/GlobalStyles.scss";
import { publicRoutes } from "./configs/routes";
import { LazyReact } from "./components/LazyReact";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {publicRoutes.map((route) => {
                        const Component = route.component;
                        const Layout = route.layout;

                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <Layout>
                                        <LazyReact>
                                            <Component />
                                        </LazyReact>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
