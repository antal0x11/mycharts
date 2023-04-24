import {Link, Navigate} from "react-router-dom";
import {useEffect, useState} from "react";

/*
    MenuBar Component creates a menu bar to help the authenticated client
    navigate.
 */

function MenuBar () {


    const [smallScreenMenuIsHidden,setSmallScreeMenuIsHidden] = useState(false);
    const [clientSignedOut, setclientSignedOut] = useState(false);

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_AUTHENTICATION
        });
    },[]);
    function handleLogout(response) { //TODO fix:just sign out dont revoke
       // google.accounts.id.revoke(import.meta.env.VITE_TEST_EMAIL, done => {
        //    console.log('consent revoked');
        //});
        setclientSignedOut(true);
    }

    function handleMenuDisplay() {
        (smallScreenMenuIsHidden) ? setSmallScreeMenuIsHidden(false) : setSmallScreeMenuIsHidden(true);
    }


    //TODO color check, add links


    return (
        <nav className={"bg-blue-400 w-full"}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button"
                                className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                                onClick={handleMenuDisplay}>

                            <svg className="block h-6 w-6"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke-width="1.5"
                                 stroke="currentColor"
                                 aria-hidden="true">
                                <path stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                            </svg>

                        </button>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start bg-blue-400">
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">

                            <Link
                                to={"/dashboard"}
                                className="hover:bg-white hover:text-black text-white px-3 py-2 text-sm font-medium">
                                My Charts
                            </Link>

                            <Link
                                to={"/create-chart"}
                                className="text-white hover:bg-white hover:text-black px-3 py-2 text-sm font-medium">
                                Create Chart
                            </Link>

                            <Link
                                to={"/myaccount"}
                                className="hover:bg-white hover:text-black text-white px-3 py-2 text-sm font-medium">
                                My Account
                            </Link>

                            <Link
                                to={"/buy-credit"}
                                className="hover:bg-white hover:text-black text-white px-3 py-2 text-sm font-medium">
                                Buy Credits
                            </Link>

                            <Link
                                to={"/about"}
                                className="hover:bg-white hover:text-black text-white px-3 py-2 text-sm font-medium">
                                About
                            </Link>

                            <button
                                className="hover:bg-white hover:text-black text-white px-3 py-2 text-sm font-medium"
                                onClick={handleLogout}>
                                Sign Out
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            {smallScreenMenuIsHidden &&
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">

                        <Link to={"/dashboard"}
                            className="text-white hover:bg-white hover:text-black block rounded-md px-3 py-2 text-base font-medium">
                            My Charts
                        </Link>

                        <Link to={"/create-chart"}
                              className="text-white hover:bg-white hover:text-black block rounded-md px-3 py-2 text-base font-medium">
                            Create Chart
                        </Link>

                        <Link to={"/myaccount"}
                            className="text-white hover:bg-white hover:text-black block rounded-md px-3 py-2 text-base font-medium">
                            My Account
                        </Link>

                        <Link to={"/buy-credit"}
                            className="text-white hover:bg-white hover:text-black block rounded-md px-3 py-2 text-base font-medium">
                            Buy Credits
                        </Link>

                        <Link to={"/about"}
                            className="text-white hover:bg-white hover:text-black block rounded-md px-3 py-2 text-base font-medium">
                            About
                        </Link>

                        <span
                            className="text-white hover:bg-white hover:text-black block hover:cursor-pointer rounded-md px-3 py-2 text-base font-medium"
                            onClick={handleLogout}>
                            Sign Out
                        </span>
                    </div>
            </div>
            }
            {clientSignedOut && <Navigate to={"/"} replace={true}/>}
    </nav>
    );
}

export default MenuBar;