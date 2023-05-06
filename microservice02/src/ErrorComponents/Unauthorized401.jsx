import myCharts from "../assets/myCharts.png";
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
function Unauthorized401() {

    const [backHome,setBackHome] = useState(false);
    const [goSignIn,setGoSignIn] = useState(false);

    useEffect(() => {
        document.body.classList.remove("bg-orange-50");
    },[]);

    function handleBackHome() {
        setBackHome(true);
    }

    function handleGoSignIn() {
        setGoSignIn(true);
    }

    return (
        <div className={"text-center mx-auto"}>
            <img className={"bg-fixed w-96 h-64 self-center mx-auto"}
                 src={myCharts}
                 alt={"my charts logo"}
            />
            <h1 className={"text-9xl"}>401</h1>
            <p className={"text-4xl"}>
                You have to sign in in order to access this page.
            </p>
            <span>
                <button className={"text-2xl border-2 rounded border-black p-4 mt-4 hover:shadow-lg hover:bg-sky-200"}
                        onClick={handleBackHome}>
                    Home
                </button>
                <span className={"p-2"}></span>
                <button className={"text-2xl border-2 rounded border-black p-4 mt-4 hover:shadow-lg hover:bg-sky-200"}
                        onClick={handleGoSignIn}>
                    Sign In
                </button>
            </span>
            {backHome && <Navigate to={"/"} replace={true}/>}
            {goSignIn && <Navigate to={"/login"} replace={true}/>}
        </div>
    )
}

export default Unauthorized401;