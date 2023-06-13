import ScatterPlot from "../assets/ScatterPlot.png";
import MenuBar from "./MenuBar.jsx";
import {useEffect, useState} from "react";
import myCharts from "../assets/myCharts.png";
import Notification from "./Notification.jsx";
import Unauthorized401 from "../ErrorComponents/Unauthorized401.jsx";
import useAuth from "../Hooks/useAuth.js";
import axios from "axios";

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
    const [fileDrag, setFileDrag] = useState(false);
    const [fileName,setFileName] = useState("");
    const [userID, setUserId] = useState(null);

    useEffect(() => {
        getClientInfo();
    }, []);

    function getClientInfo() {
        const info_ = sessionStorage.getItem("info_");

        axios.post("http://localhost:7000/api/client/info", {
            info_ : info_,
        }, {
            headers: {
                "Content-Type" : "application/json"
            }
        }).then(response => {
            
            setUserId(response.data.userId);
        
        }).catch(error => {
            console.error(error);
        })
    }


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

        const info_ = sessionStorage.getItem("info_");
        
        if (chartPlotType === "SimplePlot") {

            axios.post("http://localhost:7000/api/data/audit", {
                user_id : userID,
                info_ : info_,
                title : chartTitle,
                extension : chartExtension,
                type : "simple_plot",
                xAxis : simplePlotTypeXAxisTitle,
                yAxis : simplePlotTypeYAxisTitle,
                file : dataFile
            }, {
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            }).then( () => {
                setVisibleNotification(true);
                setNotification(5);
            }).catch(() => {
                setVisibleNotification(true);
                setNotification(6);
            })
        }

        if (chartPlotType === "BarPlotWithLegend") {

            axios.post("http://localhost:7000/api/data/audit", {
                user_id : userID,
                info_ : info_,
                title : chartTitle,
                extension : chartExtension,
                type : "bar_plot",
                file : dataFile
            }, {
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            }).then( () => {
                setVisibleNotification(true);
                setNotification(5);
            }).catch(() => {
                setVisibleNotification(true);
                setNotification(6);
            })
        }

        if (chartPlotType === "ScatterPlot") {

            axios.post("http://localhost:7000/api/data/audit", {
                user_id : userID,
                info_ : info_,
                title : chartTitle,
                extension : chartExtension,
                type : "scatter_plot",
                file : dataFile
            }, {
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            }).then( () => {
                setVisibleNotification(true);
                setNotification(5);
            }).catch(() => {
                setVisibleNotification(true);
                setNotification(6);
            })
        }

    }

    function handleDragStart (event) {
        event.preventDefault();
        setFileDrag(true);
    }

    function handleDragEnd () {
        setFileDrag(false);
    }

    function handleDragOver (event) {
        event.preventDefault();
    }

    function handleDrop (event) {
        event.preventDefault();
        setFileDrag(false);

        setDataFile(event.dataTransfer.files[0]);
        setFileName(event.dataTransfer.files[0].name);
    }

    function handleFileSelection() {

        const tmpInput = document.createElement("input");
        tmpInput.setAttribute("type", "file");
        tmpInput.accept = ".csv";
        tmpInput.click();

        tmpInput.addEventListener("change", (event) => {
            setDataFile(event.target.files[0]);
            setFileName(event.target.files[0].name);
            console.log(event.target.files[0]);
        })

        tmpInput.remove();
    }

    function handlePrototypeSimplePlot() {
        const link = document.createElement('a');
        link.href = "/simple_plot.csv";
        link.download = "simple_plot_prototype.csv";
        link.click();

        link.remove();
    }

    function handlePrototypeScatterPlot() {
        const link = document.createElement('a');
        link.href = "/scatter_plot.csv";
        link.download = "scatter_plot_prototype.csv";
        link.click();

        link.remove();
    }

    function handlePrototypeBarPlot() {
        const link = document.createElement('a');
        link.href = "/bar_plot.csv";
        link.download = "bar_plot_prototype.csv";
        link.click();

        link.remove();
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



                <div className="flex justify-center space-x-4">

                    <div className="h-fit w-fit mt-4 text-xl p-4">
                        <h1 className="text-center font-bold">CSV Prototypes</h1>
                        <p className="mb-2 mt-2 underline">
                            Select chart to view a data source prototype.
                        </p>
                        
                        <ul className="list-disc">
                            <li className="hover:cursor-pointer hover:text-blue-500" onClick={handlePrototypeSimplePlot}>Simple Plot</li>
                            <li className="hover:cursor-pointer hover:text-blue-500" onClick={handlePrototypeScatterPlot}>Scatter Plot</li>
                            <li className="hover:cursor-pointer hover:text-blue-500" onClick={handlePrototypeBarPlot}>Bar Plot</li>
                        </ul>
                    </div>

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

                        <div className={"p-4 hover:cursor-pointer"}>
                            <div className={"border-2 border-dashed border-black px-4 py-6 bg-orange-50 justify-center rounded-md"}
                                 onDragStart={handleDragStart}
                                 onDragEnd={handleDragEnd}
                                 onDragOver={handleDragOver}
                                 onDrop={handleDrop}
                                 onClick={handleFileSelection}>
                                <span className={"text-center text-md"}>Drag and Drop your data file to upload or click to select one. Current Selection : {fileName}</span>

                            </div>
                        </div>

                        <div className={"p-4"}>
                            <button className={"border-2 border-black rounded-lg p-4 w-36 h-14"}
                                    onClick={handleChartSubmit}>Submit</button>
                        </div>

                    </div>

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