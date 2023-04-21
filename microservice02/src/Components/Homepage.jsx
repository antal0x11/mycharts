import myCharts from '../assets/myCharts.png';
import {useEffect} from "react";
function Homepage() {

   return (
        <div>
            <img src={myCharts} className={"bg-fixed block mx-auto"} alt={"myChartsLog"}/>

            <div className={""}>
                <h1
                    className={"text-2x text-center"}
                >
                    Homepage Is Under Construction
                </h1>
            </div>
        </div>
   );
}

export default Homepage;