import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import myCharts from "../assets/myCharts.png";
import {Navigate} from "react-router-dom";
import Notification from "./Notification.jsx";

/*
    Login Component is used to sign in the client with Google.
    Username or email and password will not be created.
 */

function Login() {

    const [clientSignedIn,setClientSignedIn] = useState(false);
    const [serverFail,setServerFail] = useState(false);
    const [visibleNotification, setVisibleNotification] = useState(false);

    async function handleCallBackResponse(response) {
        const cleanClientData = jwt_decode(response.credential)
        //console.log(cleanClientData);
        const obj_req = {
            firstname : cleanClientData.given_name,
            lastname : cleanClientData.family_name,
            email : cleanClientData.email,
            imagePath : cleanClientData.picture

        };

        try {
            const response = await fetch(import.meta.env.VITE_CLIENT_SESSION_CREATE, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(obj_req)
            });

            const authObj= await response.json();
            setClientSignedIn(true);
            sessionStorage.setItem("token",authObj.token);
            sessionStorage.setItem("info_", authObj.info_);
        } catch (error) {
            setServerFail(true);
            setVisibleNotification(true);
        }
    }

    function handleClientStatus() {
        const token = sessionStorage.getItem("token");
        if (token === null || token === undefined) {
            setClientSignedIn(false);
            return;
        }

        fetch(import.meta.env.VITE_CLIENT_SESSION_STATUS, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({token : token})
        }).then(response => {
            if (response.ok) {
                setClientSignedIn(true);
            } else {
                //setServerFail(true);
                setClientSignedIn(false);
                //setVisibleNotification(true);
            }
        }).catch(error => {
            
            //setServerFail(true);
            setVisibleNotification(true);
        });
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

        handleClientStatus();
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
            {visibleNotification && serverFail && <Notification
                                notificationInfo={"info"}
                                notificationTitle={"Server Failure"}
                                notificationMsg={"An unexpected error occurred and Sign In is currently unavailable."}
                                setVisibleNotification={setVisibleNotification}/> }
        </div>
    );
}

export default Login;