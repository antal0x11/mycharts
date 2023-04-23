import myCharts from '../assets/myCharts.png';
import ScatterPlot from "../assets/ScatterPlot.png";
import SimplePlot from "../assets/SimplePlot.png";
import BarPlot from "../assets/BarPlot.png";
import {Link} from "react-router-dom";
import {useState} from "react";
import ScatterChartInstructor from "../PlotInstructions/ScatterChartInstructor.jsx";
import SimpleChartInstructor from "../PlotInstructions/SimpleChartInstructor.jsx";
import BarChartInstructor from "../PlotInstructions/BarChartInstructor.jsx";
function Homepage() {


    const [simplePlotIns,setSimplePlotIns] = useState(false);
    const [scatterPlotIns,setScatterPlotIns] = useState(false);
    const [barPlotIns,setBarPlotIns] = useState(false);

    function simplePlotShowInstructions() {
        setSimplePlotIns(true);
    }
    function simplePlotShowChart() {
        setSimplePlotIns(false);
    }

    function scatterPlotShowInstructions() {
        setScatterPlotIns(true);
    }
    function scatterPlotShowChart() {
        setScatterPlotIns(false);
    }

    function barPlotShowInstructions() {
        setBarPlotIns(true);
    }
    function barPlotShowChart() {
        setBarPlotIns(false);
    }

    return (
        <div>
            <img
                src={myCharts}
                className={"bg-fixed block mx-auto mb-4"}
                alt={"myChartsLogo"}/>

            <div
                className={"grid grid-cols-1 sm:grid-cols-3 justify-items-center"}>
                <img
                    src={ScatterPlot}
                    alt={"ScatterPlot"}
                    className={"mb-4 hover:cursor-pointer"}
                    onClick={scatterPlotShowInstructions}/>
                {
                    scatterPlotIns === true && <ScatterChartInstructor
                                                hideChart={scatterPlotShowChart}
                                                title={"Scatter Plot"} />
                }

                <img
                    src={SimplePlot}
                    alt={"SimplePlot"}
                    className={"mb-4 hover:cursor-pointer"}
                    onClick={simplePlotShowInstructions}/>

                {
                    simplePlotIns === true && <SimpleChartInstructor
                                                hideChart={simplePlotShowChart}
                                                title={"Simple Plot"}
                                                />
                }

                <img
                    src={BarPlot}
                    alt={"BarPlot"}
                    className={"mb-4 hover:cursor-pointer"}
                    onClick={barPlotShowInstructions}/>

                {
                    barPlotIns === true && <BarChartInstructor
                                            hideChart={barPlotShowChart}
                                            title={"Bar Plot"}
                                            />
                }
            </div>

            <div
                className={"w-auto h-1/4 text-center mb-12 mt-4"}>

                <Link
                    to={"/about"}
                    className={"text-xl italic hover:text-blue-500"}>
                    About myCharts
                </Link>

            </div>
        </div>
   );
}

export default Homepage;