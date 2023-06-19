const express = require("express");
const router = express.Router();
const Chart = require("../models/chart");

function validate_params(req,res,next) {

    /*
        Validate req.params.clientID before
        creating a response.
    */

    const regex =  /^[A-Z]+-\d{6}$/;

    res.type("application/json");
    
    if (regex.test(req.params.clientID) === false) {
        res.status(400).json({
            "info" : "bad request"
        });
    } else {
        next();
    }

}

async function get_info (req, res, next) {
    
    /*
        This route given a client Id responds back
        with all charts that a user has created and
        are available to retrieve.
    */

    try {
        const response = await Chart.findAll({
            attributes: {
                exclude: ["id"]
            },
            where: {
                users_id: req.params.clientID
            }
        });

        if (response.length === 0) {
            res.status(404).json(
                {
                    "result" : "nothing found"
                }
            );
        } else {
            res.status(200).json(
                {
                    "client_id" : req.params.clientID,
                    "charts" : response
                }
            )
        }

    } catch(error) {
        res.status(500).json(
            {
                "error" : "something broke"
            }
        );
    } 
}

router.get("/api/storage/barplot/info/:clientID", validate_params, get_info);
module.exports = router;