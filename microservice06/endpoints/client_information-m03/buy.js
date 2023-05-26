const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");

function auth(req,res,next) {

    /*
        Ensures that client is still authenticated
        and the request body has required attributes.
    */


    if (req.body.info_ === undefined || req.body.token === undefined || req.body.credit === undefined || !Number.isInteger(req.body.credit)) {
        res.status(400).json({
            "info" : "invalid request"
        });
    } else {
        axios.post(`http://${process.env.MICROSERVICE07_IP}/api/auth/status`, {
            token: req.body.token
        }, {
            headers: {
                'Content-Type' : "application/json"
            }
        }).then( () => {
            next();
        }).catch(error => {
            res.status(error.response.status).json(error.response.data);
        })
    }
    
}

function buy(req,res,next) {

    const email_address = get_info_from_token(req.body.info_);

    if (email_address === undefined) {
        res.status(400).json(
            {
                "info" : "bad request"
            }
        );
    } else {
        axios.post(`http://${process.env.MICROSERVICE03_IP}/api/client/update/credit`, {
            email : email_address,
            credit : req.body.credit
        }, {
            headers: {
                "Content-Type" : "application/json"
            }
        }).then(response => {
            res.status(response.status).json(response.data);
        }).catch(error => {
            res.status(error.response.status).json(error.response.data);
        })
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

router.post("/api/client/buy", auth, buy);
module.exports = router;
