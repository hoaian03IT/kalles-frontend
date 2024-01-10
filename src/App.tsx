import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";

import "~/styles/GlobalStyles.scss";
import { publicRoutes } from "./configs/routes";
import { Footer } from "./components/Footer";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <main>
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
                                            <Component />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
