const express = require("express");
const router = express.Router();
const axios = require("axios");

//TODO evaluate user id

async function get_history(req, res, next){

    let bucket_charts = [];
    const user_id = req.params.user_id;
    
    try {

        const simple_plot_res = await axios.get(`http://${process.env.MICROSERVICE10_IP_STORAGE_SIMPLE}/api/storage/simpleplot/info/${user_id}`);
        const data_simple_plot_res = simple_plot_res.data.charts;

        bucket_charts.push(...data_simple_plot_res);

    } catch (error) {
        if (error.code !== "ERR_BAD_REQUEST") {
            console.error(error);
        }
    }

    try {
        const scatter_plot_res = await axios.get(`http://${process.env.MICROSERVICE11_IP_STORAGE_SCATTER}/api/storage/scatterplot/info/${user_id}`); 
        const data_scatter_plot_res = scatter_plot_res.data.charts;

         if (data_scatter_plot_res.length > 0) {
            bucket_charts.push(...data_scatter_plot_res);
        }

    } catch(error) {
        if (error.code !== "ERR_BAD_REQUEST") {
            console.error(error);
        }
    }

    try {
        const bar_plot_res = await axios.get(`http://${process.env.MICROSERVICE13_IP_STORAGE_BAR}/api/storage/barplot/info/${user_id}`);
        const data_bar_plot_res = bar_plot_res.data.charts;

        if (data_bar_plot_res.length > 0) {
            bucket_charts.push(...data_bar_plot_res);
        }

    } catch(error) {
        if (error.code !== "ERR_BAD_REQUEST") {
            console.error(error);
        }
    }


    if (bucket_charts.length > 0) {
        res.status(200).json(
            {
                "client_id": user_id,
                "charts" : bucket_charts
            }
        );
    } else {
        res.status(404).json({
            "info" : "nothing found"
        });
    }
}

router.get("/api/storage/charts/info/:user_id",  get_history);
module.exports = router;