import {useEffect, useState} from "react";
import myCharts from "../assets/myCharts.png";
import {Link} from "react-router-dom";
import MenuBar from "./MenuBar.jsx";

function About () {

    const [authenticated,setAuthenticated] = useState(false);

    return (
        <div className={"place-self-center"}>
            {authenticated && <MenuBar page={"/about"}/>}
            <img src={myCharts} className={"bg-fixed block mx-auto"} alt={"myChartsLog"}/>
            <h1
                className={"text-4xl font-thin text-center mb-4 mt-4"}
            >
                About myCharts
            </h1>

            <div className={"pr-3.5 pl-3.5 w-auto h-30 bg-orange-50 grid"}>
                <h2
                    className={"text-2xl font-thin text-left mb-4 font-normal italic"}
                >
                    Who we are at myCharts
                </h2>

                <p
                    className={"overflow-auto"}
                >
                    At myCharts we have one mission, to provide you with quality charts
                    so you can describe, explain, demonstrate and analyze your data with
                    no extra effort.So, what are you waiting for?
                    <Link to={"/"} className={"text-blue-500"}> Select a chart type</Link> and
                    create effortless charts with myCharts.
                </p>

                <h2
                    className={"text-2xl font-thin text-left mb-2 mt-4 font-normal italic"}
                >
                    Pricing
                </h2>

                <table className={"border-2 border-collapse border-amber-950 border-collapse w-3/4 place-self-center text-center"} >
                    <caption
                        className={"caption-bottom text-center text-sm"}
                    >
                        *Charts Pricing Tax Not Included
                    </caption>
                    <thead>
                        <tr className={"bg-orange-100"}>
                            <th className={"border p-2 border-black"}>Chart Type</th>
                            <th className={"border p-2 border-black"}>Price</th>
                            <th className={"border p-2 border-black"}>Available Charts</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={"bg-yellow-100"}>
                            <td className={"border p-2 border-black"}>Simple Plot</td>
                            <td className={"border p-2 border-black"}>$0.99</td>
                            <td className={"border p-2 border-black"}>5</td>
                        </tr>
                        <tr className={"bg-yellow-100"}>
                            <td className={"border p-2 border-black"}>Simple Plot</td>
                            <td className={"border p-2 border-black"}>$1.99</td>
                            <td className={"border p-2 border-black"}>10</td>
                        </tr>
                        <tr className={"bg-yellow-100"}>
                            <td className={"border p-2 border-black"}>Simple Plot</td>
                            <td className={"border p-2 border-black"}>$3.99</td>
                            <td className={"border p-2 border-black"}>20</td>
                        </tr>
                        <tr className={"bg-yellow-100"}>
                            <td className={"border p-2 border-black"}>Simple Plot</td>
                            <td className={"border p-2 border-black"}>$4.99</td>
                            <td className={"border p-2 border-black"}>50</td>
                        </tr>

                    </tbody>
                </table>

                <table className={"border-2 border-collapse border-amber-950 border-collapse w-3/4 place-self-center text-center mt-5"}>
                    <caption
                        className={"caption-bottom text-center text-sm"}
                    >
                        *Charts Pricing Tax Not Included
                    </caption>
                    <thead>
                        <tr className={"bg-orange-100"}>
                            <th className={"border p-2 border-amber-950"}>Chart Type</th>
                            <th className={"border p-2 border-amber-950"}>Price</th>
                            <th className={"border p-2 border-amber-950"}>Available Charts</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={"bg-yellow-100"}>
                            <td className={"border p-2 border-amber-950"}>Bar Label</td>
                            <td className={"border p-2 border-amber-950"}>$1.29</td>
                            <td className={"border p-2 border-amber-950"}>5</td>
                        </tr>

                        <tr className={"bg-yellow-100"}>
                            <td className={"border p-2 border-amber-950"}>Bar Label</td>
                            <td className={"border p-2 border-amber-950"}>$2.29</td>
                            <td className={"border p-2 border-amber-950"}>10</td>
                        </tr>

                        <tr className={"bg-yellow-100"}>
                            <td className={"border p-2 border-amber-950"}>Bar Label</td>
                            <td className={"border p-2 border-amber-950"}>$3.29</td>
                            <td className={"border p-2 border-amber-950"}>20</td>
                        </tr>

                        <tr className={"bg-yellow-100"}>
                            <td className={"border p-2 border-amber-950"}>Bar Label</td>
                            <td className={"border p-2 border-amber-950"}>$6.99</td>
                            <td className={"border p-2 border-amber-950"}>50</td>
                        </tr>
                    </tbody>
                </table>

                <table className={"border-2 border-collapse border-amber-950 border-collapse w-3/4 place-self-center text-center mt-5"}>
                    <caption
                        className={"caption-bottom text-center text-sm"}
                    >
                        *Charts Pricing Tax Not Included
                    </caption>
                    <thead>
                        <tr className={"bg-orange-100"}>
                            <th className={"border p-2 border-amber-950"}>Chart Type</th>
                            <th className={"border p-2 border-amber-950"}>Price</th>
                            <th className={"border p-2 border-amber-950"}>Available Charts</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={"bg-yellow-100"}>
                            <td className={"border p-2 border-amber-950"}>Scatter Plot</td>
                            <td className={"border p-2 border-amber-950"}>$2.29</td>
                            <td className={"border p-2 border-amber-950"}>5</td>
                        </tr>

                        <tr className={"bg-yellow-100"}>
                            <td className={"border p-2 border-amber-950"}>Scatter Plot</td>
                            <td className={"border p-2 border-amber-950"}>$3.29</td>
                            <td className={"border p-2 border-amber-950"}>10</td>
                        </tr>

                        <tr className={"bg-yellow-100"}>
                            <td className={"border p-2 border-amber-950"}>Scatter Plot</td>
                            <td className={"border p-2 border-amber-950"}>$4.29</td>
                            <td className={"border p-2 border-amber-950"}>20</td>
                        </tr>

                        <tr className={"bg-yellow-100"}>
                            <td className={"border p-2 border-amber-950"}>Scatter Plot</td>
                            <td className={"border p-2 border-amber-950"}>$8.99</td>
                            <td className={"border p-2 border-amber-950"}>50</td>
                        </tr>
                    </tbody>
                </table>

                <h2
                    className={"text-2xl font-thin text-left mb-4 mt-4 font-normal italic"}
                >
                    For Developers
                </h2>

                <p
                    className={"overflow-auto mb-8"}
                >
                    We do not support any library or api at the moment, but our
                    team is working hard and very soon we are going to have great
                    news to share. We are open to suggestions and contributions,
                    feel free to reach our team and share your ideas.
                </p>

            </div>

            <div className={"w-auto h-1/4 text-center mb-12 mt-4"}>
                <Link
                    to={"https://github.com/ntua/SaaS23-44"}
                    className={"text-xl font-bold text-blue-500 hover:text-blue-300 mb-8"}>
                    Check out our Github Repository
                </Link>
            </div>
        </div>
    );
}

export default About;