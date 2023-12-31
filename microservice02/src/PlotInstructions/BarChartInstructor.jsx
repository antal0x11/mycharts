import {Link} from "react-router-dom";

function BarChartInstructor({hideChart, title}) {

    return (
        <div className={"mb-4 sm:row-start-2 sm:col-start-3 box-border border-l-neutral-950 border-r-transparent border-b-transparent border-t-transparent h-12- w-9/12 p-4 border-2"}>
            <h2
                className={"text-center font-bold mb-4"}>
                Instructions for Creating a {title} Chart
            </h2>
            <ul
                className={"list-disc pl-4 text-justify text-ellipsis whitespace-normal break-keep tracking-wide"}>
                <li className={"pt-2"}> Login with your Google Account. </li>
                <li className={"pt-2"}> Create a csv file with your data. </li>
                <li className={"pt-2"}> Upload your file to the form and your chart will be crafted. </li>
            </ul>

            <div className={"flex space-x-4"}>
                <button
                    className={"mt-4 bottom-0 left-0 bg-black text-white font-light py-2 px-8 rounded"}
                    onClick={hideChart}>

                    Close
                </button>

                <Link to={"/login"}>
                    <button
                        className={"mt-4 bottom-0 right-0 bg-black text-white font-light py-2 px-8 rounded"}>

                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default BarChartInstructor;