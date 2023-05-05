import MenuBar from "./MenuBar.jsx";
import person from "../assets/person.png";
import {useEffect, useState} from "react";

function MyAccount({clientEmail}) {

    const [firstName,setFirstName] = useState("Lisa");
    const [lastName,setLastName] = useState("Blue");
    const [email,setEmail] = useState("lisablue@gmail.com");
    const [chartsCreated,setChartsCreated] = useState(10);
    const [availableCharts,setAvailableCharts] = useState(15);
    const [lastLogin,setLastLogin] = useState("Thursday 21/4/2023 09:45:08");
    const [clientSignedIn,setClientSignedIn] = useState(0);

    const handleAuth = () => {
        console.log(clientEmail);
        fetch("http://localhost:9000/api/auth/status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: clientEmail
            })
        }).then(response => {
            if(response.ok) {
                setClientSignedIn(0);
            } else {
                setClientSignedIn(2);
            }
        }).catch( error => {
            console.log(error);
        })
    }

    useEffect(() => {
        handleAuth();
        document.body.classList.add("bg-orange-50");

        return () => {
          document.body.classList.remove("bg-orange-50");
        };
    }, [])


    // TODO fix size for small screens
    if (clientSignedIn === 0) {
        return (
            <div>
                <MenuBar page={"myaccount"}/>

                <div
                    className={"container bg-gray-100 mx-auto rounded h-auto w-4/12 mt-8 border-2 border-black shadow-xl shadow-rose-50 shadow-opacity-50"}>
                <span className={"p-4 flex justify-items-center"}>
                    <img
                        src={person}
                        alt={"Profile picture"}
                        className={"rounded-full w-40 h-40 border-2 border-black shadow-md mx-auto"}/>
                </span>
                    <div className={"p-2 flex align-items space-x-2"}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                        </svg>
                    </span>
                        <span className={"text-lg font-medium"}>{firstName} </span>
                        <span className={"text-lg font-medium"}>{lastName}</span>
                    </div>

                    <div className={"p-2 flex align-items space-x-2"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                        </svg>


                        <span className={"text-lg font-medium"}>{email}</span>
                    </div>

                    <div className={"p-2 flex align-items space-x-2"}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 24 24"
                             strokeWidth={1.5}
                             stroke="currentColor"
                             className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
                        </svg>
                    </span>
                        <span className={"text-lg font-medium"}>Charts Created: </span>
                        <span className={"text-lg font-medium"}>{chartsCreated}</span>
                    </div>

                    <div className={"p-2 flex align-items space-x-2"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                        </svg>

                        <span className={"text-lg font-medium"}>Available Charts: </span>
                        <span
                            className={"text-lg font-medium hover:text-3xl hover:cursor-pointer"}>{availableCharts}</span>
                    </div>

                    <div className={"p-2 flex align-items space-x-2"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                        </svg>

                        <span className={"text-lg font-medium"}>Last Seen:</span>
                        <span className={"text-lg font-medium"}>{lastLogin}</span>
                    </div>
                </div>
            </div>
        );
    } else if (clientSignedIn === 2){
        return (
            <h1 className={"text-lg"}>Unauthorised</h1>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default MyAccount;