import ScatterPlot from "../assets/ScatterPlot.png";
import MenuBar from "./MenuBar.jsx";
import {useEffect, useState} from "react";
import myCharts from "../assets/myCharts.png";
import Notification from "./Notification.jsx";
import Unauthorized401 from "../ErrorComponents/Unauthorized401.jsx";
import useAuth from "../Hooks/useAuth.js";

function CreateChart() {

    const [chartTitle,setChartTitle] = useState(undefined);
    const [chartExtension,setChartExtension] = useState(undefined);
    const [chartPlotType,setChartPlotType] = useState(undefined);
    const [simplePlotTypeXAxisTitle,setSimplePlotTypeXAxisTitle] = useState(undefined);
    const [simplePlotTypeYAxisTitle,setSimplePlotTypeYAxisTitle] = useState(undefined);
    const [simplePlotPropsVisible,setSimplePlotPropsVisible] = useState(false);
    const [dataFile,setDataFile] = useState(null);
    const [notification,setNotification] = useState(0);
    const [visibleNotification, setVisibleNotification] = useState(false);
    const clientSignedIn = useAuth();
    function handleSimplePlotProps(event) {
        setChartPlotType(event.target.value);
        (event.target.value === "SimplePlot") ? setSimplePlotPropsVisible(true) : setSimplePlotPropsVisible(false);
    }

    const handleChartTitleChange = (event) => {
        setChartTitle(event.target.value);
    }

    const handleChartExtension = (event) => {
        setChartExtension(event.target.value);
    }

    const handleSimplePlotTypeXAxisTitle = (event) => {
        setSimplePlotTypeXAxisTitle(event.target.value);
    }

    const handleSimplePlotTypeYAxisTitle = (event) => {
        setSimplePlotTypeYAxisTitle(event.target.value);
    }

    const handleFileInput = (event) => {
        setDataFile(event.target.files[0]);
    }

    function handleChartSubmit(event) {

        event.preventDefault();

       if (chartTitle === undefined || chartTitle === "" || chartTitle === " ") {
           setVisibleNotification(true);
           setNotification(1); // 1 -> if chart title is empty
           return;
       }

       if (chartExtension !== "png" && chartExtension !== "pdf" && chartExtension !== "svg" && chartExtension !== "html") {
           setVisibleNotification(true);
           setNotification(2); // 2 -> if chart export format is invalid
           return;
       }

       if (chartPlotType !== "SimplePlot" && chartPlotType !== "BarPlotWithLegend" && chartPlotType !== "ScatterPlot") {
           setVisibleNotification(true);
           setNotification(3); // 3 -> if chart plot type is invalid
           return;
       }

       if (chartPlotType === "SimplePlot" && (simplePlotTypeXAxisTitle === undefined || simplePlotTypeYAxisTitle === undefined || simplePlotTypeXAxisTitle === "" || simplePlotTypeYAxisTitle === "" || simplePlotTypeXAxisTitle === " " || simplePlotTypeYAxisTitle === " ")) {
           setVisibleNotification(true);
           setNotification(4); // 4 -> if axis titles are empty
           return;
       }

       if (dataFile === null) {
           setVisibleNotification(true);
           setNotification(8); // 8 -> if the client did not upload any file
           return;
       }

        const formData = new FormData();
        if (chartPlotType !== "SimplePlot") {
            formData.append("title", chartTitle);
            formData.append("extension",chartExtension);
            formData.append("type",chartPlotType)
            formData.append("datafile", dataFile);
        } else {
            formData.append("title", chartTitle);
            formData.append("extension",chartExtension);
            formData.append("type", chartPlotType);
            formData.append("xAxis", simplePlotTypeXAxisTitle);
            formData.append("yAxis", simplePlotTypeYAxisTitle);
            formData.append("datafile", dataFile);
        }
        console.log(formData);
        const requestOptions = {
            method : "POST",
            body : formData
        };

        fetch("http://localhost:9000/", requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    setVisibleNotification(true);
                    setNotification(5); // 5 -> data input is correct
                } else {
                    setVisibleNotification(true);
                    setNotification(6) // 6 -> data input has mistakes
                }
            })
            .catch(() => {
                setVisibleNotification(true);
                setNotification(7); // 7 -> if upload service is unavailable
            } );
    }



    if (clientSignedIn) {
        return (
            <div>

                <MenuBar page={"create-chart"} />

                {visibleNotification && notification === 1 &&
                    <Notification notificationInfo={"errors"}
                                  notificationTitle={"Chart Title"}
                                  notificationMsg={"Chart title can't be empty."}
                                  setVisibleNotification={setVisibleNotification}/>
                }

                {visibleNotification && notification === 2 &&
                    <Notification notificationInfo={"errors"}
                                  notificationTitle={"Chart Export Format"}
                                  notificationMsg={"Chart export format can be png, pdf, svg or html."}
                                  setVisibleNotification={setVisibleNotification}/>
                }

                {visibleNotification && notification === 3 &&
                    <Notification notificationInfo={"errors"}
                                  notificationTitle={"Chart Plot Type"}
                                  notificationMsg={"Chart Plot is invalid."}
                                  setVisibleNotification={setVisibleNotification}/>
                }

                {visibleNotification && notification === 4 &&
                    <Notification notificationInfo={"errors"}
                                  notificationTitle={"Simple Plot Axis Titles Are Missing"}
                                  notificationMsg={"You have to name xAxis and yAxis."}
                                  setVisibleNotification={setVisibleNotification}/>
                }

                {visibleNotification && notification === 5 &&
                    <Notification notificationInfo={"success"}
                                  notificationTitle={"Data Upload"}
                                  notificationMsg={"Your data have been successfully uploaded."}
                                  setVisibleNotification={setVisibleNotification}/>
                }

                {visibleNotification && notification === 6 &&
                    <Notification notificationInfo={"errors"}
                                  notificationTitle={"Data Upload"}
                                  notificationMsg={"Your file contains errors."}
                                  setVisibleNotification={setVisibleNotification}/>
                }

                {visibleNotification && notification === 7 &&
                    <Notification notificationInfo={"info"}
                                  notificationTitle={"Data Upload Unavailable"}
                                  notificationMsg={"Upload Service is currently unavailable."}
                                  setVisibleNotification={setVisibleNotification}/>
                }

                {visibleNotification && notification === 8 &&
                    <Notification notificationInfo={"errors"}
                                  notificationTitle={"File Upload"}
                                  notificationMsg={"You have to upload a file with your data."}
                                  setVisibleNotification={setVisibleNotification}/>
                }




                <div className={"box-border border-2 rounded-md border-black mx-auto h-fit w-96 mt-4"}>
                    <img src={myCharts}
                        alt={"myCharts logo"}
                         className={"bg-fixed"}/>
                    <div className={"p-4"}>
                        <input
                            className="px-4 py-2 border-2 border-black focus:outline-none rounded-md w-full"
                            type={"text"}
                            placeholder="Chart Title"
                            onChange={handleChartTitleChange}
                            required/>
                    </div>

                    <div className={"p-4"}>
                        <select className={"block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none hover:cursor-pointer bg-white"}
                                onChange={handleChartExtension}>
                            <option defaultValue={"Select File Format"}>Select File Format</option>
                            <option value={"png"}>png</option>
                            <option value={"html"}>html</option>
                            <option value={"svg"}>svg</option>
                            <option value={"pdf"}>pdf</option>
                        </select>
                    </div>

                    <div className={"p-4"}>
                        <select
                            className={"block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none hover:cursor-pointer bg-white"}
                            onChange={handleSimplePlotProps}>
                            <option defaultValue={"Select File Format"}>Select Chart Type</option>
                            <option value={"SimplePlot"}>Simple Plot</option>
                            <option value={"BarPlotWithLegend"}>Bar Plot With Labels</option>
                            <option value={"ScatterPlot"}>Scatter Plot</option>
                        </select>
                    </div>

                    {simplePlotPropsVisible &&
                        <div className={"p-4"}>
                            <input
                                className="px-4 py-2 border-2 border-black focus:outline-none rounded-md w-full"
                                type={"text"}
                                placeholder="x Axis Title"
                                onChange={handleSimplePlotTypeXAxisTitle}
                                required/>
                        </div>
                    }

                    {simplePlotPropsVisible &&

                        <div className={"p-4"}>
                            <input
                                className="px-4 py-2 border-2 border-black focus:outline-none rounded-md w-full"
                                type={"text"}
                                placeholder="y Axis Title"
                                onChange={handleSimplePlotTypeYAxisTitle}
                                required/>
                        </div>
                    }

                    <form encType={"multipart/form-data"} onSubmit={handleChartSubmit}>
                        <div className={"p-4 hover:cursor-pointer"}>
                            <div className={"border-2 border-dashed border-black px-4 py-6 bg-orange-50 justify-center rounded-md"}>
                                <span className={"text-center text-md"}>Drag and Drop your data file to upload or select one</span>
                                <input
                                    id={"t"}
                                    type={"file"}
                                    className={"hover:cursor-pointer"}
                                    accept={".csv,.xlsx"}
                                    onChange={handleFileInput}
                                    />
                            </div>
                        </div>

                        <div className={"p-4"}>
                            <button className={"border-2 border-black rounded-lg p-4 w-36 h-14"}>Submit</button>
                        </div>
                    </form>

                </div>

            </div>
        );
    } else {
        return (
            <Unauthorized401 />
        );
    }
}

export default CreateChart;