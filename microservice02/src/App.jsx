import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./Components/Homepage.jsx";
import About from "./Components/About.jsx";
import Login from "./Components/Login.jsx";
import CreateChart from "./Components/CreateChart.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import CreditsPage from "./Components/CreditsPage.jsx";
import Page404 from "./ErrorComponents/Page404.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Homepage />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/dashboard"} element={<Dashboard />} />
                <Route path={"/create-chart"} element={<CreateChart />} />
                <Route path={"/buy-credit"} element={<CreditsPage />} />
                <Route path={"/about"} element={<About />} />
                {/* <Route path={"*"} element={<Page404 />} /> */}
            </Routes>
        </BrowserRouter>
    );
}
export default App;
