import {useEffect, useState} from "react";
import MenuBar from "./MenuBar.jsx";
import myCharts from "../assets/myCharts.png";
import ScatterPlot from "../assets/ScatterPlot.png";
import Unauthorized401 from "../ErrorComponents/Unauthorized401.jsx";
import useAuth from "../Hooks/useAuth.js";
import axios from "axios";
import Notification from "./Notification.jsx";

/*
    Dashboard Component is the component, where client can preview his/her charts,
    select and download a specific one or just find a table containing information
    about them.
 */
function Dashboard() {

    const [previewChart, setPreviewChart] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [credit, setCredit] = useState(0);
    const [userId,setUserId] = useState(undefined);
    const [tableData,setTableData] = useState([]);
    const [currentImg, setCurrentImg] = useState(ScatterPlot);
    const [loadingTable, setLoadingTable] = useState(true);
    const [email, setEmail] = useState();
    const [chartsCreated, setChartsCreated] = useState();
    const [urlTracker, setUrlTracker] = useState([]);
    const [selectedChartType, setSelectedChartType] = useState();
    const [completeData, setCompleData] = useState([]);
    const [errorNotification, setErrorNotification] = useState(false);


    async function fetchChart(_id, bucket, ext_type) {
        
        try {
            
            const bucket_chart = bucket.split(" ").join("").toLowerCase();
            const res = await fetch(`http://${import.meta.env.VITE_MICROSERVICE06}/api/storage/${bucket_chart}/${_id}`);
            const imgBlob = await res.blob();

            let tp;
            
            switch (ext_type) {
                case "img" : 
                    tp = "image/png"
                    break;

                case "svg":
                    tp= "image/svg+xml"
                    break;

                case "pdf":
                    tp = "application/pdf"
                    break;

                case "html":
                    break;
                
            }

            const url = URL.createObjectURL(new Blob([imgBlob], {type : tp}));
            
            setCurrentImg(url);
            setUrlTracker((prevURL) => [...prevURL, url]);
            
        } catch(error) {
            console.error(error);
            setErrorNotification(true);
        }
    }

    function showCurrentChart(event) {

        /*  
            Displays the selected chart. In order to achive that it 
            has to make a call with the chart id and the type of the chart(simple plot 
            | scatter plot | bar plot).
        */

        const _id = event.currentTarget.parentNode.getAttribute("data-key");
        const bucket = event.currentTarget.parentNode.getAttribute("data-bucket");
        const ext_type = event.currentTarget.parentNode.getAttribute("data-type"); 

        setSelectedChartType(ext_type);
        fetchChart(_id, bucket, ext_type);   
        setPreviewChart(true); 
    }

    async function downloadChart(event) {
        const _id = event.currentTarget.parentNode.getAttribute("data-key");
        const tp = event.currentTarget.parentNode.getAttribute("data-type");

        const bucket_chart = event.currentTarget.parentNode.getAttribute("data-bucket").split(" ").join("").toLowerCase();
        
        try {
            const res = await fetch(`http://${import.meta.env.VITE_MICROSERVICE06}/api/storage/${bucket_chart}/${_id}`);
            const imgBlob = await res.blob();
            const url = URL.createObjectURL(imgBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "chart." + tp;
            link.click();

            link.remove();

            URL.revokeObjectURL(url);

        } catch(error) {
            setErrorNotification(true);
            //console.error(error);
        }
    }

    async function dataFetch() {

        /*
            It fetches information about the user and about the charts
            that he has made.
        */

        const info_ = sessionStorage.getItem("info_");

        try {
            const infoRes = await axios.post(`http://${import.meta.env.VITE_MICROSERVICE06}/api/client/info`, {
                info_ : info_,
            }, {
                headers: {
                    "Content-Type" : "application/json"
                }
            });
            setFirstName(infoRes.data.firstName);
            setLastName(infoRes.data.lastName);
            setCredit(infoRes.data.credit);
            setUserId(infoRes.data.userId);
            setEmail(infoRes.data.email);
            setChartsCreated(infoRes.data.charts);

            const chartRes = await axios.get(`http://${import.meta.env.VITE_MICROSERVICE06}/api/storage/charts/info/${infoRes.data.userId}`);
            let index = 0;

            const tbData = chartRes.data.charts.map(item => {
                    
                if (item.chart_type === "simple_plot") {
                    item.chart_type = "Simple Plot";
                }

                if (item.chart_type === "scatter_plot") {
                    item.chart_type = "Scatter Plot";
                }

                if (item.chart_type === "bar_plot") {
                    item.chart_type = "Bar Plot";
                }

                const created_at = item.created.split("T");
                const dt = created_at[0];
                //const tm = created_at[1].split(".")[0];
                index++;

                return (
                    <tr 
                        key={item.chart_id} 
                        data-key={item.chart_id} 
                        data-type={item.chart_extension} 
                        data-bucket={item.chart_type}>
                            
                            <td className={"border p-2 border-black"}>{index}</td>
                            <td className={"border p-4 border-black"}>{item.chart_type}</td>
                            <td className={"border p-4 border-black hover:cursor-pointer hover:text-blue-500 hover:scale-110 transform transition-transform duration-300"}
                                onClick={showCurrentChart}>
                                    {item.title}</td>
                            <td className={"border p-4 border-black"}>{`${dt}`}</td>
                            <td className={"border p-4 border-black hover:cursor-pointer hover:text-blue-500 hover:scale-110 transform transition-transform duration-300"}
                                onClick={downloadChart}>
                                    {item.chart_extension}
                            </td>
                    </tr> 
                )
            });

            setTableData(tbData);
            setCompleData(tbData);
            setLoadingTable(false);
        
        } catch(error) {
            
            //console.log(error);
            setErrorNotification(true);
            //document.body.classList.remove("bg-orange-50"); 
        }
    }


    function handleFilter(event) {

        /*
            Display only the selected type of charts( Simple Plot | Scatter Plot | Bar Plot).
            In any other case display all.
        */
        
        const selection = event.target.value;

        if (selection === "Simple Plot") {
            const tmp = completeData.map( _item => {
                if (_item.props["data-bucket"] === "Simple Plot") {
                    return _item;
                }
            });
            setTableData(tmp); 
        } else if (selection === "Scatter Plot") {
            const tmp = completeData.map( _item => {
                if (_item.props["data-bucket"] === "Scatter Plot") {
                    return _item;
                }
            });
            setTableData(tmp);
        } else if (selection === "Bar Plot") {
            const tmp = completeData.map( _item => {
                if (_item.props["data-bucket"] === "Bar Plot") {
                    return _item;
                }
            });
            setTableData(tmp);
        } else {
            setTableData(completeData);
        }


    }

    useEffect(() => {
        dataFetch();

        return () => {

            /*
                Remove all urls that were constructed while fetching selected charts.
            */

            urlTracker.map(_url => {
                URL.revokeObjectURL(_url);
            });
        }
    },[]);

    const clientSignedIn = useAuth();

    if (clientSignedIn) {

        return (

            <div>
                <MenuBar page={"dashboard"} />
                {errorNotification && <Notification notificationInfo={"info"} notificationMsg={"Something Unexpected Occured"} notificationTitle={"Connectivity Issues"} setVisibleNotification={setErrorNotification}/>}
                
                <div>
                    <div className={"w-full bg-white"}>
                        <img
                            src={myCharts}
                            alt={"myCharts"}
                            className={"bg-auto mx-auto w-5/12 h-5/12"}
                        />

                        <div className={"flex space-x-4 mt-2"}>
                            <h1 className={"p-2 text-lg font-medium"}>{firstName} {lastName} </h1>
                            <h1 className={"p-2 text-lg font-medium"}>Credits : {credit}</h1>
                            <h1 className={"p-2 text-lg font-medium"}> Charts Available : {credit}</h1>
                            <h1 className={"p-2 text-lg font-medium"}> Email : {email}</h1>
                            <h1 className={"p-2 text-lg font-medium"}> Total Charts : {chartsCreated}</h1>

                            {/* fix for small screens */}
                            <select 
                                className="sticky top-0 hover:cursor-pointer text-lg w-48 h-10 bg-transparent rounded text-center border-2 border-black shadow-xl"
                                onChange={handleFilter}>
                                <option>All Charts</option>
                                <option>Simple Plot</option>
                                <option>Scatter Plot</option>
                                <option>Bar Plot</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className={"mx-auto grid grid-cols-1 sm:grid-cols-2 justify-items-center flex space-x-4 border-t-2 border-black p-4"}>

                    {loadingTable ? (
                        <p>Loading...</p>
                    ) : (
  
                    <table
                        className={"auto border-2 border-black mt-4 mb-8 border-collapse border-spacing-4 text-center"}>
                        <caption className={"caption-top mb-2 text-lg font-medium"}>
                            My Charts
                        </caption>
                        <thead>
                        <tr className={"bg-orange-100"}>
                            <th className={"border p-4 border-black"}>Index</th>
                            <th className={"border p-4 border-black"}>Type</th>
                            <th className={"border p-4 border-black"}>Chart Name</th>
                            <th className={"border p-4 border-black"}>Created on</th>
                            <th className={"border p-4 border-black"}>Download</th>
                        </tr>
                        </thead>
                        <tbody>

                            {tableData}

                        </tbody>
                    </table>
                    )}

                    <div className={"box-content h-fit border-2 border-black mt-12 w-4/5 rounded shadow-xl sticky top-0"}>
                        <h1 className={"text-center mt-2"}>Chart
                            Preview</h1>
                        {previewChart && selectedChartType === "png" &&
                            <img 
                                src={currentImg}
                                alt={"client chart"}
                                className={"mx-auto p-2"}/>
                        }
                        

                        {previewChart && selectedChartType === "pdf" && 
                            <embed
                                type="application/pdf"
                                src={currentImg}
                                alt={"client chart"}
                                width={"100%"}
                                height={"500px"}
                                className={"mx-auto p-2"}
                                download="chart"/>
                        }

                        {previewChart && selectedChartType === "svg" &&
                            <img
                                src={currentImg}
                                alt={"client chart"}
                                className={"mx-auto p-2"}/>
                        }       

                        {!previewChart &&
                            <h1 className={"text-lg font-medium text-center"}>Select a chart to preview</h1>
                        }
                    </div>


                </div>

            </div>
        );
    } else{
        return (
            <Unauthorized401 />
        )
    }
}

export default Dashboard;