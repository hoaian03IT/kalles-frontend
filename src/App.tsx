import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";

import "~/styles/GlobalStyles.scss";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <div className="main"></div>
            </BrowserRouter>
        </div>
    );
}

export default App;
