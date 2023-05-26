const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");

function getClientInfo(req,res,next) {

    if (req.body.info_ === undefined) {
        res.status(400).json(
            {
                "info" : "invalid request"
            }
        );
    } else {

        const email_address = get_info_from_token(req.body.info_);

        if (email_address !== undefined) {
            axios.post(`http://${process.env.MICROSERVICE03_IP}/api/client/search`, {
                email : email_address
            }, {
                headers: {
                    "Content-Type" : "application/json"   
                }
            }).then(response => {
                res.status(response.status).json(response.data);
            }).catch(error => {
                res.status(error.response.status).json(error.response.data);
            })
        } else {
            res.status(400).json({
                "info" : "invalid request"
            })
        }
    }
}

function get_info_from_token(_info) {

    /*
        Return email from the token
    */
    try {
        const dec = jwt.verify(_info, process.env.SECRET_TOKEN_KEY);
        return dec.email;
    } catch(error) {
        return undefined;
    }
}

router.post("/api/client/info", getClientInfo);
module.exports = router;
