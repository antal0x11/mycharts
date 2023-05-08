const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");

function emailValidate(req,res,next) {

    /*
        Validates email address. Email address has to be
        of type @gmail.com
    */

    if (req.get("Content-Type") !== "application/json" ||  req.body.email === undefined || typeof req.body.email !== "string") {
        res.status(400).json({
            "info" : "fail",
            "reason" : "missing required attributes or invalid request type"
        });
    } else {

        const pattern = /^[\w.%+-]+@gmail\.com$/i;
        const eval = req.body.email.match(pattern)
        if (eval !== null) {
            next();
        } else {
            res.status(400).json({
                "info" : "fail",
                "reason" : "Email not supported"
            });
        }
    }
}
function initialize(req,res,next) {

    /*
        Gives back to client two tokens, one to navigate in the UI(token),
        and one for server side tasks(info_).
     */

    axios.post(`http://${process.env.MICROSERVICE07_IP}/api/auth/signin`, {
        email: req.body.email
    }, {
        headers: {
            'Content-Type' : "application/json"
        }
    }).then( response => {
        const infoToken = generateToken(req.body.email);
        res.status(response.status).json(
            {
                "token" : response.data.token,
                "info_" : infoToken
            }
        )
    }).catch(error => {
        res.status(error.response.status).json(error.response.data);
    })
}

function generateToken(emailAddr) {

    /*
        Returns a jwt token with email address, valid for 1 hour.
     */

    const expTime = Math.floor(Date.now() /1000) + (60 * 60); //expire time 1 hour

    return  jwt.sign({
        email : emailAddr,
        exp:  expTime
    }, process.env.SECRET_TOKEN_KEY);

}

router.post("/api/client/session/init", emailValidate, initialize);
module.exports = router;