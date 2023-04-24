import {useEffect, useState} from "react";
import MenuBar from "./MenuBar.jsx";
import myCharts from "../assets/myCharts.png";
import ScatterPlot from "../assets/ScatterPlot.png";

/*
    Dashboard Component is the component, where client can preview his/her charts,
    select and download a specific one or just find a table containing information
    about them.
 */
function Dashboard() {

    const [previewChart,setPreviewChart] = useState(true);

    return (
        <div>
            <MenuBar page={"dashboard"}/>

            <div className={"w-full bg-blue-50"}>
                <img
                    src={myCharts}
                    alt={"myCharts"}
                    className={"bg-auto mx-auto w-96"}
                 />

                <div className={"flex space-x-4"}>
                    <h1 className={"p-2 text-lg font-medium"}>Welcome someone@gmail.com</h1>
                    <h1 className={"p-2 text-lg font-medium"}>Credits : 10</h1>
                </div>
            </div>

            <div className={"mx-auto grid grid-cols-1 sm:grid-cols-2 justify-items-center flex space-x-4"}>
                <table className={"auto border-2 border-black mt-4 mb-8 border-collapse border-spacing-4 text-center"}>
                    <caption className={"caption-top mb-2 text-lg font-medium"}>
                        My Charts
                    </caption>
                    <thead>
                        <tr className={"bg-orange-100"}>
                            <th className={"border p-4 border-black"}>Type</th>
                            <th className={"border p-4 border-black"}>Chart Name</th>
                            <th className={"border p-4 border-black"}>Created on</th>
                            <th className={"border p-4 border-black"}>Download</th>
                        </tr>
                    </thead>
                    <tbody>

                    {/* example data */}
                        <tr>
                            <td className={"border p-4 border-black"}>Simple Plot</td>
                            <td className={"border p-4 border-black hover:cursor-pointer"}>Example Simple Plot</td>
                            <td className={"border p-4 border-black"}>24/04/2023 20:37:56</td>
                            <td className={"border p-4 border-black"}>png, pdf, svg, html</td>
                        </tr>

                        <tr>
                            <td className={"border p-4 border-black"}>Scatter Plot</td>
                            <td className={"border p-4 border-black hover:cursor-pointer"}>Example Scatter Plot</td>
                            <td className={"border p-4 border-black"}>24/04/2023 20:39:56</td>
                            <td className={"border p-4 border-black"}>png, pdf, svg, html</td>
                        </tr>

                        <tr>
                            <td className={"border p-4 border-black"}>Simple Plot</td>
                            <td className={"border p-4 border-black hover:cursor-pointer"}>Example Simple Plot</td>
                            <td className={"border p-4 border-black"}>24/04/2023 20:37:56</td>
                            <td className={"border p-4 border-black"}>png, pdf, svg, html</td>
                        </tr>

                        <tr>
                            <td className={"border p-4 border-black"}>Scatter Plot</td>
                            <td className={"border p-4 border-black hover:cursor-pointer"}>Example Scatter Plot</td>
                            <td className={"border p-4 border-black"}>24/04/2023 20:39:56</td>
                            <td className={"border p-4 border-black"}>png, pdf, svg, html</td>
                        </tr>

                        <tr>
                            <td className={"border p-4 border-black"}>Simple Plot</td>
                            <td className={"border p-4 border-black hover:cursor-pointer"}>Example Simple Plot</td>
                            <td className={"border p-4 border-black"}>24/04/2023 20:37:56</td>
                            <td className={"border p-4 border-black"}>png, pdf, svg, html</td>
                        </tr>

                        <tr>
                            <td className={"border p-4 border-black"}>Scatter Plot</td>
                            <td className={"border p-4 border-black hover:cursor-pointer"}>Example Scatter Plot</td>
                            <td className={"border p-4 border-black"}>24/04/2023 20:39:56</td>
                            <td className={"border p-4 border-black"}>png, pdf, svg, html</td>
                        </tr>

                        <tr>
                            <td className={"border p-4 border-black"}>Simple Plot</td>
                            <td className={"border p-4 border-black hover:cursor-pointer"}>Example Simple Plot</td>
                            <td className={"border p-4 border-black"}>24/04/2023 20:37:56</td>
                            <td className={"border p-4 border-black"}>png, pdf, svg, html</td>
                        </tr>

                        <tr>
                            <td className={"border p-4 border-black"}>Scatter Plot</td>
                            <td className={"border p-4 border-black hover:cursor-pointer"}>Example Scatter Plot</td>
                            <td className={"border p-4 border-black"}>24/04/2023 20:39:56</td>
                            <td className={"border p-4 border-black"}>png, pdf, svg, html</td>
                        </tr>

                    </tbody>
                </table>

                <div className={"box-content h-fit w-fit border-2 border-black mt-12"}>
                    <h1 className={"text-center mt-2"}>Chart Preview</h1> {/* TODO add conditional rendering if chart is not selected*/}
                    {previewChart &&
                        <img src={ScatterPlot}
                             alt={"client chart"}
                            className={"mx-auto"}   />
                    }

                    {!previewChart &&
                        <h1 className={"text-lg font-medium self-center"}>Select a chart to preview</h1>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard;