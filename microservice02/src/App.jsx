import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./Components/Homepage.jsx";
import About from "./Components/About.jsx";
import Login from "./Components/Login.jsx";
import CreateChart from "./Components/CreateChart.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import CreditsPage from "./Components/CreditsPage.jsx";
import Page404 from "./ErrorComponents/Page404.jsx";
import MyAccount from "./Components/MyAccount.jsx";
import {useState} from "react";

function App() {

    const [clientEmail,setClientEmail] = useState(" ");

    //This approach doesn't handle refresh very well

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Homepage />} />
                <Route path={"/login"} element={<Login clientEmail={clientEmail} setClientEmail={setClientEmail}/>} />
                <Route path={"/dashboard"} element={<Dashboard clientEmail={clientEmail} setClientEmail={setClientEmail}/>} />
                <Route path={"/create-chart"} element={<CreateChart clientEmail={clientEmail} setClientEmail={setClientEmail}/>} />
                <Route path={"/buy-credit"} element={<CreditsPage clientEmail={clientEmail} setClientEmail={setClientEmail}/>} />
                <Route path={"/about"} element={<About />} />
                <Route path={"/myaccount"} element={<MyAccount clientEmail={clientEmail}/>} setClientEmail={setClientEmail}/>
                <Route path={"*"} element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;