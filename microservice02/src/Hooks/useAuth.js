import {useEffect, useState} from "react";

function useAuth() {
    const [clientSignInStatus, setClientSignInStatus] = useState();

    useEffect(() => {
        const token = sessionStorage.getItem("token")

        fetch(import.meta.env.VITE_CLIENT_SESSION_STATUS, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({token : token})
        }).then(response => {
            if (response.ok) {
                setClientSignInStatus(true);
            } else {
                setClientSignInStatus(false);
            }
        }).catch(error => {
            setClientSignInStatus(false);
        })
    },[]);

    return clientSignInStatus;
}

export default useAuth;