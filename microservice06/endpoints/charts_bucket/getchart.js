const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");

//TODO validate chartID and bucketID

function get_simple_chart(req,res,next) {

    if (req.params.bucketID === "simpleplot") {
        
        const chartID = req.params.chartID;
        axios({
            method : 'get',
            url : `http://${process.env.MICROSERVICE10_IP_STORAGE_SIMPLE}/api/storage/simpleplot/${chartID}`,
            responseType : "stream"
        }).then(response => {
            response.data.pipe(res);
        }).catch( error => {

            console.log(error);

            res.status(500).json(
                {
                    "info" : "something broke"
                }
            );
        })
        
    } else {
        next();
    }
}


async function get_scatter_chart(req,res,next) {

    if (req.params.bucketID === "scatterplot") {
        const chartID = req.params.chartID;
        axios({
            method : 'get',
            url : `http://${process.env.MICROSERVICE11_IP_STORAGE_SCATTER}/api/storage/scatterplot/${chartID}`,
            responseType : "stream"
        }).then(response => {
            response.data.pipe(res);
        }).catch( error => {

            console.log(error);

            res.status(500).json(
                {
                    "info" : "something broke"
                }
            );
        })
    } else {
        next();
    }
}

async function get_bar_chart(req,res,next) {

    if (req.params.bucketID === "barplot") {
        try {

            const bar_res = await axios.get(`http://${process.env.MICROSERVICE11_IP_STORAGE_SCATTER}/api/storage/scatterplot/${req.params.chartID}`);
           
            res.status(bar_res.status).send(bar_res);

        } catch (error) {
            console.error(error);
            res.status(500).json(
                {
                    "info" : "Something broke"
                }
            );
        } 
    } else {
        next();
    }
}

function nothingMatch(req,res,next) {
    res.status(400).json(
        {
            "info" : "invalid request"
        }
    )
}

router.get("/api/storage/:bucketID/:chartID",  get_simple_chart, get_scatter_chart, get_bar_chart, nothingMatch);
module.exports = router;