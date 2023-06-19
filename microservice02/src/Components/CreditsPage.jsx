import MenuBar from "./MenuBar.jsx";
import {useEffect, useState} from "react";
import Unauthorized401 from "../ErrorComponents/Unauthorized401.jsx";
import useAuth from "../Hooks/useAuth.js";
import axios from "axios";
import Notification from "./Notification.jsx";

function CreditsPage() {

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [availableCharts,setAvailableCharts] = useState(0);
    const [buyCompleteVisible,setBuyCompleteVisible] = useState(false);
    const [buyIncompleteVisible,setBuyIncompleteVisible] = useState(false);
    const clientSignedIn = useAuth();

    const getInfo = () => {

        const info_ = sessionStorage.getItem("info_");

        const url = `http://${import.meta.env.VITE_MAESTRO}/api/client/info`;

        axios.post(url, {
            info_ : info_
        }, {
            headers: {
                "Content-Type" : "application/json"
            }
        }).then(response => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setAvailableCharts(response.data.credit);

        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        //const token = sessionStorage.getItem("token")
        getInfo();
    },[]);

    function handleBuy(credit) {

        const info_ = sessionStorage.getItem("info_");
        const token = sessionStorage.getItem("token");

        const url = `http://${import.meta.env.VITE_MAESTRO}/api/client/buy`;

        axios.post(url, {
            info_ : info_,
            token : token,
            credit : credit
        }, {
            headers: {
                "Content-Type" : "application/json"
            }
        }).then(response => {
            setAvailableCharts(availableCharts + credit);
            setBuyCompleteVisible(true);
        }).catch(error => {
            setBuyIncompleteVisible(true);
        })
    }


    if (clientSignedIn) {
        return  (
            <div>
                <MenuBar page={"buy-credits"} />

                <h1 className={"text-center text-2xl p-4 italic"}>If it's time to fill up the tank, we got you!</h1>

                <div className={"p-2 flex align-items space-x-2"}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </span>
                    <span className={"text-lg font-medium"}>{firstName} </span>
                    <span className={"text-lg font-medium"}>{lastName} | </span>

                    <span className={"text-lg font-medium"}>Available Charts: </span>
                    <span className={"text-lg font-medium"}>{availableCharts}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                </div>

                <div className={"grid grid-cols-1 sm:grid-cols-4 gap-4 place-items-center p-4"}>
                    <div className={"block border-black rounded h-32 w-40 p-4 border-2 text-center hover:cursor-pointer bg-amber-50 hover:bg-amber-200 shadow hover:shadow-xl transition duration-150 ease-in-out"}
                         onClick={() => handleBuy(5)}>
                        <span className={"block text-2xl p-2"}>5</span>
                        <span className={"block text-lg italic p-2"}>$0.99</span>
                    </div>

                    <div className={"block border-black rounded h-32 w-40 p-4 border-2 text-center hover:cursor-pointer bg-amber-50 hover:bg-amber-200 shadow hover:shadow-xl transition duration-150 ease-in-out"}
                         onClick={ () => handleBuy(10)}>
                        <span className={"block text-2xl p-2"}>10</span>
                        <span className={"block  text-lg italic p-2"}>$1.99</span>
                    </div>

                    <div className={"block border-black rounded h-32 w-40 p-4 border-2 text-center hover:cursor-pointer bg-amber-50 hover:bg-amber-200 shadow hover:shadow-xl transition duration-150 ease-in-out"}
                         onClick={() => handleBuy(20)}>
                        <span className={"block text-2xl p-2"}>20</span>
                        <span className={"block text-lg italic p-2"}>$3.99</span>
                    </div>

                    <div className={"block border-black rounded h-32 w-40 p-4 border-2 text-center hover:cursor-pointer bg-amber-50 hover:bg-amber-200 shadow hover:shadow-xl transition duration-150 ease-in-out"}
                         onClick={() => handleBuy(40)}>
                        <span className={"block text-2xl p-2"}>40</span>
                        <span className={"block text-lg italic p-2"}>$4.99</span>
                    </div>
                </div>
                {buyCompleteVisible && <Notification notificationTitle={"Buy Complete"}
                                                     notificationMsg={"Your order has been completed"}
                                                     setVisibleNotification={setBuyCompleteVisible}
                                                     notificationInfo={"success"}/>}
                {buyIncompleteVisible && <Notification notificationTitle={"Buy Incomplete"}
                                                       notificationInfo={"info"}
                                                       setVisibleNotification={setBuyIncompleteVisible}
                                                       notificationMsg={"There was a problem with your order."} /> }
            </div>
        );
    } else {
        return (<Unauthorized401 />);
    }
}

export default CreditsPage;