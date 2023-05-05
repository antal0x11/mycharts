import {Link, Navigate} from "react-router-dom";
import {useState} from "react";

/*
    MenuBar Component creates a menu bar to help the authenticated client
    navigate.
 */

function MenuBar ({page, clientEmail, setClientEmail}) {


    const [smallScreenMenuIsHidden,setSmallScreeMenuIsHidden] = useState(false);
    const [markPage,setMarkPage] = useState(page);
    const [clientSignedOut, setClientSignedOut] = useState(false);

    // useEffect(() => {
    //     google.accounts.id.initialize({
    //         client_id: import.meta.env.VITE_GOOGLE_AUTHENTICATION
    //     });
    // },[]);
    function handleLogout() { //TODO fix:just sign out dont revoke
        google.accounts.id.revoke(import.meta.env.VITE_TEST_EMAIL, () => {
            console.log('consent revoked');
        });

        google.accounts.id.disableAutoSelect();//TODO FIX ISSUE

        fetch("http://localhost:9000/api/auth/signout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: clientEmail
            })
        }).then(response => {
            if(response.ok) {
                setClientSignedOut(true);
                setClientEmail(null);
            }
        }).catch( error => {
            console.log(error);
        })
    }

    function handleMenuDisplay() {
        (smallScreenMenuIsHidden) ? setSmallScreeMenuIsHidden(false) : setSmallScreeMenuIsHidden(true);
    }


    //TODO color check, add links


    return (
        <nav className={"bg-orange-100 w-full"}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button"
                                className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-orange-200 hover:text-black"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                                onClick={handleMenuDisplay}>

                            <svg className="block h-6 w-6"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth="1.5"
                                 stroke="currentColor"
                                 aria-hidden="true">
                                <path strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                            </svg>

                        </button>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start bg-orange-100">
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">

                            {markPage === "dashboard"  &&
                                <Link
                                    to={"/dashboard"}
                                    className="bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                    My Charts
                                </Link>
                            }

                            {markPage !== "dashboard"  &&
                                <Link
                                    to={"/dashboard"}
                                    className="hover:bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                    My Charts
                                </Link>
                            }

                            {markPage === "create-chart" &&
                                <Link
                                    to={"/create-chart"}
                                    className="bg-white hover:text-black px-3 py-2 text-sm font-medium">
                                    Create Chart
                                </Link>
                            }

                            {markPage !== "create-chart" &&
                                <Link
                                    to={"/create-chart"}
                                    className="text-black hover:bg-white hover:text-black px-3 py-2 text-sm font-medium">
                                    Create Chart
                                </Link>
                            }

                            {markPage === "myaccount" &&
                                <Link
                                    to={"/myaccount"}
                                    className="bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                    My Account
                                </Link>
                            }

                            {markPage !== "myaccount" &&
                                <Link
                                    to={"/myaccount"}
                                    className="hover:bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                    My Account
                                </Link>
                            }

                            { markPage === "buy-credits" &&
                                <Link
                                    to={"/buy-credit"}
                                    className="bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                    Buy Credits
                                </Link>
                            }

                            { markPage !== "buy-credits" &&
                                <Link
                                    to={"/buy-credit"}
                                    className="hover:bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                    Buy Credits
                                </Link>
                            }

                            { markPage === "/about" &&
                                <Link
                                    to={"/about"}
                                    className="bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                    About
                                </Link>
                            }

                            { markPage !== "/about" &&
                                <Link
                                    to={"/about"}
                                    className="hover:bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                    About
                                </Link>
                            }

                            <button
                                className="hover:bg-white hover:text-black text-black px-3 py-2 text-sm font-medium"
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
                            className="text-black hover:bg-white hover:text-black block rounded-md px-3 py-2 text-base font-medium">
                            My Charts
                        </Link>

                        <Link to={"/create-chart"}
                              className="text-black hover:bg-white hover:text-black block rounded-md px-3 py-2 text-base font-medium">
                            Create Chart
                        </Link>

                        <Link to={"/myaccount"}
                            className="text-black hover:bg-white hover:text-black block rounded-md px-3 py-2 text-base font-medium">
                            My Account
                        </Link>

                        <Link to={"/buy-credit"}
                            className="text-black hover:bg-white hover:text-black block rounded-md px-3 py-2 text-base font-medium">
                            Buy Credits
                        </Link>

                        <Link to={"/about"}
                            className="text-black hover:bg-white hover:text-black block rounded-md px-3 py-2 text-base font-medium">
                            About
                        </Link>

                        <span
                            className="text-black hover:bg-white hover:text-black block hover:cursor-pointer rounded-md px-3 py-2 text-base font-medium"
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