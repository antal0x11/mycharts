/*
    This route responds back with a specific chart.
*/


const express = require("express");
const router = express.Router();
const Chart = require("../models/chart");

function validate_params(req,res,next) {
    
    /*
        Validate req.params.chartID before
        creating a response.
    */

        const regex =  /^[A-Z]+-\d{6}$/;
        
        if (regex.test(req.params.chartID) === false) {
            res.status(400).json({
                "info" : "bad request"
            });
        } else {
            next();
        }
}

async function chart_response(req,res,next) {

    try {
        const results = await Chart.findAll(
            {
                attributes: {
                    exclude : ["id", "title" , "users_id", "chart_extension", "chart_type",]
                }, 
                where: {
                    chart_id: req.params.chartID
                }
            }
        );

        if (results.length > 1) {
           
            throw "More results than expexted";

        } else if (results.length === 0) {
            res.status(404).json({
                "info" : "nothing found"
            })
        }else {
            const ch_file = results[0].path_chart

            res.status(200).sendFile(ch_file);

        }
    } catch(error) {
        
        res.status(500).json({
            "error" : "fail"
        });
    }
}

router.get("/api/storage/barplot/:chartID", validate_params, chart_response);
module.exports = router;