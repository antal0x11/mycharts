function Notification({notificationInfo,notificationTitle, notificationMsg, setVisibleNotification}) {

    return (
        <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
                <div className="rounded-lg shadow-xs overflow-hidden">
                    <div className="p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">

                                {notificationInfo === "success" &&
                                    <svg className="h-6 w-6 text-green-400"
                                         xmlns="http://www.w3.org/2000/svg"
                                         fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M5 13l4 4L19 7" />
                                    </svg>
                                }

                                {notificationInfo === "errors" &&
                                        <svg className={"h-6 w-6 text-red-500"}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        >
                                        <path strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                                    </svg>
                                }

                                {notificationInfo === "info" &&
                                    <svg className={"h-6 w-6 text-red-500"}
                                         xmlns="http://www.w3.org/2000/svg"
                                         fill="none"
                                         viewBox="0 0 24 24"
                                         strokeWidth="1.5"
                                         stroke="currentColor"
                                        >
                                        <path strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                                    </svg>
                                }

                            </div>
                            <div className="ml-3 w-0 flex-1 pt-0.5">
                                <p className="text-sm leading-5 font-medium text-gray-900">{notificationTitle}</p>
                                <p className="mt-1 text-sm leading-5 text-gray-500">{notificationMsg}</p>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex">
                                <button className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                                        onClick={() => setVisibleNotification(false)}>
                                    <svg className="h-5 w-5"
                                         viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M10 9.707l3.536-3.536 1.414 1.414L11.414 11l3.536 3.536-1.414 1.414L10 12.414l-3.536 3.536-1.414-1.414L8.586 11 5.05 7.464l1.414-1.414L10 9.707z"
                                              clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification;