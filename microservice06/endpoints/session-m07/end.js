const express = require("express");
const router = express.Router();
const axios = require("axios");

function validateBody(req,res,next) {

    /*
        Validates if request type is as expected and
        if token is present.
    */

    if (req.get("Content-Type") !== "application/json" ||  req.body.token === undefined || typeof req.body.token !== "string") {
        res.status(400).json({
            "info" : "fail",
            "reason" : "missing required attributes or invalid request type"
        });
    } else {
        next();
    }
}
function end(req,res,next) {

    /*
        Creates a request to end the session.
     */

    axios.post(`http://${process.env.MICROSERVICE07_IP}/api/auth/signout`, {
        token: req.body.token
    }, {
        headers: {
            'Content-Type' : "application/json"
        }
    }).then( response => {
        res.status(response.status).json(response.data);
    }).catch(error => {
        res.status(error.response.status).json(error.response.data);
    })
}

router.post("/api/client/session/end", validateBody, end);
module.exports = router;