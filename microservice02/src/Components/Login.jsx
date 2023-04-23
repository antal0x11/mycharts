import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import myCharts from "../assets/myCharts.png";
import {Navigate} from "react-router-dom";

function Login() {

    const [clientSignedIn,setClientSignedIn] = useState(false)

    function handleCallBackResponse(response) {
        const cleanClientData = jwt_decode(response.credential)
        console.log(cleanClientData);
        setClientSignedIn(true);
    }

    function handleLogout(response) {
        //document.cookie = "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        //TODO handle logout
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id : import.meta.env.VITE_GOOGLE_AUTHENTICATION,
            callback: handleCallBackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInBtn"),
            {
                type: "standard", //icon
                theme: "outline",
                size: "large",
                locale: "en",
                width : "250"
            }
        )
    },[]);


    return (

        <div
            className={"box-border h-auto w-96 border-2 border-black rounded mx-auto mt-16"}>

            <img src={myCharts}
                 alt={"myChartsLogo"}
                 className={"bg-local "}/>

            <h2 className={"text-xl text-center m-6"}>
                Welcome to myCharts
            </h2>
            <p className={"font-light m-5"}>
                By signing in with your google account, you agree to
                provide us with your email address. Personal data such
                as your email address are strictly confidential. If you
                wish to delete your private information, contact with us
                at <span className={"underline"}>info@mycharts.com</span>
            </p>
            <div id={"signInBtn"} className={"w-64 py-10 px-16"}></div>
            {clientSignedIn && <Navigate to={"/dashboard"} replace={true} />}
        </div>
    );
}

export default Login;