const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
const jwt = require("jsonwebtoken");

let current_time_file_name = Date.now() + ".csv"

const storage = multer.diskStorage({
    destination: function(req,res,cb) {
        cb(null, './uploads');
    },
    filename: function(req,file,cb) {
        //const tmpFileName = Date.now();
        cb(null,current_time_file_name);
    }
})

const upload = multer({storage : storage});

function eval_body_params(req,res,next) {

    next(); //FIX

    // const required_fields = ["user_id", "info_", "title", "extension", "type"];
    // const fields = Object.keys(req.body);
    // let check_pass = true;

    // for (let item of fields) {
    //     if (!required_fields.includes(item)) {
    //         check_pass = false;
    //     }
    // }
    
    // (check_pass) ? next() : res.status(400).json({
    //     "info" : "fail",
    //     "reason" : "invalid parameters"
    // });
    // cleanup();
}

function audit(req, res, next) {
    
    const reqFile = fs.createReadStream(`./uploads/${current_time_file_name}`);

    if (req.body.type === "simple_plot") {
        axios.post(`http://${process.env.MICROSERVICE05_IP}/api/data/integrity`, {
            title: req.body.title,
            type: "simple_plot",
            extension: req.body.extension,
            xAxis : req.body.xAxis,
            yAxis : req.body.yAxis,
            user_id : req.body.user_id,
            file: reqFile
        }, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        }).then(response => {
            next();
        }).catch(error => {
            console.error(error);
            res.status(500).json({"info" : "fail"})
        }) 
    } 
    
    if (req.body.type === "scatter_plot") {
        axios.post(`http://${process.env.MICROSERVICE05_IP}/api/data/integrity`, {
            title: req.body.title,
            type: "scatter_plot",
            extension: req.body.extension,
            user_id : req.body.user_id,
            file: reqFile
        }, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        }).then((response) => {
            next();
        }).catch(error => {
            console.error(error);
            res.status(500).json({"info" : "fail"});
        }) 
    }

    if (req.body.type === "bar_plot") {
        axios.post(`http://${process.env.MICROSERVICE05_IP}/api/data/integrity`, {
            title: req.body.title,
            type: "bar_plot",
            extension: req.body.extension,
            user_id : req.body.user_id,
            file: reqFile
        }, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        }).then((response) => {
            next();
        }).catch((error) => {
            console.error(error);
            res.status(500).json({"info" : "fail"});
        }) 
    }

}

function reduceCredit(req,res,next) {
    
    const info_ = req.body.info_;
    
    axios({
        method: "post",
        url : `http://${process.env.MICROSERVICE03_IP}/api/client/update/charts`,
        data : {
            email : get_info_from_token(info_)
        }
    }).then((response) => {
        res.status(200).json(response.data);
    }).catch( (error) => {
        res.status(500).json({
            "info" : "something broke"
        })
    });
    next();
}

function cleanup() {

    /*
        Remove the temporary csv file
    */

    fs.unlink("./uploads/" + current_time_file_name, (error) => {
        if (error) {
            console.error(error);
        }
    })
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

router.post("/api/data/audit", upload.single("file"), eval_body_params,audit, reduceCredit,cleanup);
module.exports = router;