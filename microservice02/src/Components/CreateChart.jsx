import ScatterPlot from "../assets/ScatterPlot.png";
import MenuBar from "./MenuBar.jsx";

function CreateChart() {
    return (
        <div>

            <MenuBar page={"create-chart"}/>
            <h1 className={"text-xl text-center"}>Create Chart Page Is Under Construction</h1>
            <div className={"grid grid-cols-20  grid-rows-10 mx-auto box-border border-4 max-w-2xl mt-8"}>

                <img
                    src={ScatterPlot}
                    alt={"Prototypes"}
                    className={"col-start-5 col-end-10"}/>

                <div id={"left-arrow"} className={"hover:cursor-pointer grid-cols-10 grid-rows-5"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </div>

                <div id={"right-arrow"} className={"hover:cursor-pointer w-3.5 w-3.5 absolute inset-y-2/3 right-1/4"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </div>

            </div>
        </div>
    )
}

export default CreateChart;