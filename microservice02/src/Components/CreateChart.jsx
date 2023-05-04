import ScatterPlot from "../assets/ScatterPlot.png";
import MenuBar from "./MenuBar.jsx";
import {useState} from "react";
import myCharts from "../assets/myCharts.png";

function CreateChart() {

    const [chartTitle,setChartTitle] = useState(undefined);
    const [chartExtension,setChartExtension] = useState(undefined);
    const [chartPlotType,setChartPlotType] = useState(undefined);
    const [simplePlotTypeXAxisTitle,setSimplePlotTypeXAxisTitle] = useState(undefined);
    const [simplePlotTypeYAxisTitle,setSimplePlotTypeYAxisTitle] = useState(undefined);
    const [simplePlotPropsVisible,setSimplePlotPropsVisible] = useState(false);
    const [btnProps,setBtnProps] = useState(false);

    function handleSimplePlotProps(event) {
        setChartPlotType(event.target.value);
        (event.target.value === "SimplePlot") ? setSimplePlotPropsVisible(true) : setSimplePlotPropsVisible(false);
    }

    function handleBtnProps() {
        //TODO add validation for props
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




    return (
        <div>

            <MenuBar page={"create-chart"}/>

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
                    <div className={"border-2 border-dashed border-black px-4 py-6 bg-orange-50 justify-center rounded-md"}>
                        <span className={"text-center text-md"}>Drag and Drop your data file to upload or select one</span>
                        <input
                            type={"file"}
                            className={"hover:cursor-pointer hidden"} />
                    </div>
                </div>

                <div className={"p-4"}>
                    <button className={"border-2 border-black rounded-lg p-4 w-36 h-14"}>Submit</button>
                </div>

            </div>

        </div>
    )
}

export default CreateChart;